#include "DHT.h"
#include <ESP8266WiFi.h>
#include <Ticker.h>
#include <AsyncMqttClient.h>
#include <ArduinoJson.h>

#define WIFI_SSID "Loi"
#define WIFI_PASSWORD "0976300109"

// Raspberri Pi Mosquitto MQTT Broker
#define MQTT_HOST IPAddress(192, 168, 1, 29)
#define MQTT_PORT 1893
#define MQTT_PUB_SENSOR "datasensor" // topic pub datasensor
#define DHTPIN 14
#define LIGHT_SENSOR_PIN A0  
#define LED1_PIN D1
#define LED2_PIN D2
#define DHTTYPE DHT11 
#define MQTT_USERNAME "minh"
#define MQTT_PASSWORD "test"

// Khai bao bien
DHT dht(DHTPIN, DHTTYPE);
float temp;
float hum;
int light;  

AsyncMqttClient mqttClient;
Ticker mqttReconnectTimer;

WiFiEventHandler wifiConnectHandler;
WiFiEventHandler wifiDisconnectHandler;
Ticker wifiReconnectTimer;

unsigned long previousMillis = 0;  // Stores last time temperature was published
const long interval = 10000;       // Interval at which to publish sensor readings

void connectToWifi() {
  Serial.println("Connecting to Wi-Fi...");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
}

void onWifiConnect(const WiFiEventStationModeGotIP& event) {
  Serial.println("Connected to Wi-Fi.");
  connectToMqtt();
}

void onWifiDisconnect(const WiFiEventStationModeDisconnected& event) {
  Serial.println("Disconnected from Wi-Fi.");
  mqttReconnectTimer.detach();  // ensure we don't reconnect to MQTT while reconnecting to Wi-Fi
  wifiReconnectTimer.once(2, connectToWifi);
}

void connectToMqtt() {
  Serial.println("Connecting to MQTT...");
  mqttClient.connect();
}

void onMqttConnect(bool sessionPresent) {
  Serial.println("Connected to MQTT.");
  mqttClient.subscribe("controldevice", 1);  // subscribe to "controldevice"
}

void onMqttDisconnect(AsyncMqttClientDisconnectReason reason) {
  Serial.println("Disconnected from MQTT.");

  if (WiFi.isConnected()) {
    mqttReconnectTimer.once(2, connectToMqtt);
  }
}

// Callback function for handling MQTT messages
void onMessage(char* topic, char* payload, AsyncMqttClientMessageProperties properties, size_t length, size_t index, size_t total) {
  Serial.printf("Message arrived [%s]\n", topic);

  // Parse JSON payload
  DynamicJsonDocument doc(1024);
  deserializeJson(doc, payload);

  // Control LEDs based on JSON data
  digitalWrite(LED1_PIN, (doc["device"] == "LED1" && doc["status"] == "On") ? HIGH : LOW);
  digitalWrite(LED2_PIN, (doc["device"] == "LED2" && doc["status"] == "On") ? HIGH : LOW);
}


void setup() {
  Serial.begin(115200);
  Serial.println();

  dht.begin();

  pinMode(LED1_PIN, OUTPUT);
  pinMode(LED2_PIN, OUTPUT);

  wifiConnectHandler = WiFi.onStationModeGotIP(onWifiConnect);
  wifiDisconnectHandler = WiFi.onStationModeDisconnected(onWifiDisconnect);

  mqttClient.onConnect(onMqttConnect);
  mqttClient.onDisconnect(onMqttDisconnect);
  mqttClient.onMessage(onMessage);  // Register callback to handle messages

  mqttClient.setServer(MQTT_HOST, MQTT_PORT);
  mqttClient.setCredentials(MQTT_USERNAME, MQTT_PASSWORD);

  connectToWifi();
}

void loop() {
  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;
    
    hum = dht.readHumidity();
    temp = dht.readTemperature();
    light = analogRead(LIGHT_SENSOR_PIN);  

    // Round temperature and humidity to 1 decimal place
    float roundedTemp = round(temp * 10) / 10.0;
    float roundedHum = round(hum * 10) / 10.0;

    // Create JSON object
    DynamicJsonDocument doc(1024);
    doc["temperature"] = roundedTemp;
    doc["humidity"] = roundedHum;
    doc["light"] = light;

    // Serialize JSON to string
    String jsonString;
    serializeJson(doc, jsonString);

    // Publish sensor data
    mqttClient.publish(MQTT_PUB_SENSOR, 1, true, jsonString.c_str());
    Serial.println("Message published:");
    Serial.print("Topic: ");
    Serial.println(MQTT_PUB_SENSOR);
    Serial.print("Message: ");
    Serial.println(jsonString.c_str());
  }
}
