async function getGamesByGenre(connection, genre) {
  try {
    const [res] = await connection.execute('SELECT * FROM game WHERE genre = ?', [genre]);
    return JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.error(error);
  }
  return [];
}
async function getGame(connection, gameid) {
  try {
    const [res] = await connection.execute('SELECT * FROM game WHERE gameid = ?', [gameid]);
    return JSON.parse(JSON.stringify(res))[0];
  } catch (error) {
    console.error(error);
  }
  return [];
}
async function getGameByTitle(connection, name) {
  try {
    const [res] = await connection.execute('SELECT * FROM game WHERE name = ?', [name]);
    return JSON.parse(JSON.stringify(res))[0];
  } catch (error) {
    console.error(error);
  }
  return [];
}
async function searchGamesByTitle(connection, title) {
  try {
    const quer = `%${title}%`;
    const [res] = await connection.execute('SELECT * FROM game WHERE name LIKE ?', [quer]);
    return JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.error(error);
  }
  return [];
}
async function addGame(connection, {
  name, genre, description, imglink,
}) {
  try {
    // const game = { name: data.name, genre: data.genre };
    await connection.execute('INSERT INTO game SET name = ?, genre = ?, description = ?, imglink = ?', [name, genre, description, imglink]);
    return getGameByTitle(connection, { name });
  } catch (error) {
    console.error(error);
  }
  return null;
}
async function getGames(connection) {
  try {
    const [res] = await connection.execute('SELECT * FROM game');
    return JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.error(error);
  }
  return [];
}
// addGame, getGamesByGenre,
module.exports = {
  getGames, getGamesByGenre, addGame, getGame, getGameByTitle, searchGamesByTitle,
};
