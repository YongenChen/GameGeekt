async function deleteReview(connection, reviewid) {
  try {
    await connection.execute('DELETE FROM review WHERE reviewid = ?', [reviewid]);
    return true;
  } catch (error) {
    console.error(error);
  }
  return false;
}
async function getReview(connection, reviewid) {
  try {
    const [res] = await connection.execute('SELECT * FROM review WHERE reviewid = ?', [reviewid]);
    return JSON.parse(JSON.stringify(res))[0];
  } catch (error) {
    console.error(error);
  }
  return false;
}
async function getGameReviews(connection, gameid) {
  try {
    const [res] = await connection.execute('SELECT * FROM review WHERE gameid = ?', [gameid]);
    return JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.error(error);
  }
  return [];
}
async function getUserReview(connection, { gameid, reviewerid }) {
  try {
    const res = await connection.execute('SELECT * FROM review WHERE gameid = ? AND reviewerid = ?', [gameid, reviewerid]);
    return res;
  } catch (error) {
    console.error(error);
  }
  return null;
}
async function createReview(connection, {
  gameid, reviewerid, rating, reviewbody,
}) {
  // Query to add data
  try {
    await connection.execute('INSERT INTO review SET gameid = ?, reviewerid = ?, rating = ?, reviewbody = ?', [gameid, reviewerid, rating, reviewbody]);
    return getUserReview(connection, { gameid, reviewerid });
  } catch (error) {
    console.error(error);
  }
  return null;
}
async function editReview(connection, {
  reviewid, gameid, reviewerid, rating, reviewbody,
}) {
  try {
    await connection.execute('REPLACE INTO review VALUES (?, ?, ?, ?, ?)', [reviewid, gameid, reviewerid, rating, reviewbody]);
    return getUserReview(connection, { gameid, reviewerid });
  } catch (error) {
    console.error(error);
  }
  return null;
}
async function getUserReviews(connection, userid) {
  try {
    const [res] = await connection.execute('SELECT * FROM review WHERE reviewerid = ?', [userid]);
    return JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.error(error);
  }
  return [];
}

module.exports = {
  createReview, editReview, deleteReview, getGameReviews, getUserReview, getUserReviews, getReview,
};
