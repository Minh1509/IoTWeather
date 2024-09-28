import { useState, useEffect } from "react";
import { FaTemperatureHalf } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { CiLight } from "react-icons/ci";
import getColorHumidity from "../data/SetColorHumidity";
import getColorTemperature from "../data/SetColorTemperature";
import getColorLight from "../data/SetColorLight";
import mqtt from "mqtt";
import { FaSmog } from "react-icons/fa";
import getColorSmoke from "../data/SetColorSmoke";

const StatusSensor = (props) => {
  const data = props.data;
  const [temperature, setTemperature] = useState(data[data.length-1].temperature);
  const [humidity, setHumidity] = useState(data[data.length-1].humidity);
  const [light, setLight] = useState(data[data.length-1].light);
  const [smoke, setSmoke] = useState(data[data.length-1].smoke);

  const {color: colorTem } = getColorTemperature(temperature);
  const {color: colorHum } = getColorHumidity(humidity);
  const {color: colorLight } = getColorLight(light);
  const {color: colorSmoke } = getColorSmoke(smoke);


  const baseUri = "ws://localhost:9001";
  const option = {
    username: "minh",
    password: "b21dccn531",
  };

  useEffect(() => {
    const client = mqtt.connect(baseUri, option);

    client.on("connect", () => {
      client.subscribe("datasensor_client");
    });

    client.on("message", (topic, message) => {
      const data = JSON.parse(message.toString());
      setTemperature(data.temperature);
      setHumidity(data.humidity);
      setLight(data.light);
      setSmoke(data.smoke);

    });

    return () => {
      client.end();
    };
  }, []);

  return (
    <ul className="insights">
      <li style = {{backgroundColor: colorTem}}>
        <FaTemperatureHalf
          style={{ color: "red" }}
        />
        <span className="inf">
          <h3>Temperature</h3>
          <p>{temperature}°C</p>
        </span>
      </li>
      <li style = {{backgroundColor: colorHum}}>
        <WiHumidity
          style={{ color: "blue"}}
        />
        <span className="inf">
          <h3>Humidity</h3>
          <p>{humidity}%</p>
        </span>
      </li>
      <li style = {{backgroundColor: colorLight}}>
        <CiLight
          style={{ color: "yellow" }}
        />
        <span className="inf">
          <h3>Light</h3>
          <p>{light} LUX</p>
        </span>
      </li>
      <li className={smoke>= 80 ? "warning" : ""} style = {{backgroundColor: colorSmoke}}>
        <FaSmog 
          style={{ color: "grey"}}
        />
        <span className="inf">
          <h3>Smoke</h3>
          <p>{smoke}%</p>
        </span>
      </li>
      
    </ul>
  );
};

export default StatusSensor;