import User from "../../models/user";

export const getAllUsers = async (req, res) => {
    try {
        const response = await User.find().sort({ _id: -1 });
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
            status: 400
        });
    }
}

export const getUser = async (req, res) => {
    try {
        const response = await User.find({ _id: req.query.id });
        res.json({
            data: response,
            status: {
                message: "user found",
                code: 200,
            }
        })
    } catch (err) {
        console.log(err);
        res.json({
            message: err.message,
            status: 404
        });
    }
}

