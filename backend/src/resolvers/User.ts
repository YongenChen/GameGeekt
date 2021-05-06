import {
  Arg, Ctx, Field, InputType, Int, Mutation, Query, Resolver,
} from 'type-graphql';
import argon2 from 'argon2';
import { IsEmail, MinLength } from 'class-validator';
import { UserInputError } from 'apollo-server-errors';
import User from '../entities/User';
import { Context } from '../util/context';

@InputType()
class PasswordConfirmInput {
  @Field()
  @MinLength(8)
  password: string

  @Field()
  @MinLength(8)
  confirmPassword: string
}

@InputType()
class UsernamePasswordConfirmInput {
  @Field()
  @MinLength(3)
  username: string

  @Field()
  @MinLength(8)
  password: string

  @Field()
  @MinLength(8)
  confirmPassword: string

  @Field()
  @IsEmail()
  email: string
}

@InputType()
class UsernamePasswordInput {
  @Field()
  @MinLength(3)
  username: string

  @Field()
  @MinLength(8)
  password: string
}

const passwordMismatchError = new UserInputError('Password mismatch');

@Resolver()
export default class UserResolver {
  @Query(() => User, { nullable: true })
  async me(
    @Ctx() { req }: Context,
  ) : Promise<User|null> {
    const id = req.session.userId;
    if (!id) {
      return null;
    }
    const user = await User.findOneOrFail(id);
    return user;
  }

  @Query(() => [User])
  users(): Promise<User[]> {
    return User.find({
      order: {
        id: 'ASC',
      },
    });
  }

  @Query(() => User)
  async user(
    @Arg('id', () => Int) id: number,
  ) : Promise<User> {
    const user = await User.findOneOrFail(id);
    return user;
  }

  @Mutation(() => User)
  async register(
    @Arg('options') options: UsernamePasswordConfirmInput,
    @Ctx() { req }: Context,
  ) : Promise<User> {
    if (await User.findOne({ username: options.username })) throw new UserInputError('Username taken');
    if (options.password !== options.confirmPassword) throw passwordMismatchError;
    const hashedPassword = await argon2.hash(options.password);
    const user = User.create({
      username: options.username, password: hashedPassword,
    });
    await user.save();

    // ! This will auto log the user in
    req.session.userId = user.id;

    return user;
  }

  @Mutation(() => User)
  async updatePassword(
    @Arg('id', () => Int) id: number,
    @Arg('options') options: PasswordConfirmInput,
  ) : Promise<User> {
    const user = await User.findOneOrFail(id);
    if (typeof options.password !== 'undefined'
    && typeof options.confirmPassword !== 'undefined'
    && options.password === options.confirmPassword) {
      const hashedPassword = await argon2.hash(options.password);
      user.password = hashedPassword;
    } else throw passwordMismatchError;

    return user;
  }

  @Mutation(() => User)
  async signIn(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { req }: Context,
  ) : Promise<User> {
    const user = await User.findOne({ username: options.username });
    if (!user) throw new UserInputError('Username does not exist');

    const valid = await argon2.verify(user.password, options.password);
    if (!valid) throw new UserInputError('Invalid login');

    req.session.userId = user.id;

    return user;
  }

  @Mutation(() => Boolean)
  signOut(
    @Ctx() { res, req }: Context,
  ) : Promise<boolean> {
    return new Promise((resolve) => req.session.destroy((err) => {
      res.clearCookie('gid');
      if (err) {
        resolve(false);
        return;
      }
      resolve(true);
    }));
  }
}
