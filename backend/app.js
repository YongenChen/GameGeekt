require('dotenv').config();
const mysql = require('mysql2/promise');
// console.log(process.env)
const { gql } = require('apollo-server');
const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const express = require('express');
const redis = require('ioredis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const resolvers = require('./db_functions/resolvers');

const typeDefs = gql`
  type User {
    userid: Int
    username: String
    email: String
    password: String
  }

  type Game {
    gameid: Int
    name: String
    genre: String
  }

  type Review {
    reviewid: Int
    gameid: Int
    reviewer: Int
    rating: Int
    reviewbody: String
  }

  type Query {
    user(userid: Int): User
    game(gameid: Int): Game
    gameByTitle(name: String): Game
    review(reviewid: Int): Review
    users: [User]
    games: [Game]
    gamesGenre(genre: String): [Game]
    gameReviews(gameid: Int): [Review]
    userReviews(userid: Int): [Review]
  }

  type Mutation {
    registerUser(username: String, email: String, password: String, confirmPassword: String): User
    addGame(name: String, genre: String): Game
    createReview(gameid: Int, reviewerid: Int, rating: Int, reviewbody: String): Review
    updateReview(reviewid: Int, gameid: Int, reviewerid: Int, rating: Int, reviewbody: String): Review
    deleteReview(reviewid: Int): Boolean
    login(username: String, password: String): User
    signOut: Boolean
  }

`;

/*
const checkAuth(context,) {

}
*/

async function main() {
  const connection = await mysql.createConnection({
    host: process.env.dbhost,
    user: process.env.dbusername,
    password: process.env.dbpassword,
    database: process.env.dbname,
  });
  connection.connect((err) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log('Connected!');
  });

  const redisClient = redis.createClient();

  const app = express();
  app.use(
    session({
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      name: 'gid',
      saveUninitialized: false,
      secret: 'gamegeekt',
      resave: false,
      // Change secure to true before deploying
      cookie: {
        httpOnly: true, secure: false, maxAge: 1000 * 60 * 60 * 24, sameSite: 'lax',
      },
    }),
  );
  const server = new ApolloServer({
    typeDefs,
    resolvers: resolvers.resolvers,
    context({ res, req }) {
      return {
        req, res, redis, connection,
      };
    },
  });
  await server.start();

  server.applyMiddleware({ app });

  app.use((req, res) => {
    res.status(200);
    res.send('Hello!');
    res.end();
  });

  await new Promise((resolve) => app.listen({ port: 9090 }, resolve));
  console.log(`🚀 Server ready at http://localhost:9090${server.graphqlPath}`);
  return { server, app };
}

main();
