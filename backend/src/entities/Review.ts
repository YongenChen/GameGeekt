import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import BaseEntity from './util/BaseEntity';

@ObjectType({ implements: BaseEntity })
@Entity()
export default class Review extends BaseEntity {
    id: number;

    createdAt: Date;

    updatedAt: Date;

    deletedAt?: Date;

    @Field()
    @Column({ type: 'int', unique: true })
    rating: number;

    @Field()
    @Column({ type: 'varchar', unique: true, length: 3072 })
    reviewbody: string;
}
