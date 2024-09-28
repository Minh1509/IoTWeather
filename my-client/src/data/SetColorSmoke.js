
const getColorSmoke = (smoke) => {
    let color = "#000000"; // Màu mặc định cho mức khói > 90%
   

    if (smoke <= 20) {
        color = "#A8DADC"; // Màu xanh nhạt cho mức khói thấp
    } else if (smoke <= 30) {
        color = "#457B9D"; // Màu xanh trung bình cho mức khói trung bình thấp
    } else if (smoke <= 40) {
        color = "#F4A261"; // Màu xanh đậm cho mức khói trung bình
    } else if (smoke <= 50) {
        color = "#F4A261"; // Màu cam nhạt cho mức khói trung bình cao
    } else if (smoke <= 60) {
        color = "#E76F51"; // Màu cam đậm cho mức khói cao
    } else if (smoke <= 70) {
        color = "#D62828"; // Màu đỏ tươi cho mức khói rất cao
    } else if (smoke <= 80) {
        color = "#9D0208"; // Màu đỏ đậm cho mức khói cực cao
    } else if (smoke <= 90) {
        color = "#6A040F"; // Màu đỏ tối cho mức khói nguy hiểm
    } else {
        color = "#370617"; // Màu đỏ rất tối cho mức khói cực kỳ nguy hiểm
    }

    return { color };
}

export default getColorSmoke;