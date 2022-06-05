import Nft from "../../models/nft";

export const getAllNfts = async (req, res) => {
    try {
        const response = await Nft.find().limit(req.query.limit)
        res.json({
            data: response,
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
export const getNft = async (req, res, next) => {
    try {
        const response = await Nft.findOne({ _id: req.query.id })
        if (response) {
            res.json({
                data: response,
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


