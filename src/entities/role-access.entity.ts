import { Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Role } from './role.entity';
import { Access } from './access.entity';

@Entity()
export class RoleAccess {
    @PrimaryColumn('int', { nullable: false, comment: 'role id' })
    roleId: number;

    @ManyToOne(() => Role, { createForeignKeyConstraints: false })
    @JoinColumn()
    role: Role;

    @ManyToOne(() => Access, { createForeignKeyConstraints: false })
    @JoinColumn()
    access: Access;
}
