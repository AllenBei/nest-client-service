import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { TimeEntityBase } from './lib/time-entity-base';
import { AccessCategory } from './access-category.entity';
import { ACCESS_TYPE } from '@app/routers/manage/access-manage/access-manage.constant';

@Entity()
export class Access extends TimeEntityBase {
    @PrimaryGeneratedColumn('increment', { comment: 'access id' })
    id: number;

    @Column('varchar', { length: 60, nullable: false, comment: 'access name' })
    name: string;

    @Column('varchar', { length: 60, nullable: false, default: '', comment: 'router name' })
    routerName: string;

    @ManyToOne(() => AccessCategory, (category) => category.access, { createForeignKeyConstraints: false })
    accessCategory: AccessCategory;

    @Column('tinyint', { nullable: false, unsigned: true, comment: 'access type' })
    type: ACCESS_TYPE;

    @Column('varchar', { nullable: false, length: 30, comment: 'access action' })
    action: string;

    @Column('varchar', { length: 200, nullable: false, comment: 'access router url' })
    routerUrl: string;

    @Column('varchar', { length: 200, nullable: false, comment: 'access description' })
    description: string;
}
