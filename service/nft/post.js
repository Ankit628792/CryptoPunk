const { default: Nft } = require("../../models/nft");

const createNft = async (req, res, next) => {
    try {
        const user = await User.find({walletAddress: req.body.user});
        if(user){
            console.log(user);
        } 
        const nft = new Nft({
            ...req.body,
            user: user._id,
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