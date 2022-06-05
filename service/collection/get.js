import Collection from "../../models/collection";

export const getAllCollections = async (req, res) => {
    const query = req.query?.userId ? { user: req.query?.userId } : req.query.walletAddress ? { walletAddress: req.query.walletAddress } : null
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

