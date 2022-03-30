const { default: Nft } = require("../../models/nft");

module.exports = {
    deleteNft: async (req, res, next) => {
        try {
            const response = await Nft.deleteOne({ _id: req.params.id });
            if (response.deletedCount) {
                res.json({
                    status: {
                        message: "deleted successfully",
                        code: 203,
                    }
                });
            } else {
                res.json({
                    status: {
                        message: "Nft not found",
                        code: 403,
                    }
                });
            }

        } catch (err) {
            res.json({
                status: {
                    message: err.message,
                    code: 500,
                }
            })
        }
    }
}