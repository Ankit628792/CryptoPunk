const { default: Nft } = require("../../models/nft");

module.exports = {
    updateNft: (req, res, next) => {
        try {
            const nft = new Nft({
                _id: req.query.id,
                ...req.body
            });
            console.log(nft)
            const response = Nft.updateOne({ _id: req.body._id }, nft);
            if (response) {
                res.json({
                    message: {
                        code: 201,
                        message: "NFT updated successfully",
                    }
                });
            } else {

            }

        } catch (err) {
            console.log(err.message);
            res.json({
                status: 500,
                message: err.message,
            })
        }
    },
}