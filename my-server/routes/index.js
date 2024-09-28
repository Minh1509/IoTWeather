const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");


router.get("/datasensor", Controller.DataSensor);
router.get("/action_history", Controller.DataHistory);
router.get("/count", Controller.DataCount);
router.post("/publish", Controller.PublishData);

module.exports = router;