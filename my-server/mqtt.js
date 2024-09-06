const mqtt = require("mqtt");
const conn = require("./helpers/connectMysql");
const baseUri = "mqtt://localhost:1883";
const option = {
  username: "root",
  password: "password",
};

const client = mqtt.connect(baseUri, option);

client.on("connect", () => {
  console.log("Connected to MQTT server");
  client.subscribe("datasensor", (err) => {
    if (!err) {
      console.log("Subscribed to datasensor");
    } else {
      throw err;
    }
  });
  client.subscribe("action_history", (err) => {
    if (!err) {
      console.log("Subscribed to action_history");
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
    const { temperature, humidity, light } = data;
    const query = `INSERT INTO datasensor (temperature, humidity, light, time) VALUES (?, ?, ?, NOW())`;

    conn.query(query, [temperature, humidity, light], (err, result) => {
      if (err) {
        throw err;
      }
      console.log("Add successful to table datasensor");
    });
  } else {
    const { device, status } = data;
    const query = `INSERT INTO action_history (device, status, time) VALUES (?, ?, NOW())`;
    conn.query(query, [device, status], (err, result) => {
      if (err) {
        throw err;
      }
      console.log("Add successful to table action_history");
    });
  }
});
