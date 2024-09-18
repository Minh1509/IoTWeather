const mqtt = require("mqtt");
const conn = require("./db/connectMysql");
const baseUri = "mqtt://localhost:1893";
const option = {
  username: "minh",
  password: "b21dccn531",
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
  client.subscribe("action_history", (err) => {
    if (!err) {
      console.log("Subscribed to topic action_history");
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
    
    client.publish("datasensor_client" , JSON.stringify(data));
    const { temperature, humidity, light } = data;
    const query = `INSERT INTO datasensor (temperature, humidity, light, time) VALUES (?, ?, ?, NOW())`;

    conn.query(query, [temperature, humidity, light], (err, result) => {
      if (err) {
        throw err; 
      }
      console.log("Thêm vào database thành công với topic datasensor");
    });
  } else {
    
    client.publish("controldevice" ,JSON.stringify(data) );
    const { device, status } = data;
    const query = `INSERT INTO action_history (device, status, time) VALUES (?, ?, NOW())`;
    conn.query(query, [device, status], (err, result) => {
      if (err) {
        throw err;
      }
      console.log("Thêm vào database thành công với topic action_history");
    });
  }
});