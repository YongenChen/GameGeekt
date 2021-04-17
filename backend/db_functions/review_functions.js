
async function createReview(connection, data) { 
    // Query to add data
    try {
        const review = { gameid: data.gameid, reviewerid: data.reviewerid, rating: data.rating, reviewbody: data.reviewbody };
        await connection.execute('INSERT INTO review SET ?', review)
        return 1
    }
    catch (error) {
        console.error(error)
    }
    return 0
}
async function editReview(connection, data) {
    try {
        await connection.execute('REPLACE INTO review VALUES (?, ?, ?, ?, ?)', [data.reviewid, data.gameid, data.reviewerid, data.rating, data.reviewbody])
        return 1
    }
    catch (error) {
        console.error(error)
    }
    return 0
}
async function deleteReview(connection, reviewid) {
    try {
        await connection.execute('DELETE FROM review WHERE id = ?', reviewid)
        return 1
    }
    catch (error) {
        console.error(error)
    }
    return 0
}

async function getGameReviews(connection, gameid) {
    try {
        const [res] = await connection.execute('SELECT * FROM review WHERE gameid = ?', gameid)
        return res
    }
    catch (error) {
        console.error(error)
    }
    return [] 
}
async function getUserReview(connection, data) { 
    try {
        const res = await connection.execute('SELECT * FROM review WHERE gameid = ? AND reviewerid = ?', data.gameid, data.reviewerid)
        return res
    }
    catch (error) {
        console.error(error)
    }
    return null
}
async function getAllUserReviews(connection, userid) { 
    try {
        const [res] = await connection.execute('SELECT * FROM review WHERE reviewerid = ?', userid)
        return res
    }
    catch (error) {
        console.error(error)
    }
    return [] 
}

module.exports = {createReview, editReview, deleteReview, getGameReviews, getUserReview, getAllUserReviews}