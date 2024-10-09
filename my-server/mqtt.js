const mqtt = require("mqtt");
const conn = require("./src/db/connectMysql");
require("dotenv").config();
const baseUri = "mqtt://localhost:1893";
const option = {
  username: process.env.USERNAMEMQTT,
  password: process.env.PASSWORDMQTT
};

const client = mqtt.connect(baseUri, option);

client.on("connect", () => {
  console.log("Kết nối thành công đến MQTT server");
  client.subscribe("datasensor", (err) => {
    if (!err) {
      console.log("Subscribed to topic datasensor");
    } else {
      throw err;
    }
  });
  client.subscribe("controldevice_server", (err) => {
    if (!err) {
      console.log("Subscribed to topic controldevice_server");
    } else {
      throw err;
    }
  });
});

client.on("message", (topic, message) => {
  console.log(`Topic ${topic}: ${message}`);

  let data;
  data = JSON.parse(message.toString());
  if (topic === "datasensor") {
    client.publish("datasensor_client", JSON.stringify(data));
    const { temperature, humidity, light, smoke } = data;
    const query = `INSERT INTO datasensor (temperature, humidity, light, smoke, time) VALUES (?, ?, ?, ?, NOW())`;

    conn.query(query, [temperature, humidity, light, smoke], (err, result) => {
      if (err) {
        throw err;
      }
      console.log("Thêm vào database thành công với topic datasensor");
    });
  } else if (topic === "controldevice_server") {
    client.publish("controldevice_client", JSON.stringify(data));
    const { device, status, warning } = data;
    const query = `INSERT INTO action_history (device, status, time) VALUES (?, ?, NOW())`;
    conn.query(query, [device, status], (err, result) => {
      if (err) {
        throw err;
      }
      console.log(
        "Thêm vào database thành công với topic controldevice_server"
      );
    });
  }
});

module.exports = client;
