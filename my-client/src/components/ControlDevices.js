import React, { useEffect, useState, useRef } from "react";
import { FaFan, FaRegLightbulb } from "react-icons/fa";
import mqtt from "mqtt";

const ControlDevice = (props) => {
  const [isFanOn, setFanIsOn] = useState(false);
  const [isLedOn, setLedIsOn] = useState(false);
  const [isLed1On, setLed1IsOn] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [prevDataSmoke, setPrevDataSmoke] = useState(props.dataSmoke);
  const dataSmoke = props.dataSmoke;

  const clientRef = useRef(null);

  useEffect(() => {
    const baseUri = "ws://localhost:9001"; // Sử dụng cổng WebSocket
    const option = {
      username: "minh",
      password: "b21dccn531",
    };

    clientRef.current = mqtt.connect(baseUri, option);

    clientRef.current.on("connect", () => {
      console.log("Connected to MQTT server");
      clientRef.current.subscribe("controldevice_client", { qos: 1 });
    });

    clientRef.current.on("message", (topic, message) => {
      if (topic === "controldevice_client") {
        const payload = JSON.parse(message.toString());
        const { device, status } = payload;

        if (device === "Fan") {
          setFanIsOn(status === "On");
        } else if (device === "LED1") {
          setLedIsOn(status === "On");
        } else if (device === "LED2") {
          setLed1IsOn(status === "On");
        }
      }
    });

    return () => {
      clientRef.current.end();
    };
  }, []);

  useEffect(() => {
    if (dataSmoke >= 80 && prevDataSmoke < 80 && !isFanOn) {
      clientRef.current.publish(
        "controldevice",
        JSON.stringify({ device: "Fan", status: "On" })
      );
      setAlertMessage("Fan is being turned On");
      setTimeout(() => {
        setAlertMessage("");
      }, 1500);
    } else if (dataSmoke <= 20 && isFanOn && prevDataSmoke > 20) {
      clientRef.current.publish(
        "controldevice",
        JSON.stringify({ device: "Fan", status: "Off" })
      );
      setAlertMessage("Fan is being turned Off");
      setTimeout(()=> {
        setAlertMessage("");
      }, 1500);
    }
    setPrevDataSmoke(dataSmoke);
  }, [dataSmoke, prevDataSmoke, isFanOn]);

  const handleDeviceControl = (device, status) => {
    clientRef.current.publish(
      "controldevice",
      JSON.stringify({ device, status })
    );
    setAlertMessage(`${device} is being turned ${status}`);
    setTimeout(() => {
      setAlertMessage("");
    }, 1500);
  };

  return (
    <div className="device">
      <h3>Control Device</h3>
      <p
        style={{
          backgroundColor: "#aaa",
          boxSizing: "border-box",
          borderRadius: "5px",
          textAlign: "center",
          color: "#fff",
          fontWeight: "600",
          fontSize: "17px",
        }}
      >
        {alertMessage}
      </p>

      <ul className="device-item">
        <li>
          <FaFan className={isFanOn ? "fan-icon-spin" : ""} />
          <span className="inf">
            <h4>Fan</h4>
            <div className="active">
              <button
                className={`btn-on ${isFanOn ? "activate" : ""}`}
                onClick={() => handleDeviceControl("Fan", "On")}
              >
                On
              </button>
              <button
                className={`btn-off ${!isFanOn ? "notactivate" : ""}`}
                onClick={() => handleDeviceControl("Fan", "Off")}
              >
                Off
              </button>
            </div>
          </span>
        </li>
        <li>
          <FaRegLightbulb className={isLedOn ? "blink" : ""} />
          <span className="inf">
            <h4>LED 1</h4>
            <div className="active">
              <button
                className={`btn-on ${isLedOn ? "activate" : ""}`}
                onClick={() => handleDeviceControl("LED1", "On")}
              >
                On
              </button>
              <button
                className={`btn-off ${!isLedOn ? "notactivate" : ""}`}
                onClick={() => handleDeviceControl("LED1", "Off")}
              >
                Off
              </button>
            </div>
          </span>
        </li>
        <li>
          <FaRegLightbulb className={isLed1On ? "blink" : ""} />
          <span className="inf">
            <h4>LED 2</h4>
            <div className="active">
              <button
                className={`btn-on ${isLed1On ? "activate" : ""}`}
                onClick={() => handleDeviceControl("LED2", "On")}
              >
                On
              </button>
              <button
                className={`btn-off ${!isLed1On ? "notactivate" : ""}`}
                onClick={() => handleDeviceControl("LED2", "Off")}
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
