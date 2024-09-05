const express = require('express');
const router = express.Router();
const conn = require('../helpers/connectMysql');

router.get("/datasensor", (req, res, next) => {
    conn.query('select * from datasensor',(err, result) => {
        if (err) {
            res.status(500).json({
                message: "Internal Server Error",
                error: err
            })
        } else {
            res.status(200).json({
                message: "Success",
                data: result
            })
        }
    })
})

module.exports = router;