import User from "../../models/user";
import Collection from "../../models/collection";

export const createCollection = async (req, res) => {
    try {
        const user = await User.findOne({ walletAddress: req.body.user });
        if (user) {
            const collection = new Collection({
                ...req.body,
                user: user._id
            });
            const data = await collection.save();
            res.json({
                status: 201,
                data: "collection created successfully"
            })
        }
        else {
            res.json({
                status: 401,
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

