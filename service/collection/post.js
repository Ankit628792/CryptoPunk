const { default: Collection } = require("../../models/collection");
const {default: User} = require("../../models/user");
const createCollection = async (req , res , next) => {
    try{
        const user = await User.find({walletAddress: req.body.user});
        if(user){
            console.log(user);
        } 
        const collection = new Collection({
            ...req.body,
            user: user._id
        })
        console.log(req.body);
        await collection.save();
        res.json({
            status: 201,
            data: "collection created successfully"
        })
    }catch(err){
        console.log(err.message);
        res.json({
            status: 500,
            message: err.message,
        });
    }
}

module.exports = {
    createCollection,
}