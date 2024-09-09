import tinycolor from 'tinycolor2';

const getColorHumidity = (humidity) => {
    let color = "#0066FF"; // Màu mặc định cho độ ẩm > 90%
    let backgroundColor = tinycolor(color).lighten(40).toString(); // Màu nền mặc định

    if (humidity <= 30) {
        color = "#FFFF00 "; // Màu vàng nhạt cho độ ẩm thấp
        backgroundColor = tinycolor(color).lighten(45).toString(); // Nền sáng hơn
    } else if (humidity <= 50) {
        color = "#FFCC00"; // Màu vàng cho độ ẩm trung bình
        backgroundColor = tinycolor(color).lighten(35).toString();
    } else if (humidity <= 60) {
        color = "#99CC33"; // Màu xanh lá mạ cho độ ẩm trung bình cao
        backgroundColor = tinycolor(color).lighten(30).toString();
    } else if (humidity <= 70) {
        color = "#66CC33"; // Màu xanh lá đậm cho độ ẩm cao
        backgroundColor = tinycolor(color).lighten(25).toString();
    } else if (humidity <= 80) {
        color = "#339966"; // Màu xanh lục cho độ ẩm rất cao
        backgroundColor = tinycolor(color).lighten(20).toString();
    } else if (humidity <= 90) {
        color = "#3399FF"; // Màu xanh dương nhạt cho độ ẩm cực cao
        backgroundColor = tinycolor(color).lighten(30).toString();
    } else {
        color = "#0066FF"; // Màu xanh dương đậm cho độ ẩm trên 90%
        backgroundColor = tinycolor(color).lighten(20).toString(); // Nền tối hơn
    }

    return { color, backgroundColor };
}

export default getColorHumidity;
