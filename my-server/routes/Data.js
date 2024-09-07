const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const conn = require("../helpers/connectMysql");
const { formatter } = require('../utils/fomatter')

const formatData = (data, formatter) => {
  return data.map((item) => ({
    ...item,
    time: formatter(item.time),
  }));
};

router.get("/datasensor", (req, res, next) => {
  conn.query("select * from datasensor", (err, result) => {
    if (err) {
      next(createError(500));
    } else {
      const formatterResult = formatData(result, formatter)
      res.json({
        message: "Success",
        data: formatterResult,
      });
    }
  });
});


router.get("/action_history", (req, res, next) => {
  conn.query("select * from action_history", (err, result) => {
    if (err) {
      next(createError(500));
    } else {
      const formatterResult = formatData(result, formatter)
      res.json({
        message: "Success",
        data: formatterResult,
      });
    }
  });
})

module.exports = router;
