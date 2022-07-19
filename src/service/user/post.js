
export const createUser = async (req, res, user_connection) => {
    try {
        let query = `select * from userdata where walletaddress='${req.body.walletAddress}'`;
        const response = await user_connection.query(query);

        const getUser = response.rows
        if (!getUser.length && req.body.walletAddress) {
            let response = await user_connection.query(`INSERT INTO userdata (username,walletaddress) VALUES ('${req.body.username}','${req.body.walletAddress}')`);

            res.json({
                status: 201,
                data: "User created successfully"
            })
        }
    } catch (err) {
        console.log(err.message);
        res.json({
            status: 400,
            message: err.message,
        });
    }
}
