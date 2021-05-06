import { UserInputError } from 'apollo-server-errors';
import {
  Arg, Field, InputType, Int, Mutation, Query, Resolver,
} from 'type-graphql';
import Review from '../entities/Review';

@InputType()
class CreateReviewInput {
  @Field()
  rating: number

  @Field()
  reviewbody: string
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
      rating: options.rating, reviewbody: options.reviewbody,
    });
    await review.save();
    return review;
  }
}
