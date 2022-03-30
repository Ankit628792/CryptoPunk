const { default: User } = require("../../models/user");

const createUser = (req , res , next) => {
    try{
        const user = new User({
            ...req.body,
        })
        user.save();
        console.log(user);
        res.json({
            status: 201,
            data: "User created successfully"
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
    createUser,
}