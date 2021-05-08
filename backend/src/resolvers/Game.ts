import { UserInputError } from 'apollo-server-errors';
import {
  Arg, Field, InputType, Int, Mutation, Query, Resolver,
} from 'type-graphql';
import { Like } from 'typeorm';
import Game, { Genres } from '../entities/Game';

@InputType()
class CreateGameInput {
  @Field()
  name: string

  @Field(() => Genres)
  genre: Genres

  @Field()
  description: string

  @Field({ nullable: true })
  imgLink?: string
}

@Resolver()
export default class GameResolver {
  @Query(() => Game)
  async game(@Arg('id', () => Int) id: number) : Promise<Game|null> {
    if (!id) {
      throw new UserInputError('Game ID is required.');
    }
    const game = await Game.findOneOrFail(id);
    return game;
  }

  @Query(() => [Game])
  async games() : Promise<Game[]|null> {
    const games = await Game.find();
    return games;
  }

  @Query(() => [Game])
  async searchGamesByGenre(@Arg('genre', () => Genres) genre: Genres) : Promise<Game[]> {
    if (!genre) {
      throw new UserInputError('Genre is required.');
    }

    return Game.find({ where: { genre: Like(`%${genre}%`) } });
  }

  @Query(() => [Game])
  async searchGamesByTitle(@Arg('name', () => String) name: string) : Promise<Game[]> {
    if (!name) {
      throw new UserInputError('Genre is required.');
    }

    return Game.find({ where: { name: Like(`%${name}%`) } });
  }

  @Query(() => Game)
  async searchGameByTitle(@Arg('name', () => String) name: string) : Promise<Game|null> {
    if (!name) {
      throw new UserInputError('Genre is required.');
    }

    return Game.findOneOrFail({ where: { genre: Like(`%${name}%`) } });
  }

  @Mutation(() => Game)
  async createGame(@Arg('options') options: CreateGameInput) : Promise<Game|null> {
    if (await Game.findOne({ name: options.name })) throw new UserInputError('Game name taken');
    const game = Game.create({
      name: options.name, genre: options.genre, description: options.description, imgLink: options.imgLink,
    });
    await game.save();
    return game;
  }
}
