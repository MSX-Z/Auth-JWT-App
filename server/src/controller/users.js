const { FindUserWith } = require('../services/users');

exports.getUserInfo = async (req, res, next) => {
    const uid = req.params.id;
    try {
        let user = await FindUserWith("id", uid);
        if (!user)
            return res.status(404).json({ status: false, message: "That user does not exist" });

        const { id, firstname, lastname, email } = user;
        const data = {
            id,
            firstname,
            lastname,
            email
        }

        return res.status(200).json({ status: true, message: "Success", data });
    } catch (error) {
        return res.status(404).json({ status: false, message: error.message });
    }
}