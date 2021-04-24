const argon2 = require('argon2');
const { UserInputError } = require('apollo-server-errors');
const reviewFunctions = require('./review_functions');
const gameFunctions = require('./game_functions');
const userFunctions = require('./user_functions');

const resolvers = {
  Query: {
    game: async (parent, { gameid }, { connection }, info) => {
      const res = await gameFunctions.getGame(connection, gameid);
      return res;
    },
    gameByTitle: async (parent, { name }, { connection }, info) => {
      const res = await gameFunctions.getGameByTitle(connection, name);
      return res;
    },
    games: async (parent, args, { connection }, info) => {
      const res = await gameFunctions.getGames(connection);
      return res;
    },
    gamesGenre: async (parent, { genre }, { connection }, info) => {
      const res = await gameFunctions.getGamesByGenre(genre, genre);
      return res;
    },
    user: async (parent, { userid }, { connection }, info) => {
      const res = await userFunctions.getUser(connection, userid);
      return res;
    },
    /*
    userByUsername: async (parent, args, { connection }, info) => {
      const res = await userFunctions.getUser(connection, args.username);
      return res;
    },
    */
    gameReviews: async (parent, { gameid }, { connection }, info) => {
      const res = await reviewFunctions.getGameReviews(connection, gameid);
      return res;
    },
    userReviews: async (parent, { userid }, { connection, user }, info) => {
      if (!user) return null;
      const res = await reviewFunctions.getUserReviews(connection, userid);
      return res;
    },
    review: async (parent, { reviewid }, { connection }, info) => {
      const res = await reviewFunctions.getReview(connection, reviewid);
      return res;
    },
  },
  Mutation: {
    addGame: async (parent, {
      name, genre, description, imglink,
    }, { connection, user }, info) => {
      if (!user) return null;
      const res = await gameFunctions.addGame(connection, { name, genre });
      return res;
    },
    registerUser: async (parent, {
      username, email, password, confirmPassword,
    }, { connection, req }, info) => {
      let user = await userFunctions.getUserByName(connection, username);
      if (user) {
        return new UserInputError('Username not unique.');
      }
      if (password.length < 6) {
        return new UserInputError('Password must be at least 6 characters.');
      }
      if (password !== confirmPassword) {
        return new UserInputError('Passwords must match.');
      }
      const passhash = await argon2.hash(password);
      user = await userFunctions.createUser(connection, { username, email, passhash });
      req.session.userId = user.userid;
      return user;
    },
    createReview: async (parent, {
      gameid, reviewerid, rating, reviewbody,
    }, { connection, user }, info) => {
      if (!user) return null;
      const res = await reviewFunctions.createReview(connection, {
        gameid, reviewerid, rating, reviewbody,
      });
      return res;
    },
    updateReview: async (parent, {
      reviewid, gameid, reviewerid, rating, reviewbody,
    }, { connection, user }, info) => {
      if (!user) return null;
      const res = await reviewFunctions.editReview(connection, {
        reviewid, gameid, reviewerid, rating, reviewbody,
      });
      return res;
    },
    deleteReview: async (parent, { reviewid }, { connection, user }, info) => {
      if (!user) return null;
      const res = await reviewFunctions.deleteReview(connection, reviewid);
      return res;
    },
    login: async (parent, { username, password }, { connection, req }, info) => {
      const user = await userFunctions.getUserByName(connection, username);
      if (!argon2.verify(user.password, password)) {
        throw new UserInputError('Username or password incorrect.');
      }
      req.session.userId = user.userid;
      return user;
    },
    signOut: async (parent, args, { res, req }, info) => (
      new Promise((resolve) => req.session.destroy((err) => {
        res.clearCookie('gid');
        if (err) {
          resolve(false);
          return;
        }
        resolve(true);
      }))),
  },
};

module.exports = { resolvers };
