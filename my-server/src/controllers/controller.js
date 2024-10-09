"use strict";

const Service = require("../services/service");

class Controller {
  DataSensor = async (req, res, next) => {
    const data = await Service.DataSensor();
    res.send({
      message: "Fetch full data sensor success",
      data: data,
    });
  };

  DataHistory = async (req, res, next) => {
    const data = await Service.DataHistory();
    res.send({
      message: "Fetch full action history success",
      data: data,
    });
  };

  DataCountLedOn = async (req, res, next) => {
    const data = await Service.DataCountLedOn();
    res.send({
      message: "Fetch count led on success",
      data: data,
    });
  };

  PublishData = async (req, res, next) => {
    const { topic, message } = req.body;
    const data = await Service.PublishData({ topic, message });
    res.send({
      message: "Publish data success",
      data: data,
    });
  };
  SearchSensor = async (req, res, next) => {
    const data = await Service.SearchSensor({ keySearch: req.query.keySearch });
    res.send({
      message: "Search data sensor success",
      data: data,
    });
  };
  SearchHistory = async (req, res, next) => {
    const data = await Service.SearchHistory({
      keySearch: req.query.keySearch,
    });
    res.send({
      message: "Search action history sucess",
      data: data,
    });
  };
}

module.exports = new Controller();
