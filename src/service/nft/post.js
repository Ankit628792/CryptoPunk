

export const createNft = async (req, res, user_connection) => {
    try {
        let query = `select * from userdata where walletAddress='${req.body.user}'`;
        const response = await user_connection.query(query);
        const user = response.rows
        console.log(user)
        if (user.length) {
            const query = `INSERT INTO nft (name,media,nftcollection,blockchain,description,price,daterange,userid) VALUES ('${req.body.name}','${req.body.media}','${req.body.nftCollection}','${req.body.blockchain}',${req.body.description ? `'${req.body.description}'` : 'no description provided'},'${req.body.price}',ARRAY['${req.body.dateRange.map(item => `'${item}'`)}'],'${user[0]._id}')`
            console.log(query)
            let response = await user_connection.query(query);

            res.json({
                status: 201,
                data: "Nft created successfully"
            })
        }
        else {
            res.json({
                status: 400,
                message: 'Unauthorized user',
            });
        }
    } catch (err) {
        console.log(err.message);
        res.json({
            status: 400,
            message: err.message,
        });
    }
}
