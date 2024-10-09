# Web IoTWeather

## Giới thiệu
Dự án này là một hệ thống IoT cho phép giám sát nhiệt độ, độ ẩm, ánh sáng,... và điều khiển các thiết bị như quạt, bóng đèn, điều hòa,.. thông qua giao thức MQTT.

Hệ thống bao gồm:
- **Arduino**: Điều khiển phần cứng như cảm biến và các thiết bị thông qua MQTT.
- **FrontEnd**: Sử dụng ReactJs để hiển thị dữ liệu real-time và điều khiển các thiết bị.
- **Backend**: Sử dụng NodeJS và ExpressJS để xử lý dữ liệu từ Arduino gửi đến và thực hiện các yêu cầu từ phía Frontend.
- **Database**: Sử dụng MySQL để lưu trữ dữ liệu.
- **MQTT**: Sử dụng để pub/sub dữ liệu giữa các thiết bị và hệ thống.

## Hướng dẫn cài đặt và chạy dự án

### Cài đặt các package

#### Frontend (ReactJS)
1. Mở Command Prompt.
2. Di chuyển vào thư mục client: `cd my-client`.
3. Cài đặt dependencies: `npm install`.

#### Backend (NodeJS)
1. Mở Command Prompt.
2. Di chuyển vào thư mục server: `cd my-server`.
3. Cài đặt dependencies: `npm install`.

### Chạy dự án

#### Backend (NodeJS)
1. Mở Command Prompt.
2. Di chuyển vào thư mục server: `cd my-server`.
3. Khởi động Server: `npm run dev`.
   
   ![Giao diện Server](./images/start_server.jpg "Giao diện Server")

#### Frontend (ReactJS)
1. Mở Command Prompt.
2. Di chuyển vào thư mục client: `cd my-client`.
3. Khởi động ứng dụng: `npm start`.

### Giao diện Web

- **Dashboard**
  ![Giao diện Dashboard](./images/dashboard.jpg "Giao diện Dashboard")

- **Data Sensor**
  ![Giao diện Data Sensor](./images/datasensor.jpg "Giao diện Data Sensor")

- **Action History**
  ![Giao diện Action History](./images/history.jpg "Giao diện Action History")

- **Profile**
  ![Giao diện Profile](./images/profile.jpg "Giao diện Profile")
