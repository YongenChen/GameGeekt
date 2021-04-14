export default function addGame(connection, data) { 
    // Query to add data:
    const game = { name = data.name, genre = data.genre };
    connection.query('INSERT INTO game SET ?', game, (err, res) => {
        if(err) throw err;
    });
    return 1;
}
export default function getGamesByGenre(connection, genre) { 
    // Query to add data:
    connection.query('SELECT * FROM game WHERE genre = ?', genre, (err, res) => {
        if(err) throw err;
    });
    return res;
}