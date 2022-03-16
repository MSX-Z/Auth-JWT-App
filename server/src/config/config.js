require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOSTNAME,
        dialect: "mysql",
        timezone: "+07:00",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    test: {
        username: null,
        password: null,
        database: "database_test",
        host: "127.0.0.1",
        dialect: "mysql",
        timezone: "+07: 00",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    production: {
        username: null,
        password: null,
        database: "database_production",
        host: "127.0.0.1",
        dialect: "mysql",
        timezone: "+07: 00",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
}