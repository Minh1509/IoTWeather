const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const conn = require("../../db/connectMysql");

router.post("/publish", (req, res, next) => {
    console.log(req.body);
    const { topic, message } = req.body;
    client.publish(topic, JSON.stringify(message), (err) => {
      if (err) {
        next(createError(409));
      }
      res.send("Message published successfully");
    });
  });
  
  router.get("/subscribe/:topic", (req, res, next) => {
    console.log(req.params.topic);
    const { topic } = req.params.topic;
    client.subscribe(topic, (err) => {
      if (err) {
        next(createError(409));
      }
      res.send(`Subscribed to topic ${topic} successfully`);
    });
  });
  

  module.exports = router;