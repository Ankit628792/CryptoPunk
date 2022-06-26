import Collection from "../../models/collection";
import User from "../../models/user";

export const getAllCollections = async (req, res) => {
    let userId = req?.query?.userId;
    if (req.query.walletAddress) {
        const user = await User.findOne({ walletAddress: req.query.walletAddress })
        userId = user?._id
    }
    const query = userId ? { user: userId } : null
    try {
        const response = await Collection.find(query).limit(req.query.limit).sort({ _id: -1 });
        res.json({
            data: response,
            message: {
                message: "Collection found",
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

export const getCollection = async (req, res) => {
    try {
        const response = await Collection.find({ _id: req.query.id })
        res.json({
            data: response,
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

