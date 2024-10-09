const getColorLight = (lightIntensity) => {
  let color = "#D32F2F"; // Màu mặc định cho ánh sáng rất mạnh > 900

  if (lightIntensity <= 100) {
    color = "#ffeb3b"; // Ánh sáng 100 (vàng đậm hơn)
  } else if (lightIntensity <= 300) {
    color = "#ffc107"; // Ánh sáng 300 (vàng đậm)
  } else if (lightIntensity <= 500) {
    color = "#ffec40"; // Ánh sáng 500 (vàng đậm)
  } else if (lightIntensity <= 600) {
    color = "#fbc02d"; // Ánh sáng 600 (vàng đậm hơn)
  } else if (lightIntensity <= 700) {
    color = "#f9a825"; // Ánh sáng 700 (vàng cam)
  } else if (lightIntensity <= 900) {
    color = "#f57f20"; // Ánh sáng 900 (cam đậm)
  } else {
    color = "#D32F2F"; // Màu đỏ đậm cho ánh sáng quá cao
  }

  return { color };
};

export default getColorLight;
