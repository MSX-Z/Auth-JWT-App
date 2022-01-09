const JWT = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
    let accessToken = req.headers.authorization;

    if (!accessToken) return res.status(400).json({ status: false, message: "Tokens are not allowed." });

    accessToken = accessToken.split(' ')[1];

    try {
        const decode = await JWT.verify(accessToken, process.env.SECRET_KEY);
        req.user = decode;

        next();
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
}

module.exports = validateToken;