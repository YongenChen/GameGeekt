async function getUser(connection, userid) {
  try {
    const [res] = await connection.execute('SELECT * FROM user WHERE userid = ?', [userid]);
    return JSON.parse(JSON.stringify(res))[0];
  } catch (error) {
    console.error(error);
  }
  return null;
}
async function getUsers(connection) {
  try {
    const [res] = await connection.execute('SELECT * FROM user');
    return JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.error(error);
  }
  return null;
}
async function getUserByName(connection, username) {
  try {
    const [res] = await connection.execute('SELECT * FROM user WHERE username = ?', [username]);
    return JSON.parse(JSON.stringify(res))[0];
  } catch (error) {
    console.error(error);
  }
  return null;
}

async function createUser(connection, { username, email, passhash }) {
  try {
    // verify(password, hashedPassword) to verify
    await connection.execute('INSERT INTO user SET username = ?, email = ?, password = ?', [username, email, passhash]);
    return await getUserByName(connection, username);
  } catch (error) {
    console.error(error);
  }
  return null;
}

module.exports = {
  createUser, getUser, getUserByName, getUsers,
};
/*
export default function changeUserPassword(connection, data) {
    connection.query('UPDATE user SET password = ? Where userid = ?',[data.password, data.userid],
        (err) => {
          if (err) throw err;
        }
    )
}
export default function changeUserEmail(connection, data) {
    connection.query('UPDATE user SET email = ? Where userid = ?',[data.email, data.userid],
        (err) => {
          if (err) throw err;
        }
    )
}
export default function changeUsername(connection, data) {
    connection.query('UPDATE user SET username = ? Where userid = ?',[data.username, data.userid],
        (err) => {
          if (err) throw err;
        }
    )
}
*/