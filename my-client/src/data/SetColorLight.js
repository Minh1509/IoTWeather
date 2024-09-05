import tinycolor from 'tinycolor2';

const primaryColor = "#fbc02d"; // Màu chủ đạo

const getColorLight = (light) => {
    let color;
    let backgroundColor;

    if (light <= 100) {
        color = "#ffeb3b"; // Màu vàng nhạt cho ánh sáng rất thấp
        backgroundColor = tinycolor(color).lighten(28).toString();
    } else if (light <= 300) {
        color = tinycolor("#ffc107").lighten(20).toString(); // Màu vàng cho ánh sáng thấp
        backgroundColor = tinycolor(color).lighten(20).toString();
    } else if (light <= 500) {
        color = primaryColor; // Màu cam cho ánh sáng trung bình
        backgroundColor = "#fff2c6";
    } else if (light <= 700) {
        color ="#ff9800"; 
        backgroundColor = tinycolor(color).lighten(40).toString();
    } else {
        color = "#f57c00"; // Màu cam đậm cho ánh sáng rất cao
        backgroundColor = tinycolor(color).lighten(40).toString();
    }

    return { color, backgroundColor };
}

export default getColorLight;