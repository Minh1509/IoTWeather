'use strict';

const Service = require("../services/service");

class Controller {
    DataSensor = async (req, res, next) => {
        try {
            const data = await Service.DataSensor();
            res.send({
                message: "Success",
                data: data
            });
        } catch (error) {
            next(error);
        }
    };

    DataHistory = async (req, res, next) => {
        try {
            const data = await Service.DataHistory();
            res.send({
                message: "Success",
                data: data
            });
        } catch (error) {
            next(error);
        }
    };
    PublishData = async (req, res, next) => {
        try {
            const {topic, message} = req.body
            const data = await Service.PublishData({topic, message});
            res.send({
                message: "Success",
                data: data
            });
        } catch (error) {
            next(error);
        }
    };
   
}

module.exports = new Controller();