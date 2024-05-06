import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

import { TimeEntityBase } from './lib/time-entity-base';
import { Access } from './access.entity';

@Entity()
export class AccessCategory extends TimeEntityBase {
    @PrimaryGeneratedColumn('increment', { comment: 'access category id' })
    id: number;

    @Column('varchar', { nullable: false, length: 60, comment: 'access category name' })
    name: string;

    @Column('varchar', { length: 200, nullable: false, comment: 'access category description' })
    description: string;

    @OneToMany(() => Access, (access) => access.accessCategory, { createForeignKeyConstraints: false })
    access: Access[];
}
