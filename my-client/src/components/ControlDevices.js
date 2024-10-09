import React, { useEffect, useState, useRef } from "react";
import { FaFan, FaRegLightbulb } from "react-icons/fa";
import mqtt from "mqtt";

const ControlDevice = (props) => {
  const [isFanOn, setFanIsOn] = useState(false);
  const [isLedOn, setLedIsOn] = useState(false);
  const [isLed1On, setLed1IsOn] = useState(false);
  const [isLed3On, setLed3IsOn] = useState(false); 
  const [alertMessage, setAlertMessage] = useState("");
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [prevDataLight, setPrevDataLight] = useState(props.dataSmoke);

  const dataCountOn = props.dataCountOn;
  const dataLight = props.dataSmoke;
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
      Fan: setFanIsOn,
      LED1: setLedIsOn,
      LED2: setLed1IsOn,
      LED3: setLed3IsOn, 
    };

    Object.keys(deviceStatusMap).forEach((device) => {
      if (latestDevices[device]) {
        deviceStatusMap[device](latestDevices[device].status === "On");
      }
    });
  }, [data]);

  const clientRef = useRef(null);

  useEffect(() => {
    const baseUri = "ws://localhost:9001"; 
    const option = {
      username: "minh",
      password: "b21dccn531",
    };

    clientRef.current = mqtt.connect(baseUri, option);

    clientRef.current.on("connect", () => {
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
        } else if (device === "LED3") {
          setLed3IsOn(status === "On");
        }
      }
    });

    return () => {
      clientRef.current.end();
    };
  }, []);

  useEffect(() => {
    if (dataLight > 80 && !isLed3On && prevDataLight <= 80) {
      clientRef.current.publish("controldevice",JSON.stringify({ device: "LED3", status: "On", warning: true })
      );
      setAlertMessage("LED3 is being turned On");
      setShowProgressBar(true);
      setTimeout(() => {
        setAlertMessage("");
        setShowProgressBar(false);
      }, 1500);
    } else if (dataLight < 80 && isLed3On && prevDataLight >= 80) {
      clientRef.current.publish("controldevice",JSON.stringify({ device: "LED3", status: "Off" }));
      setAlertMessage("LED3 is being turned Off");
      setShowProgressBar(true);
      setTimeout(() => {
        setAlertMessage("");
        setShowProgressBar(false);
      }, 1500);
    }
    setPrevDataLight(dataLight);
  }, [dataLight, prevDataLight, isLed3On]);

  const handleDeviceControl = (device, status) => {
    clientRef.current.publish("controldevice",JSON.stringify({ device, status }));
    setAlertMessage(`${device} is being turned ${status}`);
    setShowProgressBar(true);
    setTimeout(() => {
      setAlertMessage("");
      setShowProgressBar(false);
    }, 1500);
  };

  return (
    <div className="device">
      <h3>Control Device</h3>
      <p
        style={{
          backgroundColor: "#f6f6f9",
          boxSizing: "border-box",
          borderRadius: "5px",
          textAlign: "center",
          color: "#388e3c",
          fontWeight: "600",
          fontSize: "20px",
        }}
      >
        {alertMessage}
        {showProgressBar && <div className="progress-bar"></div>}
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
            <h4>Đèn LED 1</h4>
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
            <h4>Đèn LED 2</h4>
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
        <li>
          <FaRegLightbulb className={isLed3On ? "blink" : ""} />
          <span className="inf">
            <h4>Cảnh báo</h4>
            <div className="active">
              <button
                className={`btn-on ${isLed3On ? "activate" : ""}`}
                onClick={() => handleDeviceControl("LED3", "On")}
              >
                On
              </button>
              <button
                className={`btn-off ${!isLed3On ? "notactivate" : ""}`}
                onClick={() => handleDeviceControl("LED3", "Off")}
              >
                Off
              </button>
            </div>
          </span>
        </li>
        <p style={{fontWeight:'600', fontSize: '18px'}}>Số lần bật đèn led cảnh báo: {dataCountOn}</p>
      </ul>
    </div>
  );
};

export default ControlDevice;