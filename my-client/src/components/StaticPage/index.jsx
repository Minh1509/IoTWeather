import { useContext, useState } from "react";
import { AppContext } from "../../data/AppContext";
import { Link } from "react-router-dom";
import { ROUTER } from "../../routes/router";
import data from "../../data/DataStatic";
import { CiSearch } from "react-icons/ci";
import "./style.scss";

const StaticPage = () => {
  const { setCurrentPage } = useContext(AppContext);
  const [dataPage, setDataPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Tạo state cho itemsPerPage
  const [searchTerm, setSearchTerm] = useState(""); // Tạo state cho giá trị search
  const [filterSort, setFilterSort] = useState('none');
  // xử lý tìm kiếm

  const filterData = data
    .filter((item) => {
      return (
        item.id.toString().includes(searchTerm) ||
        item.tem.toString().includes(searchTerm) ||
        item.hum.toString().includes(searchTerm) ||
        item.light.toString().includes(searchTerm) ||
        item.time.toString().includes(searchTerm)
      );
    })
    .sort((a, b) => {
      if (filterSort === 'increase') {
        return new Date(a.time) - new Date(b.time);
      } else if( filterSort === 'decrease') {
        return new Date(b.time) - new Date(a.time);
      }
      else return 0;
    });

  // Xử lý phân trang và search
  const totalPages = Math.ceil(filterData.length / itemsPerPage);
  const currentData = filterData.slice(
    (dataPage - 1) * itemsPerPage,
    dataPage * itemsPerPage
  );


  // Xử lý thay đổi giá trị search
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setDataPage(1);
  };

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
  const handleSortChange = (event) => {
    setFilterSort(event.target.value);
  };
  return (
    <>
      {/* Static-header */}
      <div className="main-header">
        <div className="main-header-left">
          <h1>Data Sensor</h1>
          <ul className="breadcrumb">
            <li>
              <Link to={ROUTER.USER.HOME} onClick={() => setCurrentPage("/")}>
                Dashboard
              </Link>
            </li>
            /
            <li>
              <Link
                to={ROUTER.USER.HISTORY}
                onClick={() => setCurrentPage("/history")}
                className="active"
              >
                History
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
          <div className="function">
            <div className="filter" style={{marginBottom: '10px', marginRight: '10px'}}>
              <label htmlFor="sort">Filter by time: </label>
              <select
                id="sort"
                value = {filterSort}
                onChange={handleSortChange}
              >
                <option value = 'none'>None</option>
                <option value="increase">Increase Time</option>
                <option value="decrease">Decrease Time</option>
              </select>
            </div>
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
      </div>
      {/* End static-header */}

      {/* Static-content */}
      <div class="content-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Temperature</th>
              <th>Humidity</th>
              <th>Light</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, key) => (
              <tr key={key} >
                <td >{item.id}</td>
                <td style={{ color: "#d32f2f" }}>{item.tem}</td>
                <td style={{ color: "#388e3c" }}>{item.hum}</td>
                <td style={{color: '#fbc02d', fontWeight :'450'}}> {item.light}</td>
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
                Trang {index + 1} / {totalPages}
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
export default StaticPage;
