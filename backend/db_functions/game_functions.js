
async function addGame(connection, data) { 
    try {
        //const game = { name: data.name, genre: data.genre };
        await connection.execute('INSERT INTO game SET name = ?, genre = ?', [data.name, data.genre])
        return 1
    }
    catch (error) {
        console.error(error)
    }
    return 0
}
async function getGamesByGenre(connection, args) { 
    try {
        [res] = await connection.execute('SELECT * FROM game WHERE genre = ?', [args.genre])
        res = JSON.parse(JSON.stringify(res))
        return res
    }
    catch (error) {
        console.error(error)
    }
    return []
}
async function getGame(connection, args) { 
    try {
        [res] = await connection.execute('SELECT * FROM game WHERE gameid = ?', [args.gameid])
        res = JSON.parse(JSON.stringify(res))[0]
        return res
    }
    catch (error) {
        console.error(error)
    }
    return []
}
async function getGameByTitle(connection, args) { 
    try {
        [res] = await connection.execute('SELECT * FROM game WHERE name = ?', [args.name])
        res = JSON.parse(JSON.stringify(res))[0]
        return res
    }
    catch (error) {
        console.error(error)
    }
    return []
}
async function getGames(connection) { 
    try {
        [res] = await connection.execute('SELECT * FROM game')
        res = JSON.parse(JSON.stringify(res))
        return res
    }
    catch (error) {
        console.error(error)
    }
    return []
}
//addGame, getGamesByGenre, 
module.exports = {getGames, getGamesByGenre, addGame, getGame, getGameByTitle}