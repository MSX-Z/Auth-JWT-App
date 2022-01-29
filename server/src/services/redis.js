const redis = require('redis');

// connect to redis
const redis_client = redis.createClient();

redis_client.connect()
    .then(() => console.log('connecting...'))
    .catch(error => console.log(error));

module.exports = redis_client;