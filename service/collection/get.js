const { default: Collection } = require("../../models/collection");

const getAllCollections =async (req ,res ,next) => {
    try{
        const response = await Collection.find();
        console.log("checking connections ", response);
        res.json({
            data: response,
            message:{
                message: "Collection found successfully",
                status: 200
            }
        })
    }catch(err){
        console.log(err);
        res.json({
            message: err.message,
            status: 500
        });
    }
}

const getCollection= async (req , res , next) => {
    try{
        const response = await Collection.find({_id: req.query.id});
        console.log(response);
        res.json({
            data: response,
            status: {
                message: "collection found",
                code: 200,
            }
        })
    }catch(err){

    }
}

module.exports = {
    getAllCollections,
    getCollection,
}