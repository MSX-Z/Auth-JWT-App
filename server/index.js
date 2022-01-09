require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require("./models");

const authRoute = require('./routes/auth');

const PORT = process.env.PORT || 3001;

const app = express();

// middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/', authRoute);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running port: ${PORT}`);
    });
});
