import dotenv from 'dotenv';
import 'reflect-metadata';
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

dotenv.config();

async function main() {
  const connection = await createConnection({
    type: 'mysql',
    host: process.env.dbhost,
    port: +!process!.env!.dbport,
    username: process.env.dbusername,
    password: process.env.dbpassword,
    database: process.env.dbname,
    entities: [path.join(__dirname, './entities/*')],
    migrations: [path.join(__dirname, './migration/*')],
    logging: false,
    dropSchema: false,
    synchronize: false,
  });

  await connection.runMigrations();
  const RedisStore = connectRedis(session);
  const redisClient = new Redis({ host: process.env.redishost });

  const app = express();
  const corsConfig = {
    origin: process.env.origin,
    credentials: true, // <-- REQUIRED backend setting
  };
  app.use(
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

  server.applyMiddleware({ app, cors: corsConfig });

  app.use((_, res) => {
    res.status(200);
    res.send('Hello!');
    res.end();
  });

  app.listen({ port: 9090 });
  // eslint-disable-next-line no-console
  console.log(`???? Server ready at http://localhost:9090${server.graphqlPath}`);
}

main();
