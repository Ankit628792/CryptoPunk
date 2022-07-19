
export const createCollection = async (req, res, user_connection) => {
    try {

        const response = await user_connection.query(`select * from userdata where walletaddress='${req.body.user}'`);
        const user = response.rows;
        if (user.length) {
            const query = `INSERT INTO collection (name,logoURL,featureURL,bannerURL,description,category,userid) VALUES ('${req.body.name}','${req.body.logoURL}',${req.body.featureURL ? `'${req.body.featureURL}'` : null},${req.body.bannerURL ? `'${req.body.bannerURL}'` : null},${req.body.description ? `'${req.body.description}'` : 'no description provided'},ARRAY[${req.body.category.map(item => `'${item}'`)}],'${user[0]._id}')`;
            console.log(query)
            const r = await user_connection.query(query);
            res.json({
                status: 201,
                data: "collection created successfully"
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

