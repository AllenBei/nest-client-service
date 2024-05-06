import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { TimeEntityBase } from './lib/time-entity-base';

@Entity()
export class Role extends TimeEntityBase {
    @PrimaryGeneratedColumn('increment', { comment: 'role id' })
    id: number;

    @Column('varchar', { nullable: false, length: 60, comment: 'role name' })
    name: string;

    @Column('varchar', { nullable: false, length: 200, comment: 'role description' })
    description: string;
}
