const redis = require('redis');

// connect to redis
const redis_client = redis.createClient();

redis_client.connect()
    .then(() => console.log('redis connecting...'))
    .catch(error => console.log(error));

module.exports = redis_client;