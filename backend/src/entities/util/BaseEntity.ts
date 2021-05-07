import { Field, ID, InterfaceType } from 'type-graphql';
import {
  BaseEntity as TypeOrmBaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@InterfaceType()
export default abstract class BaseEntity extends TypeOrmBaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Date)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => Date)
    @UpdateDateColumn()
    updatedAt: Date;

    @Field(() => Date, { nullable: true })
    @DeleteDateColumn()
    deletedAt?: Date;
}
