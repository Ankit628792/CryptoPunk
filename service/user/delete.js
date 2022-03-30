const { default: User } = require("../../models/user");

module.exports = {
    deleteUser: async (req, res, next) => {
        try {
            const response = await User.deleteOne({ _id: req.query.id });
            if (response.deletedCount) {
                res.json({
                    status: {
                        message: "deleted successfully",
                        code: 203,
                    }
                });
            } else {
                res.json({
                    status: {
                        message: "User not found",
                        code: 403,
                    }
                });
            }

        } catch (err) {
            res.json({
                status: {
                    message: err.message,
                    code: 500,
                }
            })
        }
    }
}