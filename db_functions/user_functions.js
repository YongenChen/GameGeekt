export default function createUser(connection, data) { 
    // Query to add data:
    const user = { username: data.username, email: data.email, password: data.password };
    connection.query('INSERT INTO user SET ?', user, (err, res) => {
        if(err) throw err;
    });
    return 1;
}
export default function editUser(connection, data) {
    connection.query('REPLACE INTO user VALUES (?, ?, ?, ?)', [data.userid, data.username, data.email, data.password],
        (err) => {
            if (err) throw err;
        }
    )
}
export default function deleteUser(connection, userid) {
    connection.query('DELETE FROM user WHERE id = ?', userid, (err, result) => {
        if (err) throw err;
    });
}

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