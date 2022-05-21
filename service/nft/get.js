const { default: Nft } = require("../../models/nft");

const getAllNfts = async (req, res, next) => {
    try {
        const response = await Nft.find().limit(req.query.limit).sort({_id: -1})
        res.json({
            data: response,
            message: {
                message: "Nft found successfully",
                status: 200
            }
        })
    } catch (err) {
        console.log(err);
        res.json({
            message: err.message,
            status: 500
        });
    }
}
const getNft = async (req, res, next) => {
    try {
        const response = await Nft.findOne({ _id: req.query.id })
        console.log(response);
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


module.exports = {
    getAllNfts: getAllNfts,
    getNft: getNft,
}