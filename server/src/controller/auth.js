const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const { FindUserWith, CreateUser } = require('../services/users');

exports.validateToken = (req, res, next) => res.status(200).json({ status: true, message: "Token valid", data: { ...req.user } });

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await FindUserWith("email", email);
        if (!user)
            return res.status(400).json({ status: false, message: "That user does not exist." });

        const match = await bcrypt.compare(password, user.password);

        if (match) {
            const accessToken = JWT.sign({
                uid: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
            }, process.env.SECRET_KEY, { expiresIn: "5min" });

            return res.status(200).json({ status: true, message: "Login successfully.", accessToken });
        } else
            return res.status(400).json({ status: false, message: "Email | Password Invalid." });
    } catch (error) {
        res.status(404).json({ status: false, message: error.message });
    }
};

exports.register = async (req, res, next) => {
    let { firstname, lastname, email, password } = req.body;

    try {
        password = await bcrypt.hash(password, +process.env.SALT_ROUNDS);
        const result = await CreateUser({ firstname, lastname, email, password });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
}
