import { IsEmail } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import BaseEntity from './util/BaseEntity';

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
}
