import connectDB from './db'

export default async function (req, res) {
    const user_connection = await connectDB.connect();
    if (req.method == 'GET') {
        const query = `select * from userdata where walletAddress='${req.query.walletAddress}'`;

        const response = await user_connection.query(query);

        if (response.rows.length != 0) {
            const user = response.rows[0];
            const q = `select _id,name,category from collection where userid=${user._id}`;
            const collection = await user_connection.query(q);
            if (collection) {
                res.json({
                    data: collection.rows,
                    status: {
                        message: "user collection found",
                        code: 200,
                    }
                })
            } else {
                res.json({
                    status: {
                        message: "user collection with id doesn't exist",
                        code: 403,
                    }
                })

            }
        } else {
            const q = `select _id,name,category from collection`;
            const collection = await user_connection.query(q);
            if (collection) {
                res.json({
                    data: collection.rows,
                    status: {
                        message: "user collection found",
                        code: 200,
                    }
                })
            } else {
                res.json({
                    status: {
                        message: "could not get collection",
                        code: 403,
                    }
                })
            }
        }
    }

}