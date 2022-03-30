const { default: User } = require("../../models/user");

module.exports = {
    updateUser: (req, res, next) =>{
        try{
            const user = new User({
                _id: req.query.id,
                ...req.body
              });
              console.log(user)
             const response =  User.updateOne({_id: req.body._id} , user);
             if(response){
                 res.json({
                    message:{
                        code: 201,
                        message: "user updated successfully",
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