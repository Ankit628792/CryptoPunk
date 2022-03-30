const { default: Collection } = require("../../models/collection");

module.exports = {
    deleteCollection: async (req, res, next) => {
        try{
            const response = await Collection.deleteOne({_id: req.query.id});
            if(response.deletedCount) {
                res.json({
                    status: {
                        message: "deleted successfully",
                        code: 203,
                    }
                });
            }else{
                res.json({
                    status: {
                        message: "Collection not found",
                        code: 403,
                    }
                });                
            }
            
        }catch(err){
            res.json({
                status: {
                    message: err.message,
                    code: 500,
                }
            })
        }
    }
}