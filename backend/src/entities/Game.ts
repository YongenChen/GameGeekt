import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import BaseEntity from './util/BaseEntity';
import Review from './Review';

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
      type: 'enum',
      unique: false,
      enum: {
        ADVENTURE: 'Adventure',
        COMBAT: 'Combat',
        FPS: 'First_Person_Shooter',
        MMO: 'Massively_Multiplayer_Online',
        MOBILE: 'Mobile',
        MOBA: 'Multiplayer_Online_Battle_Arena',
        PUZZLE: 'Puzzle',
        RTS: 'Real_Time_Strategy',
        RP: 'Role_Playing',
        SIMULATION: 'Simulation',
        SPORTS: 'Sports',
        STEALTHSHOOTER: 'Stealth_Shooter',
      },
    })
    genre: string;

    @Field()
    @Column({ type: 'varchar', unique: false, length: 3000 })
    description: string;

    @Field({ nullable: true })
    @Column({
      type: 'varchar', unique: false, length: 3000, default: '', nullable: true,
    })
    imgLink: string;

    @Field(() => [Review])
    @OneToMany(() => Review, (review) => review.game, { lazy: true })
    reviews: Review[];
}
