import User from "../../models/user";
import Collection from "../../models/collection";

export const createCollection = async (req, res) => {
    try {
        const user = await User.find({ walletAddress: req.body.user });
        if (user) {
            const collection = new Collection({
                ...req.body,
                user: user._id
            })
            await collection.save();
            res.json({
                status: 201,
                data: "collection created successfully"
            })
        }
        else {
            console.log(err.message);
            res.json({
                status: 401,
                message: err.message,
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

