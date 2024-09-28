
const getColorHumidity = (humidity) => {
    let color = "#0066FF"; // Màu mặc định cho độ ẩm > 90%

    if (humidity <= 30) {
        color = "#FFFF00 "; // Màu vàng nhạt cho độ ẩm thấp
    } else if (humidity <= 50) {
        color = "#FFCC00"; // Màu vàng cho độ ẩm trung bình
    } else if (humidity <= 60) {
        color = "#99CC33"; // Màu xanh lá mạ cho độ ẩm trung bình cao
    } else if (humidity <= 70) {
        color = "#66CC33"; // Màu xanh lá đậm cho độ ẩm cao
    } else if (humidity <= 80) {
        color = "#339966"; // Màu xanh lục cho độ ẩm rất cao
    } else if (humidity <= 90) {
        color = "#3399FF"; // Màu xanh dương nhạt cho độ ẩm cực cao
    } else {
        color = "#0066FF"; // Màu xanh dương đậm cho độ ẩm trên 90%
    }

    return { color };
}

export default getColorHumidity;
