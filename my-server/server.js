const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config
require('./db/connectMysql');
require('./mqtt');
const data = require("./routes/index.js");


app.use(cors({
    origin:'http://localhost:3000',
    methods: ['GET', 'POST'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', data);


const port =   8000;
app.listen(port , () => {
    console.log(`Server is running on port ${(port)}`);
})