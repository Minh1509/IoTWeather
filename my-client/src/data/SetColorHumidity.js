import tinycolor from 'tinycolor2';

const primaryColor = "#1976d2";

const getColorHumidity = (humidity) => {
    let color = primaryColor; // Màu mặc định cho độ ẩm rất cao <= 60
    let backgroundColor = tinycolor(color).lighten(40).toString(); // Màu nền mặc định
    if (humidity <= 30) {
        color = tinycolor(primaryColor).lighten(20).toString(); // Màu nhạt hơn cho độ ẩm thấp
        backgroundColor = tinycolor(color).lighten(25).toString(); // Tạo màu nhạt hơn từ màu gốc
    } else if (humidity <= 60) {
        color =primaryColor; 
        backgroundColor = tinycolor(color).lighten(40).toString();
    } else if (humidity <= 90) {
        color = tinycolor(primaryColor).darken(10).toString(); // Màu đậm hơn cho độ ẩm cao
        backgroundColor = tinycolor(color).lighten(40).toString();
    }

    return { color, backgroundColor };
}

export default getColorHumidity;