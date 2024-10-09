import React, { useState} from "react";
import { CiSearch } from "react-icons/ci";
import { FaSortUp, FaSortDown } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom"; 
import axios from 'axios'

const HistoryTable = (props) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate(); 

  // useEffect(() => {
  //   // Lấy dữ liệu ban đầu từ props
  //   setData(props.data);
  // }, [props.data]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    setCurrentPage(1);
    navigate(`?keySearch=${searchTerm}`);
    try {
        const response = await axios.get(
            `http://localhost:8000/api/searchHistory`,{params: { keySearch: searchTerm },}
        );
        setData(response.data.data);
    } catch (error) {
        console.error(error);
    }
};

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  

  const filteredData = data
    .filter((item) => item.time?.toString().includes(searchTerm))
    .sort((a, b) => {
      if (sortConfig.key) {
        if (sortConfig.direction === "asc") {
          return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
        } else {
          return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
        }
      }
      return 0;
    });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        return <FaSortUp className="sort-icon" />;
      } else {
        return <FaSortDown className="sort-icon" />;
      }
    }
    return null;
  };

  return (
    <>
      <div className="main-header-bottom">
        <form onSubmit={handleSearchSubmit}>
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

        <div className="datatype">
          <select
            value="time"
            onChange={() => {}}
            style={{ width: "110px" }}
            disabled
          >
            <option value="time">Time</option>
          </select>
        </div>
      </div>
      <div className="content-table">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("id")}>
                ID {getSortIcon("id")}
              </th>
              <th onClick={() => handleSort("device")}>
                Devices {getSortIcon("device")}
              </th>
              <th onClick={() => handleSort("status")}>
                Status {getSortIcon("status")}
              </th>
              <th onClick={() => handleSort("time")}>
                Time {getSortIcon("time")}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td style={{ color: "#d32f2f" }}>{item.device}</td>
                <td>
                  <button
                    className={`status-btn ${
                      item.status === "On" ? "status-on" : "status-off"
                    } `}
                  >
                    {item.status}
                  </button>
                </td>
                <td style={{ color: "#1976d2" }}>{item.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <div className="rows-per-page">
          <label htmlFor="itemsPerPage">Rows per page: </label>
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
        <div className="page-controls">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={currentPage === 1 ? "disable" : ""}
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={
              currentPage === totalPages || totalPages === 1 || totalPages === 0
                ? "disable"
                : ""
            }
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default HistoryTable;