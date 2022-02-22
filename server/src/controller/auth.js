const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../services/jwt');
const redis_client = require('../services/redis');
const { FindUserWith, CreateUser } = require('../services/users');

exports.verifyAccessToken = (req, res, next) => {
    return res.status(200).json({ status: true, message: "Token valid", data: { ...req.user } });
}

exports.verifyRefreshToken = (req, res, next) => {
    const data = { ...req.user };

    const accessToken = generateAccessToken(data, { expiresIn: "1m" });
    const refreshToken = generateRefreshToken(data);

    return res.status(200).json({ status: true, message: "Successfully", data: { accessToken, refreshToken } });
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await FindUserWith("email", email);
        if (!user)
            return res.status(400).json({ status: false, message: "That user does not exist" });

        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.status(400).json({ status: false, message: "Email | Password Invalid" });

        const { password: _, createdAt, updatedAt, ...data } = user.dataValues;

        // generate tokens
        const accessToken = generateAccessToken(data, { expiresIn: "1m" });
        const refreshToken = generateRefreshToken(data);

        return res.status(200).json({ status: true, message: "Login successfully", data: data, tokens: { accessToken, refreshToken } });
    } catch (error) {
        res.status(404).json({ status: false, message: error.message });
    }
};

exports.register = async (req, res, next) => {
    let { firstname, lastname, email, password } = req.body;

    try {
        password = await bcrypt.hash(password, +process.env.SALT_ROUNDS);

        const result = await CreateUser({ firstname, lastname, email, password });
        const { password: _, ...data } = result?.dataValues;

        return res.status(200).json({ status: true, message: "Register successfully", data });
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
}

exports.logout = async (req, res, next) => {
    const data = req.user;
    const { id } = data;

    try {
        const _token = await redis_client.get(id.toString());
        if (!_token)
            return res.status(400).json({ status: false, message: "Unauthorized" });

        const result = await redis_client.del(id.toString());

        if (!result) return res.status(400).json({ status: false, message: "Logout unsuccessfully" });

        return res.status(200).json({ status: true, message: "Logout successfully" });
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
}

