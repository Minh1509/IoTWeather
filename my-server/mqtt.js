const mqtt = require("mqtt");
const conn = require("./helpers/connectMysql");
const {format} = require("date-fns");
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
    }
    else {
        console.log(err);
        return;
    }
  });
});
client.on("message", (topic, message) => {
  console.log(`Topic ${topic}: ${message}`);

  const data = {
    topic: topic.toString(),
    message: message.toString(),
  };
  
  let sensorData ;
  sensorData = JSON.parse(data.message);
  const currentTime = format(new Date(),"yyyy/MM/dd HH:mm:ss");
  const {temperature, humidity, light} = sensorData;
  const query = `INSERT INTO datasensor (temperature, humidity, light, time) VALUES (?, ?, ?, ?)`;
  conn.query(query, [temperature, humidity, light, currentTime], (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Add successfull");
  });
});
