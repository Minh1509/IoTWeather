import React, { useEffect, useState } from "react";
import { FaFan, FaRegLightbulb } from "react-icons/fa";
import mqtt from "mqtt";

const ControlDevice = (props) => {
  const [isFanOn, setFanIsOn] = useState(true);
  const [isLedOn, setLedIsOn] = useState(true);
  const [isLed1On, setLed1IsOn] = useState(true);
  const data = props.data;
  useEffect(() => {
    const latestDevices = {};

    for (let i = data.length - 1; i >= 0; i--) {
      const device = data[i].device;
      const status = data[i].status;
      if (!latestDevices[device]) {
        latestDevices[device] = { device, status };
      }
    }

    const deviceStatusMap = {
      "Fan": setFanIsOn,
      "LED1": setLedIsOn,
      "LED2": setLed1IsOn,
    };

    Object.keys(deviceStatusMap).forEach((device) => {
      if (latestDevices[device]) {
        deviceStatusMap[device](latestDevices[device].status === "On");
      }
    });
  }, [data]);

  const baseUri = "ws://localhost:9001"; // Sử dụng cổng WebSocket
  const option = {
    username: "minh",
    password: "b21dccn531",
  };

  const client = mqtt.connect(baseUri, option);

  useEffect(() => {
    client.on("connect", () => {
      // console.log("Connected to MQTT server");
    });

    return () => {
      client.end();
    };
  }, [client]);

  const handleToggle = (status) => {
    setFanIsOn(status);
    client.publish(
      "action_history",
      JSON.stringify({ device: "Fan", status: status ? "On" : "Off" })
    );
  };

  const handleToggleLed = (status) => {
    setLedIsOn(status);
    client.publish(
      "action_history",
      JSON.stringify({ device: "LED1", status: status ? "On" : "Off" })
    );
  };

  const handleToggleLed1 = (status) => {
    setLed1IsOn(status);
    client.publish(
      "action_history",
      JSON.stringify({ device: "LED2", status: status ? "On" : "Off" })
    );
  };

  return (
    <div className="device">
      <h3>Control Device</h3>
      <ul className="device-item">
        <li>
          <FaFan className={isFanOn ? "fan-icon-spin" : ""} />
          <span className="inf">
            <h4>Quạt</h4>
            <div className="active">
              <button
                className={`btn-on ${isFanOn ? "activate" : ""}`}
                onClick={() => handleToggle(true)}
              >
                On
              </button>
              <button
                className={`btn-off ${!isFanOn ? "notactivate" : ""}`}
                onClick={() => handleToggle(false)}
              >
                Off
              </button>
            </div>
          </span>
        </li>
        <li>
          <FaRegLightbulb className={isLedOn ? "blink" : ""} />
          <span className="inf">
            <h4>Đèn LED 1</h4>
            <div className="active">
              <button
                className={`btn-on ${isLedOn ? "activate" : ""}`}
                onClick={() => handleToggleLed(true)}
              >
                On
              </button>
              <button
                className={`btn-off ${!isLedOn ? "notactivate" : ""}`}
                onClick={() => handleToggleLed(false)}
              >
                Off
              </button>
            </div>
          </span>
        </li>
        <li>
          <FaRegLightbulb className={isLed1On ? "blink" : ""} />
          <span className="inf">
            <h4>Đèn LED 2</h4>
            <div className="active">
              <button
                className={`btn-on ${isLed1On ? "activate" : ""}`}
                onClick={() => handleToggleLed1(true)}
              >
                On
              </button>
              <button
                className={`btn-off ${!isLed1On ? "notactivate" : ""}`}
                onClick={() => handleToggleLed1(false)}
              >
                Off
              </button>
            </div>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default ControlDevice;
