require("dotenv").config()
const mysql = require('mysql2/promise');
//console.log(process.env)
const { gql } = require('apollo-server');
const { ApolloServer } = require('apollo-server-express');
const user_functions = require('./db_functions/user_functions');
const game_functions = require('./db_functions/game_functions');
const review_functions = require('./db_functions/review_functions');
const express = require('express')

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
    game: Int
    reviewer: Int
    rating: Int
    reviewbody: String
  }

  type Query {
    user(userid: Int): User
    game(gameid: Int): Game
    gameByTitle(name: String): Game
    review: Review
    users: [User]
    games: [Game]
    gamesGenre(genre: String): [Game]
    gamereviews: [Review]
    userreviews: [Review]
  }

  type Mutation {
    addGame(name: String, genre: String): Int
  }

`;

async function main() {
  const connection = await mysql.createConnection({
    host: process.env.dbhost,
    user: process.env.dbusername,
    password: process.env.dbpassword,
    database: process.env.dbname
  });
  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
  });
  
  const resolvers = {
    Query: {
      game: async (parent, args, context, info) => {
        res = await game_functions.getGame(connection, args)
        return res
      },
      gameByTitle: async (parent, args, context, info) => {
        res = await game_functions.getGameByTitle(connection, args)
        return res
      },
      games: async () => {
        res = await game_functions.getGames(connection)
        return res
      },
      gamesGenre: async (parent, args, context, info) => {
        res = await game_functions.getGamesByGenre(connection, args)
        return res
      },
      user: async (parent, args, context, info) => {
        res = await user_functions.getUser(connection, args)
        return res
      }
    },
    Mutation: {
      addGame: async (parent, args, context, info) => {
        res = await game_functions.addGame(connection, args)
        return res
      }
    }
  };
  
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  server.applyMiddleware({ app });

  app.use((req, res) => {
    res.status(200);
    res.send('Hello!');
    res.end();
  });

  await new Promise(resolve => app.listen({ port: 9090 }, resolve));
  console.log(`🚀 Server ready at http://localhost:9090${server.graphqlPath}`);
  return { server, app };
}

main()