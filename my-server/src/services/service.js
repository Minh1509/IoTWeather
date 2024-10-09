"use strict";

const createError = require("http-errors");
const conn = require("../db/connectMysql");
const { formatter } = require("../utils/fomatter");
const client = require("../../mqtt");
const { rejects } = require("assert");

const formatData = (data, formatter) => {
  return data.map((item) => ({
    ...item,
    time: formatter(item.time),
  }));
};

class Service {
  static async DataSensor() {
    return new Promise((resolve, reject) => {
      conn.query("select * from datasensor", (err, result) => {
        if (err) {
          reject(createError(409));
        } else {
          const data = formatData(result, formatter);
          resolve(data);
        }
      });
    });
  }

  static async DataHistory() {
    return new Promise((resolve, reject) => {
      conn.query("select * from action_history", (err, result) => {
        if (err) {
          reject(createError(409));
        } else {
          const data = formatData(result, formatter);
          resolve(data);
        }
      });
    });
  }
  static async DataCountLedOn() {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT COUNT(*) AS count FROM action_history WHERE device = 'LED3' and status = 'On' AND Date(time) = '2024-10-09'",
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
  }

  static async PublishData({ topic, message }) {
    return new Promise((resolve, reject) => {
      client.publish(topic, JSON.stringify(message), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  static async SearchSensor({ keySearch }) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM datasensor 
        WHERE id LIKE ? 
        OR temperature LIKE ? 
        OR humidity LIKE ? 
        OR light LIKE ? 
        OR DATE_FORMAT(time, '%Y/%m/%d %H:%i:%s') LIKE ?
      `;
      const searchPattern = `%${keySearch}%`;
      conn.query(
        query,
        [
          searchPattern,
          searchPattern,
          searchPattern,
          searchPattern,
          searchPattern,
        ],
        (err, result) => {
          if (err) {
            reject(createError(409));
          } else {
            const data = formatData(result, formatter);
            resolve(data);
          }
        }
      );
    });
  }

  static async SearchHistory({ keySearch }) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM action_history 
        WHERE 
        
        DATE_FORMAT(time, '%Y/%m/%d %H:%i:%s') LIKE ?
      `;
      const searchPattern = `%${keySearch}%`;
      conn.query(
        query,
        [searchPattern, searchPattern, searchPattern, searchPattern],
        (err, result) => {
          if (err) {
            reject(createError(409));
          } else {
            const data = formatData(result, formatter);
            resolve(data);
          }
        }
      );
    });
  }
}

module.exports = Service;
