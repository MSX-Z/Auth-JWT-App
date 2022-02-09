const { FindUserWith } = require('../services/users');

exports.getUserInfo = async (req, res, next) => {
    const id = req.params.id;
    try {
        let user = await FindUserWith("id", id);
        if (!user)
            return res.status(404).json({ status: false, message: "That user does not exist" });

        user = {
            uid: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
        }

        return res.status(200).json({ status: true, message: "Success", data: { ...user } });
    } catch (error) {
        return res.status(404).json({ status: false, message: error.message });
    }
}