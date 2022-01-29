const JWT = require('jsonwebtoken');
const redis_client = require('./redis');

exports.generateAccessToken = (data, option) => {
    const token = JWT.sign(data, process.env.SECRET_KEY_ACCESS, option);
    return token;
}

exports.generateRefreshToken = (data, option) => {
    const token = JWT.sign(data, process.env.SECRET_KEY_REFRESH, option);

    redis_client.set(data?.id.toString(), token)
        .then(data => console.log(data))
        .catch(error => console.log(error));

    return token;
}