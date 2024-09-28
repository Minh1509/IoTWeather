
const getColorTemperature = (temperature) => {
    let color = '#8b0000'; // Màu mặc định cho nhiệt độ trên 35

    if (temperature <= 5) {
        color = "#0000ff";
    } else if (temperature <= 10) {
        color = "#87CEEB";
    } else if (temperature <= 15) {
        color = "#00ff00";
    } else if (temperature <= 20) {
        color = "#add8e6";
    } else if (temperature <= 25) {
        color = "#ffff00";
    } else if (temperature <= 30) {
        color = "#ffa400";
    } else if (temperature <= 35) {
        color = "#ff4400";
    }

    return { color};
}

export default getColorTemperature;