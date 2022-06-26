
import User from "../../models/user"
import Nft from "../../models/nft";

export const createNft = async (req, res, next) => {
    try {
        const user = await User.find({ walletAddress: req.body.user });
        if (user) {
            const nft = new Nft({
                ...req.body,
                user: user._id,
            })
            await nft.save();
            res.json({
                status: 201,
                data: "Nft created successfully"
            })
        }
        else {
            res.json({
                status: 404,
                message: 'User not found',
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
