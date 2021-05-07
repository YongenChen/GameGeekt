import dotenv from 'dotenv';
import 'reflect-metadata';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import path from 'path';
import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';
import UserResolver from './resolvers/User';
import GameResolver from './resolvers/Game';
import ReviewResolver from './resolvers/Review';
// import resolvers from './db_functions/resolvers';

dotenv.config();

/*
    type Mutation {
    updateReview(reviewid: Int, gameid: Int, reviewerid: Int, rating: Int, reviewbody: String): Review
  }

`;
*/

async function main() {
  const connection = await createConnection({
    type: 'mysql',
    host: process.env.dbhost,
    port: +!process!.env!.dbport,
    username: process.env.dbusername,
    password: process.env.dbpassword,
    database: process.env.dbname,
    entities: [path.join(__dirname, './entities/*')],
    logging: false,
    dropSchema: false,
    synchronize: true,
  });

  const RedisStore = connectRedis(session);
  const redisClient = new Redis({ host: process.env.redishost });

  const app = express();
  app.use(
    cors({
      origin: process.env.origin,
      credentials: true, // <-- REQUIRED backend setting
    }),
    session({
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      name: 'gid',
      saveUninitialized: false,
      secret: 'gamegeekt',
      resave: false,
      // Change secure to true before deploying
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'lax',
      },
    }),
  );
  const server = new ApolloServer({
    debug: true,
    tracing: true,
    schema: await buildSchema({ resolvers: [UserResolver, GameResolver, ReviewResolver] }),
    context({ res, req }) {
      return {
        req, res, redis: redisClient, connection,
      };
    },
  });
  await server.start();

  server.applyMiddleware({ app, cors: false });

  app.use((_, res) => {
    res.status(200);
    res.send('Hello!');
    res.end();
  });

  app.listen({ port: 9090 });
  console.log(`🚀 Server ready at http://localhost:9090${server.graphqlPath}`);
}

main();
