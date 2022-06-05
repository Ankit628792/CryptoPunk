import User from "../../models/user";

export const createUser = async (req, res) => {
    try {
        const getUser = await User.findOne(req.body)
        if (!getUser) {
            const user = new User({
                ...req.body,
            })
            await user.save();
            res.json({
                status: 201,
                data: "User created successfully"
            })
        }
    } catch (err) {
        console.log(err.message);
        res.json({
            status: 400,
            message: err.message,
        });
    }
}
