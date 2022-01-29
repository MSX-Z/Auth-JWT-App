const JWT = require('jsonwebtoken');

exports.verifyAccessToken = async (req, res, next) => {
    let accessToken = req.headers.authorization;

    if (!accessToken) return res.status(400).json({ status: false, message: "Tokens are not allowed." });

    accessToken = accessToken.split(' ')[1];

    try {
        const decode = await JWT.verify(accessToken, process.env.SECRET_KEY_ACCESS);
        req.user = decode;

        next();
    } catch (error) {
        return res.status(400).json({ status: false, message: error });
    }
}

exports.verifyRefreshToken = async (req, res, next) => {
    let { token } = req.body;

    if (!token) return res.status(400).json({ status: false, message: "Tokens are not allowed." });

    try {
        const decode = await JWT.verify(token, process.env.SECRET_KEY_REFRESH);
        req.user = decode;

        next();
    } catch (error) {
        return res.status(400).json({ status: false, message: error });
    }
}
