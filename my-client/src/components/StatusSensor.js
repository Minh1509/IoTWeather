import { useState, useEffect } from "react";
import { FaTemperatureHalf } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { CiLight } from "react-icons/ci";
import getColorHumidity from "../data/SetColorHumidity";
import getColorTemperature from "../data/SetColorTemperature";
import getColorLight from "../data/SetColorLight";
import mqtt from "mqtt";

const StatusSensor = () => {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [light, setLight] = useState(null);

  const [colorTem, setColorTem] = useState("");
  const [backgroundColorTem, setBackgroundColorTem] = useState("");
  const [colorHum, setColorHum] = useState("");
  const [backgroundColorHum, setBackgroundColorHum] = useState("");
  const [colorLight, setColorLight] = useState("");
  const [backgroundColorLight, setBackgroundColorLight] = useState("");

  const baseUri = "ws://localhost:9001";
  const option = {
    username: "minh",
    password: "test",
  };

  useEffect(() => {
    const client = mqtt.connect(baseUri, option);

    client.on("connect", () => {
      console.log("Connected to MQTT broker");
      client.subscribe("datasensor_client");
    });

    client.on("message", (topic, message) => {
      const data = JSON.parse(message.toString());
      console.log(data);
      setTemperature(data.temperature);
      setHumidity(data.humidity);
      setLight(data.light);

      setColorTem(getColorTemperature(data.temperature).color);
      setBackgroundColorTem(
        getColorTemperature(data.temperature).backgroundColor
      );
      setColorHum(getColorHumidity(data.humidity).color);
      setBackgroundColorHum(
        getColorHumidity(data.humidity).backgroundColor
      );
      setColorLight(getColorLight(data.light).color);
      setBackgroundColorLight(
        getColorLight(data.light).backgroundColor
      );
    });

    return () => {
      client.end();
    };
  }, []);

  return (
    <ul className="insights">
      <li>
        <FaTemperatureHalf
          style={{ color: colorTem, backgroundColor: backgroundColorTem }}
        />
        <span className="inf">
          <h3>Temperature</h3>
          <p>{temperature}°C</p>
        </span>
      </li>
      <li>
        <WiHumidity
          style={{ color: colorHum, backgroundColor: backgroundColorHum }}
        />
        <span className="inf">
          <h3>Humidity</h3>
          <p>{humidity}%</p>
        </span>
      </li>
      <li>
        <CiLight
          style={{ color: colorLight, backgroundColor: backgroundColorLight }}
        />
        <span className="inf">
          <h3>Light</h3>
          <p>{light} LUX</p>
        </span>
      </li>
    </ul>
  );
};

export default StatusSensor;