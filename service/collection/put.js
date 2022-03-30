const { default: Collection } = require("../../models/collection");

module.exports = {
    updateCollection: (req, res, next) =>{
        try{
            const collection = new Collection({
                _id: req.query.id,
                ...req.body
              });
              console.log(collection)
             const response =  collection.updateOne({_id: req.body._id}, collection);
             if(response){
                 res.json({
                    message:{
                        code: 201,
                        message: "collection updated successfully",
                    }
                 });
             }else{

             }
            
        }catch(err){
            console.log(err.message);
            res.json({
                status: 500,
                message: err.message,
            })
        }
    },
}