import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import BaseEntity from './util/BaseEntity';

@ObjectType({ implements: BaseEntity })
@Entity()
export default class Game extends BaseEntity {
    id: number;

    createdAt: Date;

    updatedAt: Date;

    deletedAt?: Date;

    @Field()
    @Column({ type: 'varchar', unique: true })
    name: string;

    @Field()
    @Column({
      type: 'varchar', unique: false, length: 3000, default: 'No Genre',
    })
    genre: string;

    @Field()
    @Column({ type: 'varchar', unique: false, length: 3000 })
    description: string;

    @Field()
    @Column({
      type: 'varchar', unique: false, length: 3000, default: '',
    })
    imglink: string;
}
