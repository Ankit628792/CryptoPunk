
export const getAllNfts = async (req, res,user_connection) => {
    try {
        let query=`select * from nft limit ${req.query.limit ?? 100}`;
        const response=await user_connection.query(query);
        res.json({
            data: response.rows,
            message: {
                message: "Nft found",
                status: 200
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
export const getNft = async (req, res,user_connection) => {
    try {

        let query=`select * from nft where _id='${req.query.id}'`;
        const response=await user_connection.query(query);
        if (response) {
            res.json({
                data: response.rows[0],
                status: {
                    message: "Nft found",
                    code: 200,
                }
            })
        } else {
            res.json({
                status: {
                    message: "Nft with id doesn't exist",
                    code: 403,
                }
            })

        }
    } catch (err) {

    }
}


