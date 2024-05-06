import { BeforeInsert, BeforeUpdate, Column } from 'typeorm';

import { getCurrentTime } from '@app/helpers/utils.helper';

export abstract class TimeEntityBase {
    @Column('int', {
        unsigned: true,
        nullable: false,
        comment: 'update time',
        select: false,
    })
    updateAt: number;

    @Column('int', {
        unsigned: true,
        nullable: false,
        comment: 'create time',
        select: false,
    })
    createAt: number;

    @BeforeInsert()
    onBeforeInsert() {
        const timeStamp = getCurrentTime();
        this.updateAt = timeStamp;
        this.createAt = timeStamp;
    }

    @BeforeUpdate()
    onBeforeUpdate() {
        this.updateAt = getCurrentTime();
    }
}
