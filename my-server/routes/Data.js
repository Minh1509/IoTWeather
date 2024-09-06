const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const conn = require("../helpers/connectMysql");

router.get("/datasensor", (req, res, next) => {
  conn.query("select * from datasensor", (err, result) => {
    if (err) {
      next(createError(500));
    } else {
      res.json({
        message: "Success",
        data: result,
      });
    }
  });
});


router.get("/action_history", (req, res, next) => {
  conn.query("select * from action_history", (err, result) => {
    if (err) {
      next(createError(500));
    } else {
      res.json({
        message: "Success",
        data: result,
      });
    }
  });
})

module.exports = router;
