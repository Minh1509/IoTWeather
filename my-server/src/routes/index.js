'use strict'

const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();
const {asyncHandler} = require('../helpers/asyncHanlder');


router.get("/datasensor", asyncHandler(Controller.DataSensor));
router.get("/action_history", asyncHandler(Controller.DataHistory));
router.get("/countLedOn", asyncHandler(Controller.DataCountLedOn));
router.post("/publish", asyncHandler(Controller.PublishData));
router.get("/searchSensor", asyncHandler(Controller.SearchSensor));
router.get("/searchHistory", asyncHandler(Controller.SearchHistory));

module.exports = router;