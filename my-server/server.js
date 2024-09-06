const express = require('express');
const app = express();
const cors = require('cors');
require('./mqtt');
require('./helpers/connectMysql');
const dataSenSor = require('./routes/Data'); 

app.get('/', (req, res, next) => {
    console.log("Hello");
})
app.use(cors({
    origin:'http://localhost:3000',
    methods: ['GET', 'POST'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', dataSenSor);

const port =   8000;
app.listen(port , () => {
    console.log(`Server is running on port ${(port)}`);
})