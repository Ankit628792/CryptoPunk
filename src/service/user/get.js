
export const getAllUsers = async (req, res,user_connection) => {
    try {
        let query="select * from userdata order by rowid desc";
        const response=await user_connection.query(query);
        res.status(200).json({
            data: response.rows,
            message: {
                message: "Users found successfully",
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

export const getUser = async (req, res,user_connection) => {
    try {

        let query=`select * from userdata where _id='${req.query.id}'`;
        const response=await user_connection.query(query);

        res.json({
            data: response.rows[0],
            status: {
                message: "user found",
                code: 200,
            }
        })
    } catch (err) {
        console.log(err);
        res.json({
            message: err.message,
            status: 404
        });
    }
}

