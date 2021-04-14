export default function createReview(connection, data) { 
    // Query to add data:
    const review = { gameid = data.gameid, reviewerid = data.reviewerid, rating = data.rating, reviewbody = data.reviewbody };
    connection.query('INSERT INTO review SET ?', review, (err, res) => {
        if(err) throw err;
    });
    return 1;
}
export default function editReview(connection, data) {
    connection.query('REPLACE INTO review VALUES (?, ?, ?, ?)', [data.reviewid, data.username, data.email, data.password],
        (err) => {
            if (err) throw err;
        }
    )
}
export default function getGameReviews(connection, gameid) { 
    // Query to add data:
    connection.query('SELECT * FROM review WHERE gameid = ?', gameid, (err, res) => {
        if(err) throw err;
    });
    return res;
}
export default function getUserReview(connection, data) { 
    // Query to add data:
    connection.query('SELECT * FROM review WHERE gameid = ? AND reviewerid = ?', data.gameid, data.reviewerid, (err, res) => {
        if(err) throw err;
    });
    return res;
}
export default function getUserReviews(connection, userid) { 
    // Query to add data:
    connection.query('SELECT * FROM review WHERE reviewerid = ?', userid, (err, res) => {
        if(err) throw err;
    });
    return res;
}
