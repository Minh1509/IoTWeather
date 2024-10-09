const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
require('./src/db/connectMysql.js');
require('./mqtt');
const data = require("./src/routes/index.js");


app.use(cors({
    origin:'http://localhost:3000',
    methods: ['GET', 'POST'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', data);

app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: err.message || "Internal server error"
    })
})


const port = process.env.PORT || 8080;
app.listen(port , () => {
    console.log(`Server is running on port ${(port)}`);
})