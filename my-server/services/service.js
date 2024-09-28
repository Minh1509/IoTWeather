"use strict";

const createError = require("http-errors");
const conn = require("../db/connectMysql");
const { formatter } = require("../utils/fomatter");
const client = require("../mqtt");

const formatData = (data, formatter) => {
  return data.map((item) => ({
    ...item,
    time: formatter(item.time),
  }));
};

class Service {
  static DataSensor = () => {
    return new Promise((resolve, reject) => {
      conn.query("select * from datasensor", (err, result) => {
        if (err) {
          reject(createError(409));
        } else {
          const formatterResult = formatData(result, formatter);
          resolve(formatterResult);
        }
      });
    });
  };

  static DataHistory = () => {
    return new Promise((resolve, reject) => {
      conn.query("select * from action_history", (err, result) => {
        if (err) {
          reject(createError(409));
        } else {
          const formatterResult = formatData(result, formatter);
          resolve(formatterResult);
        }
      });
    });
  };
  static DataCount = () => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT COUNT(*) AS count FROM datasensor WHERE smoke < 80 AND Date(time) = '2024-09-28'" ,
        (err, result) => {
          if (err) {
            reject(createError(409));
          } else {
            const count = result[0].count;
           
            resolve(count);
          }
        }
      );
    });
  };

  static PublishData = ({ topic, message }) => {
    return new Promise((resolve, reject) => {
      client.publish(topic, JSON.stringify(message), (err) => {
        if (err) {
          reject(createError(409));
        } else {
          resolve("Message published successfully");
        }
      });
    });
  };
}

module.exports = Service;
