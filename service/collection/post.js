const { default: Collection } = require("../../models/collection");

const createCollection = async (req , res , next) => {
    try{
        const collection = new Collection({
            ...req.body
        })
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