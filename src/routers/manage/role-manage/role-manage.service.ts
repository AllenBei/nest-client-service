import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, EntityManager, In } from 'typeorm';

import { RoleListDto } from './role-manage.dto';
import { RedisService } from '@app/shared/redis';
import { FailException } from '@app/exceptions/fail.exception';
import { ERROR_CODE } from '@app/constants/error-code.constant';
import { Access, Role, RoleAccess, UserRole } from '@app/entities';
import { ACCESS_TYPE } from '../access-manage/access-manage.constant';
import { AUTH_ROLE_ACCESS_RELATION_MAP, AUTH_ROLE_ACCESS_EXPIRE } from './role-manage.constant';
import { IRoleListResponse, IRoleAccessMap, IRoleAccessQueryItem } from './role-manage.interface';

@Injectable()
export class RoleManageService {
    public constructor(
        private dataSource: DataSource,
        private redisService: RedisService,
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    ) {}

    /**
     * 请求角色列表
     * @param queryInfo
     * @returns
     */
    public async queryRoleList(queryInfo: RoleListDto): Promise<IRoleListResponse> {
        const { page, pageSize, q } = queryInfo;

        let handle = this.roleRepository.createQueryBuilder('role').select(['role.id', 'role.name', 'role.description']);

        // 进行关键字的模糊查询
        if (q) handle = handle.where('role.name LIKE :query', { query: `%${q}%` });

        // 分页处理
        if (page && pageSize) handle = handle.skip((page - 1) * pageSize).take(pageSize);

        const [roles, count] = await handle.getManyAndCount();

        return {
            count,
            roles,
            pagination: {
                page: page ?? 1,
                pageSize: pageSize ?? count,
            },
        };
    }

    /**
     * 查询角色与权限的关系，验证用户登录权限
     * @returns
     */
    public async queryRoleAccess(): Promise<IRoleAccessMap> {
        const relationMap = await this.redisService.get<IRoleAccessMap>(AUTH_ROLE_ACCESS_RELATION_MAP);
        if (relationMap) return relationMap;

        const result = await this.dataSource
            .createQueryBuilder()
            .select(['roleAccess.roleId AS roleId', 'access.routerUrl AS routerUrl', 'access.action AS action'])
            .from(RoleAccess, 'roleAccess')
            .leftJoin('roleAccess.access', 'access')
            .where('access.type=:type', { type: ACCESS_TYPE.ACTION })
            .getRawMany();

        const relation = result.reduce((total: IRoleAccessMap, per: IRoleAccessQueryItem) => {
            total[per.roleId] = total[per.roleId] || [];

            total[per.roleId].push({
                action: per.action,
                routerUrl: per.routerUrl,
            });
            return total;
        }, {});

        await this.redisService.set(AUTH_ROLE_ACCESS_RELATION_MAP, relation, AUTH_ROLE_ACCESS_EXPIRE);

        return relation;
    }

    /**
     * 创建新角色
     * @param name
     * @param description
     */
    public async createRole(name: string, description: string): Promise<void> {
        const currentRole = await this.roleRepository.findOne({
            select: ['id'],
            where: { name },
        });

        if (currentRole) throw new FailException(ERROR_CODE.COMMON.RECORD_EXITS);

        const roleInfo = this.roleRepository.create({
            name,
            description,
        });

        await this.roleRepository.save(roleInfo);
    }

    /**
     * 给角色分配权限
     * @param roleId
     * @param access
     */
    public async assignRoleAccessInfo(roleId: number, access: string): Promise<void> {
        const targetRole = await this.roleRepository.findOneBy({ id: roleId });
        if (!targetRole) throw new FailException(ERROR_CODE.COMMON.RECORD_NOT_EXISTS);

        const list = access.split(',').map((item) => Number(item));

        const accessList = await this.dataSource.getRepository(Access).find({ where: { id: In(list) } });
        if (accessList.length < 1) throw new FailException(ERROR_CODE.ACCESS.ACCESS_NOT_EXISTS);

        await this.dataSource.transaction(async (transactionalEntityManager: EntityManager) => {
            await transactionalEntityManager.delete(RoleAccess, { roleId });

            const relations = accessList.map((item) => {
                return transactionalEntityManager.create(RoleAccess, { roleId, access: item });
            });

            await transactionalEntityManager.save(RoleAccess, relations);
        });

        // 更新redis缓存中的关系
        const relation = await this.redisService.get<IRoleAccessMap>(AUTH_ROLE_ACCESS_RELATION_MAP);
        if (relation) {
            relation[roleId] = accessList.map((item) => ({ action: item.action, routerUrl: item.routerUrl }));

            await this.redisService.set(AUTH_ROLE_ACCESS_RELATION_MAP, relation, AUTH_ROLE_ACCESS_EXPIRE);
        }
    }

    /**
     * 修改角色信息
     * @param id
     * @param name
     * @param description
     */
    public async modifyRole(id: number, name: string, description: string): Promise<void> {
        const targetRole = await this.roleRepository.findOneBy({ id });

        // 如果不存在说明角色不存在
        if (!targetRole) throw new FailException(ERROR_CODE.COMMON.RECORD_NOT_EXISTS);

        targetRole.name = name;
        targetRole.description = description;

        await this.roleRepository.save(targetRole);
    }

    /**
     * 删除角色
     * @param roles
     */
    public async deleteRole(roles: string): Promise<void> {
        const list = roles.split(',').map((item) => Number(item));

        const roleList = await this.roleRepository.findBy({ id: In(list) });

        if (roleList.length < 1) throw new FailException(ERROR_CODE.COMMON.RECORD_NOT_EXISTS);
        const roleIdList = roleList.map((item) => item.id);

        // 删除与role有关的表的记录
        await this.dataSource.transaction(async (transactionalEntityManager: EntityManager) => {
            await transactionalEntityManager.delete(Role, { id: In(roleIdList) });

            await transactionalEntityManager.delete(RoleAccess, { roleId: In(roleIdList) });

            await transactionalEntityManager.delete(UserRole, { role: In(roleIdList) });
        });

        // 更新redis缓存中的关系
        const relation = await this.redisService.get<IRoleAccessMap>(AUTH_ROLE_ACCESS_RELATION_MAP);
        if (relation) {
            roleIdList.forEach((id) => Reflect.deleteProperty(relation, id));

            await this.redisService.set(AUTH_ROLE_ACCESS_RELATION_MAP, relation, AUTH_ROLE_ACCESS_EXPIRE);
        }
    }
}
