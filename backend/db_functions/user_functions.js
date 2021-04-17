async function createUser(connection, data) { 
    try {
        await connection.execute('INSERT INTO user SET username = ?, email = ?, password = ?', [data.username, data.email, data.password])
        return 1
    }
    catch (error) {
        console.error(error)
    }
    return 0
}
async function getUser(connection, args) { 
    try {
        [res] = await connection.execute('SELECT * FROM user WHERE userid = ?', [args.userid])
        res = JSON.parse(JSON.stringify(res))[0]
        console.log(res)
        return res
    }
    catch (error) {
        console.error(error)
    }
    return null
}

module.exports = {createUser, getUser}
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