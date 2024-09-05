import { useContext, useState } from "react";
import { AppContext } from "../../data/AppContext";
import { Link } from "react-router-dom";
import { ROUTER } from "../../routes/router";
import data from "../../data/DataHistory";
import { CiSearch } from "react-icons/ci";
import "../StaticPage/style.scss";


const HistoryPage = () => {
  const { setCurrentPage } = useContext(AppContext);
  const [dataPage, setDataPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Tạo state cho itemsPerPage
  const [searchTerm, setSearchTerm] = useState(""); // Tạo state cho giá trị search

  // xử lý tìm kiếm
  const filterData = data.filter((item) => {
    return (
      item.time.toString().includes(searchTerm)
    );
  });

  // Xử lý phân trang và search
  const totalPages = Math.ceil(filterData.length / itemsPerPage);
  const currentData = filterData.slice(
    (dataPage - 1) * itemsPerPage,
    dataPage * itemsPerPage
  );

  // Xử lý thay đổi giá trị search và hiển thị về trang page đầu tiên
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setDataPage(1);
  };

  // Xử lý pagenumber để ko nhận 0 và totalpages
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setDataPage(pageNumber);
    }
  };

  // xử lý thay đổi số lượng hiển thị trên 1 trang
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setDataPage(1); // Cập nhật giá trị itemsPerPage
  };
  return (
    <>
      {/* Static-header */}
      <div className="main-header">
        <div className="main-header-left">
          <h1>History</h1>
          <ul className="breadcrumb">
            <li>
              <Link
                to={ROUTER.USER.HOME}
                className="active"
                onClick={() => setCurrentPage("/")}
              >
                Dashboard
              </Link>
            </li>
            /
            <li>
              <Link
                to={ROUTER.USER.STATICS}
                onClick={() => setCurrentPage("/statics")}
              >
                Data Sensor
              </Link>
            </li>
          </ul>
        </div>
        <div className="main-header-bottom">
          <form action="#">
            <div className="form-input">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button className="search-btn" type="submit">
                <CiSearch />
              </button>
            </div>
          </form>
          <div className="items-per-page">
            <label htmlFor="itemsPerPage">Show more: </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>
      {/* End static-header */}

      {/* Static-content */}
      <div class="content-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Devices</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, key) => (
              <tr key={key} className={item.id % 2 !== 0 ? "odd-row" : ""}>
                <td style={{ color: "#388e3c" , fontWeight: '450' }}>{item.id}</td>
                <td >{item.device}</td>
                <td style={{ color: "#d32f2f" }}>{item.status}</td>
                <td style={{ color: "#1976d2" }}>{item.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* End-content */}
      <div className="pagination">
        <button
          className={dataPage === 1 ? "disable" : ""}
          onClick={() => handlePageChange(dataPage - 1)}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => {
          if (index + 1 === dataPage) {
            return (
              <span
                key={index}
                className="active"
                onClick={() => handlePageChange(index + 1)}
              >
                Page {index + 1} / {totalPages}
              </span>
            );
          }
          return null;
        })}
        <button
          className={
            dataPage === totalPages || filterData.length === 0 ? "disable" : ""
          }
          onClick={() => handlePageChange(dataPage + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
};
export default HistoryPage;
