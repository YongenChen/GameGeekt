import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import BaseEntity from './util/BaseEntity';
import User from './User';
import Game from './Game';

@ObjectType({ implements: BaseEntity })
@Entity()
export default class Review extends BaseEntity {
    id: number;

    createdAt: Date;

    updatedAt: Date;

    deletedAt?: Date;

    @Field()
    @Column({ type: 'float', unique: false })
    rating: number;

    @Field()
    @Column({ type: 'varchar', unique: false, length: 255 })
    reviewbody: string;

    @Field(() => User)
    @ManyToOne(() => User, (user: User) => user.reviews, { eager: true })
    reviewer: User;

    @Field(() => Game)
    @ManyToOne(() => Game, (game: Game) => game.reviews, { eager: true })
    game: Game;
}
