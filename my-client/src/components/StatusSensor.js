import { useState, useEffect } from "react";
import { FaTemperatureHalf } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { CiLight } from "react-icons/ci";
import getColorHumidity from "../data/SetColorHumidity";
import getColorTemperature from "../data/SetColorTemperature";
import getColorLight from "../data/SetColorLight";
import mqtt from "mqtt";

const StatusSensor = (props) => {
  const data = props.data;
  const [temperature, setTemperature] = useState(data[data.length-1].temperature);
  const [humidity, setHumidity] = useState(data[data.length-1].humidity);
  const [light, setLight] = useState(data[data.length-1].light);

  const {color: colorTem , backgroundColor: backgroundColorTem} = getColorTemperature(temperature);
  const {color: colorHum , backgroundColor: backgroundColorHum} = getColorHumidity(humidity);
  const {color: colorLight , backgroundColor: backgroundColorLight} = getColorLight(light);


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