import { IsEmail } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import BaseEntity from './util/BaseEntity';
import Review from './Review';

@ObjectType({ implements: BaseEntity })
@Entity()
export default class User extends BaseEntity {
    id: number;

    createdAt: Date;

    updatedAt: Date;

    deletedAt?: Date;

    @Field()
    @Column({ type: 'varchar', unique: true })
    username: string;

    @Field()
    @Column({ type: 'varchar', unique: true, length: 3000 })
    password: string;

    @Field()
    @IsEmail()
    @Column({ type: 'varchar', unique: false, default: '' })
    email: string;

    @Field(() => [Review])
    @OneToMany(() => Review, (review) => review.reviewer, { lazy: true })
    reviews: Review[];
}
