const { default: User } = require("../../models/user");

const getAllUsers = async (req, res, next) => {
    try {
        const response = await User.find();
        console.log(response)
        res.status(200).json({
            data: response,
            message: {
                message: "Users found successfully",
                status: 200
            }
        })
    } catch (err) {
        console.log(err);
        res.json({
            message: err.message,
            status: 500
        });
    }
}

const getUser = async (req, res, next) => {
    try {
        const response = await User.find({ _id: req.query.id });
        console.log(response);
        res.json({
            data: response,
            status: {
                message: "user found",
                code: 200,
            }
        })
    } catch (err) {

    }
}

module.exports = {
    getAllUsers: getAllUsers,
    getUser
}