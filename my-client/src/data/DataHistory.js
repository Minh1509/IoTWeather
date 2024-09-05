const generateData = (numRows) => {
    const data = [];
    const devices = ['Quạt', 'Điều hòa', 'Đèn LED', 'Tivi', 'Tủ lạnh', 'Máy giặt'];
    const statuses = ['Bật', 'Tắt'];
  
    for (let i = 1; i <= numRows; i++) {
      const id = i;
      const device = devices[i % devices.length]; 
      const status = statuses[i % statuses.length]; 
      const time = `2024-8-01 ${String(i % 24).padStart(2, '0')}:00:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`; 
  
      data.push({ id, device, status, time });
    }
  
    return data;
  };
  
  const DataHistory = generateData(200);
  
  export default DataHistory;