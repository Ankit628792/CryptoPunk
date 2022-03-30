const { default: Nft } = require("../../models/nft");

const createNft = async (req, res, next) => {
    try {
        const nft = new Nft({
            ...req.body,
        })
        await nft.save();
        console.log(nft);
        res.json({
            status: 201,
            data: "Nft created successfully"
        })
    } catch (err) {
        console.log(err.message);
        res.json({
            status: 500,
            message: err.message,
        });
    }
}

module.exports = {
    createNft,
}