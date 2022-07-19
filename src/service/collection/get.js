
export const getAllCollections = async (req, res, user_connection) => {
    let userId = req.query?.userId
    if (req.query.walletAddress) {
        const userInfo = await user_connection.query(`select * from userdata where walletaddress='${req.query.walletAddress}'`)
        userId = userInfo.rows[0]?._id
    }

    const q = `select * from collection where ${userId ? `userId = '${userId}'` : `_id is not null`} order by _id desc limit ${req.query.limit ?? 100}`;
    try {
        const response = await user_connection.query(q);
        res.json({
            data: response.rows,
            message: {
                message: "Collection found",
                status: 200
            }
        })
    } catch (err) {
        res.json({
            message: err.message,
            status: 400
        });
    }
}

export const getCollection = async (req, res, user_connection) => {
    try {
        const response = await user_connection.query(`select * from collection where _id=${req.query.id}`)
        res.json({
            data: response.rows[0],
            status: {
                message: "collection found",
                code: 200,
            }
        })
    } catch (err) {
        console.log(err);
        res.json({
            message: err.message,
            status: 400
        });
    }
}

