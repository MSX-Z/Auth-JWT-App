require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require("./models");

const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');

const PORT = process.env.PORT || 3001;

const app = express();

// middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/', authRoute);
app.use('/users', usersRoute);

db.sequelize.sync().then(() => {
    console.log("database connection...");
    app.listen(PORT, () => {
        console.log(`Server is running port: ${PORT}`);
    });
});
