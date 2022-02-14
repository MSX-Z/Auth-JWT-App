const JWT = require('jsonwebtoken');
const redis_client = require('../services/redis');

exports.verifyAccessToken = async (req, res, next) => {
    let accessToken = req.headers.authorization;

    if (!accessToken) return res.status(400).json({ status: false, message: "Tokens are not allowed" });

    accessToken = accessToken.split(' ')[1];

    try {
        const decode = await JWT.verify(accessToken, process.env.SECRET_KEY_ACCESS);
        const { iat, exp, ...data } = decode;
        req.user = data;

        next();
    } catch (error) {
        return res.status(400).json({ status: false, message: error });
    }
}

exports.verifyRefreshToken = async (req, res, next) => {
    let { token } = req.body;

    if (!token) return res.status(400).json({ status: false, message: "Tokens are not allowed" });

    try {
        const decode = await JWT.verify(token, process.env.SECRET_KEY_REFRESH);

        const { iat, ...data } = decode;

        req.user = data;

        const _token = await redis_client.get(data.id.toString());
        if (!_token || _token !== token)
            return res.status(400).json({ status: false, message: "Unauthorized" });
        next();
    } catch (error) {
        return res.status(400).json({ status: false, message: error });
    }
}
