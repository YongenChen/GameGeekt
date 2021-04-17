
async function createReview(connection, args) { 
    // Query to add data
    try {
        await connection.execute('INSERT INTO review SET gameid = ?, reviewerid = ?, rating = ?, reviewbody = ?', [args.gameid, args.reviewerid, args.rating, args.reviewbody])
        return 1
    }
    catch (error) {
        console.error(error)
    }
    return 0
}
async function editReview(connection, args) {
    try {
        await connection.execute('REPLACE INTO review VALUES (?, ?, ?, ?, ?)', [args.reviewid, args.gameid, args.reviewerid, args.rating, args.reviewbody])
        return 1
    }
    catch (error) {
        console.error(error)
    }
    return 0
}
async function deleteReview(connection, args) {
    try {
        await connection.execute('DELETE FROM review WHERE reviewid = ?', [args.reviewid])
        return 1
    }
    catch (error) {
        console.error(error)
    }
    return 0
}
async function getReview(connection, data) { 
    try {
        [res] = await connection.execute('SELECT * FROM review WHERE reviewid = ?', [data.reviewid])
        res = JSON.parse(JSON.stringify(res))[0]
        return res
    }
    catch (error) {
        console.error(error)
    }
    return null
}
async function getGameReviews(connection, args) {
    try {
        [res] = await connection.execute('SELECT * FROM review WHERE gameid = ?', [args.gameid])
        res = JSON.parse(JSON.stringify(res))
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
async function getUserReviews(connection, args) { 
    try {
        [res] = await connection.execute('SELECT * FROM review WHERE reviewerid = ?', [args.userid])
        res = JSON.parse(JSON.stringify(res))
        return res
    }
    catch (error) {
        console.error(error)
    }
    return [] 
}

module.exports = {createReview, editReview, deleteReview, getGameReviews, getUserReview, getUserReviews, getReview}