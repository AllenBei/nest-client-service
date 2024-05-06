import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository, EntityManager } from 'typeorm';

import { RedisService } from '@app/shared/redis';
import { FailException } from '@app/exceptions/fail.exception';
import { ERROR_CODE } from '@app/constants/error-code.constant';
import { Access, AccessCategory, RoleAccess } from '@app/entities';
import { IAccessCategoryResponse } from './access-manage.interface';
import { AccessCategoryListDto, CreateAccessDto, ModifyAccessDto } from './access-manage.dto';
import { AUTH_ROLE_ACCESS_RELATION_MAP } from '@app/routers/manage/role-manage/role-manage.constant';

@Injectable()
export class AccessManageService {
    public constructor(
        private dataSource: DataSource,
        private redisService: RedisService,
        @InjectRepository(Access) private readonly accessRepository: Repository<Access>,
        @InjectRepository(AccessCategory) private readonly accessCategoryRepository: Repository<AccessCategory>,
    ) {}

    public async queryAccessCategoryList(accessCategoryListInfo: AccessCategoryListDto): Promise<IAccessCategoryResponse> {
        const { page, pageSize, q } = accessCategoryListInfo;

        let handle = this.accessCategoryRepository
            .createQueryBuilder('category')
            .select([
                'category.id',
                'category.name',
                'category.description',
                'access.id',
                'access.name',
                'access.type',
                'access.action',
                'access.routerUrl',
                'access.description',
            ])
            .leftJoin('category.access', 'access');

        if (page && pageSize) handle = handle.skip((page - 1) * pageSize).take(pageSize);

        if (q) handle = handle.where('category.name LIKE :query', { query: `%${q}%` });

        const [list, count] = await handle.getManyAndCount();

        return {
            count,
            list,
            pagination: {
                page: page ?? 1,
                pageSize: pageSize ?? count,
            },
        };
    }

    /**
     * 创建新的类别
     * @param name
     * @param description
     */
    public async createAccessCategory(name: string, description: string): Promise<void> {
        // 查询指定的类别是否已存在
        const currentRecord = await this.accessCategoryRepository.findOneBy({ name });

        if (currentRecord) throw new FailException(ERROR_CODE.ACCESS.ACCESS_CATEGORY_NOT_EXISTS);

        const categoryRecord = this.accessCategoryRepository.create({
            name,
            description,
        });

        await this.accessCategoryRepository.save(categoryRecord);
    }

    /**
     * 修改类别的相关信息
     * @param id
     * @param name
     * @param desc
     */
    public async modifyAccessCategory(id: number, name: string, desc: string): Promise<void> {
        const targetCategory = await this.accessCategoryRepository.findOneBy({ id });

        if (!targetCategory) throw new FailException(ERROR_CODE.ACCESS.ACCESS_CATEGORY_NOT_EXISTS);

        targetCategory.name = name;
        targetCategory.description = desc;

        await this.accessCategoryRepository.save(targetCategory);
    }

    /**
     * 删除accessCategory
     * @param category
     */
    public async deleteAccessCategory(category: string): Promise<void> {
        const list = category.split(',').map((item) => Number(item));

        const categoryList = await this.accessCategoryRepository.findBy({ id: In(list) });

        if (categoryList.length < 1) throw new FailException(ERROR_CODE.ACCESS.ACCESS_CATEGORY_NOT_EXISTS);

        const categoryIdList = categoryList.map((item) => item.id);

        await this.dataSource.transaction(async (transactionalEntityManager: EntityManager) => {
            const accessList = await transactionalEntityManager
                .createQueryBuilder()
                .select(['access.id'])
                .from(Access, 'access')
                .where('access.accessCategory IN (:...categoryIdList)', { categoryIdList })
                .getMany();

            if (accessList.length > 0) {
                const accessIdList = accessList.map((item) => item.id);

                await transactionalEntityManager.delete(Access, { id: In(accessIdList) });

                await transactionalEntityManager.delete(RoleAccess, { access: In(accessIdList) });
            }

            await transactionalEntityManager.delete(AccessCategory, { id: In(categoryIdList) });
        });

        // 删除权限缓存
        await this.redisService.delete(AUTH_ROLE_ACCESS_RELATION_MAP);
    }

    /**
     * 创建权限
     * @param accessInfo
     */
    public async createAccess(accessInfo: CreateAccessDto): Promise<void> {
        const { category, name, routerName = '', type, action, router, desc = '' } = accessInfo;

        const accessCategory = await this.accessCategoryRepository.findOneBy({ id: category });
        if (!accessCategory) throw new FailException(ERROR_CODE.ACCESS.ACCESS_CATEGORY_NOT_EXISTS);

        const targetAccess = await this.accessRepository
            .createQueryBuilder('access')
            .select(['access.id'])
            .where('access.type=:type AND access.action=:action AND access.routerUrl=:router', { type, action, router })
            .getOne();

        if (targetAccess) throw new FailException(ERROR_CODE.ACCESS.ACCESS_EXISTS);

        const createAccessInfo = this.accessRepository.create({
            accessCategory: { id: category },
            name,
            routerName,
            type,
            action,
            routerUrl: router,
            description: desc,
        });

        await this.accessRepository.save(createAccessInfo);
    }

    /**
     * 修改权限
     * @param accessInfo
     */
    public async modifyAccess(accessInfo: ModifyAccessDto): Promise<void> {
        const { id, type, action, router, name, routerName = '', desc = '' } = accessInfo;

        const targetAccess = await this.accessRepository.findOneBy({ id });

        if (!targetAccess) throw new FailException(ERROR_CODE.ACCESS.ACCESS_NOT_EXISTS);

        const existsRecord = await this.accessRepository
            .createQueryBuilder('access')
            .select(['access.id'])
            .where('access.type=:type AND access.action=:action AND access.routerUrl=:router AND access.id!=:id', {
                type,
                action,
                router,
                id,
            })
            .getOne();

        if (existsRecord) throw new FailException(ERROR_CODE.COMMON.RECORD_EXITS);

        targetAccess.name = name;
        targetAccess.type = type;
        targetAccess.action = action;
        targetAccess.routerUrl = router;
        targetAccess.description = desc;
        targetAccess.routerName = routerName;

        await this.accessRepository.save(targetAccess);
    }

    /**
     * 删除权限
     * @param accessIds
     */
    public async deleteAccess(accessIds: string): Promise<void> {
        const list = accessIds.split(',').map((item) => Number(item));

        const accessList = await this.accessRepository.findBy({ id: In(list) });

        if (accessList.length < 1) throw new FailException(ERROR_CODE.COMMON.RECORD_NOT_EXISTS);
        const accessIdList = accessList.map((item) => item.id);

        await this.dataSource.transaction(async (transactionalEntityManager: EntityManager) => {
            await transactionalEntityManager.delete(Access, { id: In(accessIdList) });

            await transactionalEntityManager.delete(RoleAccess, { access: In(accessIdList) });
        });

        // 删除权限缓存
        await this.redisService.delete(AUTH_ROLE_ACCESS_RELATION_MAP);
    }
}
