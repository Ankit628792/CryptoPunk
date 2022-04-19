const { default: User } = require("../../models/user");

const createUser = async (req, res, next) => {
    try {
        const getUser = await User.findOne(req.body)
        if (!getUser) {
            const user = new User({
                ...req.body,
            })
            await user.save();
            console.log(user);
            res.json({
                status: 201,
                data: "User created successfully"
            })
        }
    } catch (err) {
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