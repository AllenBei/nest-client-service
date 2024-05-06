import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';

@Entity()
export class UserRole {
    @PrimaryColumn('int', { nullable: false, comment: 'user id' })
    userId: number;

    @ManyToOne(() => User, { createForeignKeyConstraints: false })
    @JoinColumn()
    user: User;

    @ManyToOne(() => Role, { createForeignKeyConstraints: false })
    @JoinColumn()
    role: Role;
}
