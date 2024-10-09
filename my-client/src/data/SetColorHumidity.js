
const getColorHumidity = (humidity) => {
    let color = "#0066FF"; // Màu mặc định cho độ ẩm > 90%

    if (humidity <= 10) {
        color = "#e3f2fd "; // Màu vàng nhạt cho độ ẩm thấp
    } else if (humidity <= 30) {
        color = "#bbdefb"; // Màu vàng cho độ ẩm trung bình
    } else if (humidity <= 50) {
        color = "#90caf9"; // Màu xanh lá mạ cho độ ẩm trung bình cao
    } else if (humidity <= 70) {
        color = "#64b5f6"; // Màu xanh lá đậm cho độ ẩm cao
    } else if (humidity <= 80) {
        color = "#42a5f5"; // Màu xanh lục cho độ ẩm rất cao
    } else if (humidity <= 90) {
        color = "#2196f3"; // Màu xanh dương nhạt cho độ ẩm cực cao
    } else {
        color = "#0066FF"; // Màu xanh dương đậm cho độ ẩm trên 90%
    }

    return { color };
}

export default getColorHumidity;
