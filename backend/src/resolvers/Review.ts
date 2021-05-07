import { UserInputError } from 'apollo-server-errors';
import {
  Arg, Field, InputType, Int, Mutation, Query, Resolver,
} from 'type-graphql';
import Review from '../entities/Review';
import User from '../entities/User';
import Game from '../entities/Game';

@InputType()
class CreateReviewInput {
  @Field()
  rating: number

  @Field()
  reviewbody: string

  @Field()
  userid: number

  @Field()
  gameid: number
}

@InputType()
class UpdateReviewInput {
  @Field()
  id: number

  @Field()
  rating: number

  @Field()
  reviewbody: string

  @Field()
  userid: number

  @Field()
  gameid: number
}

@Resolver()
export default class ReviewResolver {
  @Query(() => Review)
  async review(@Arg('id', () => Int) id: number) : Promise<Review|null> {
    if (!id) {
      throw new UserInputError('Review ID is required.');
    }
    const review = await Review.findOneOrFail(id);
    return review;
  }

  @Mutation(() => Review)
  async createReview(@Arg('options') options: CreateReviewInput) : Promise<Review|null> {
    const review = Review.create({
      rating: options.rating,
      reviewbody: options.reviewbody,
      reviewer: await User.findOneOrFail(options.userid),
      game: await Game.findOneOrFail(options.gameid),
    });
    await review.save();
    return review;
  }

  @Mutation(() => Review)
  async updateReview(@Arg('options') options: UpdateReviewInput) : Promise<Review|null> {
    const review = Review.create({
      id: options.id,
      rating: options.rating,
      reviewbody: options.reviewbody,
      reviewer: await User.findOneOrFail(options.userid),
      game: await Game.findOneOrFail(options.gameid),
    });
    await review.save();
    return review;
  }

  @Mutation(() => Boolean)
  async deleteReview(@Arg('id', () => Int) id: number) : Promise<boolean> {
    if (await Review.findOne(id) == null) {
      return false;
    }
    await Review.delete(id);
    return true;
  }
}
