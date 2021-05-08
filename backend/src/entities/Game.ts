/* eslint-disable no-unused-vars */
import { Field, ObjectType, registerEnumType } from 'type-graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import BaseEntity from './util/BaseEntity';
import Review from './Review';

// eslint-disable-next-line no-shadow
export enum Genres {
  ADVENTURE = 'Adventure',
  FPS = 'First_Person_Shooter',
  MMO = 'Massively_Multiplayer_Online',
  MOBILE = 'Mobile',
  MOBA = 'Multiplayer_Online_Battle_Arena',
  PUZZLE = 'Puzzle',
  RTS = 'Real_Time_Strategy',
  RP = 'Role_Playing',
  SIMULATION = 'Simulation',
  SPORTS = 'Sports',
}

registerEnumType(Genres, {
  name: 'Genre', // this one is mandatory
  description: 'List of possible genres', // this one is optional
});

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

    @Field(() => Genres)
    @Column({
      type: 'enum',
      unique: false,
      enum: Genres,
    })
    genre: Genres;

    @Field()
    @Column({ type: 'varchar', unique: false, length: 255 })
    description: string;

    @Field({ nullable: true })
    @Column({
      type: 'varchar', unique: false, length: 255, default: '', nullable: true,
    })
    imgLink: string;

    @Field(() => [Review])
    @OneToMany(() => Review, (review) => review.game, { lazy: true })
    reviews: Review[];
}
