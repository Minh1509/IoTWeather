import tinycolor from 'tinycolor2';

const getColorTemperature = (temperature) => {
    let color = '#8b0000'; // Màu mặc định cho nhiệt độ trên 35
    let backgroundColor = tinycolor(color).lighten(35).toString(); // Màu nền mặc định cho nhiệt độ trước đó

    if (temperature <= 5) {
        color = "#0000ff";
        backgroundColor = tinycolor(color).lighten(35).toString(); // Tạo màu nhạt hơn từ màu gốc
    } else if (temperature <= 10) {
        color = "#87CEEB";
        backgroundColor = tinycolor(color).lighten(35).toString();
    } else if (temperature <= 15) {
        color = "#00ff00";
        backgroundColor = tinycolor(color).lighten(35).toString();
    } else if (temperature <= 20) {
        color = "#ffffe0";
        backgroundColor = tinycolor(color).lighten(35).toString();
    } else if (temperature <= 25) {
        color = "#ffff00";
        backgroundColor = tinycolor(color).lighten(35).toString();
    } else if (temperature <= 30) {
        color = "#ffa400";
        backgroundColor = tinycolor(color).lighten(35).toString();
    } else if (temperature <= 35) {
        color = "#ff4400";
        backgroundColor = tinycolor(color).lighten(35).toString();
    }

    return { color, backgroundColor };
}

export default getColorTemperature;