import tinycolor from 'tinycolor2';

const getColorLight = (lightIntensity) => {
    let color = "#D32F2F"; // Màu mặc định cho ánh sáng rất mạnh > 900
    let backgroundColor = tinycolor(color).lighten(20).toString(); // Màu nền mặc định

    if (lightIntensity <= 100) {
        color = "#64B5F6"; // Màu xanh dương nhạt cho ánh sáng rất thấp
        backgroundColor = tinycolor(color).lighten(15).toString();
    } else if (lightIntensity <= 200) {
        color = "#1976D2"; // Màu xanh dương đậm cho ánh sáng thấp
        backgroundColor = tinycolor(color).lighten(25).toString();
    } else if (lightIntensity <= 300) {
        color = "#81C784"; // Màu xanh lá nhạt cho ánh sáng trung bình thấp
        backgroundColor = tinycolor(color).lighten(15).toString();
    } else if (lightIntensity <= 400) {
        color = "#388E3C"; // Màu xanh lá đậm cho ánh sáng trung bình
        backgroundColor = tinycolor(color).lighten(20).toString();
    } else if (lightIntensity <= 500) {
        color = "#FFF176"; // Màu vàng nhạt cho ánh sáng trung bình cao
        backgroundColor = tinycolor(color).lighten(15).toString();
    } else if (lightIntensity <= 600) {
        color = "#FBC02D"; // Màu vàng đậm cho ánh sáng cao
        backgroundColor = tinycolor(color).lighten(25).toString();
    } else if (lightIntensity <= 700) {
        color = "#FFB74D"; // Màu cam nhạt cho ánh sáng rất cao
        backgroundColor = tinycolor(color).lighten(15).toString();
    } else if (lightIntensity <= 800) {
        color = "#FB8C00"; // Màu cam đậm cho ánh sáng cực cao
        backgroundColor = tinycolor(color).lighten(20).toString();
    } else if (lightIntensity <= 900) {
        color = "#E57373"; // Màu đỏ nhạt cho ánh sáng cực kỳ cao
        backgroundColor = tinycolor(color).lighten(15).toString();
    } else {
        color = "#D32F2F"; // Màu đỏ đậm cho ánh sáng quá cao
        backgroundColor = tinycolor(color).lighten(20).toString();
    }

    return { color, backgroundColor };
}

export default getColorLight;
