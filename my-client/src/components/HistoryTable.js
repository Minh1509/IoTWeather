import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaSortUp, FaSortDown } from "react-icons/fa"; // Thêm các biểu tượng mũi tên

const HistoryTable = (props) => {
  const data = props.data;
  const [searchTerm, setSearchTerm] = useState("");
  const [dataType, setDataType] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleDataTypeChange = (event) => {
    setDataType(event.target.value);
    setCurrentPage(1);
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
    .filter((item) => {
      if (dataType === "all") {
        return (
          item.id.toString().includes(searchTerm) ||
          item.device.toString().toLowerCase().includes(searchTerm) ||
          item.status.toString().toLowerCase().includes(searchTerm) ||
          item.time.toString().includes(searchTerm)
        );
      } else if (dataType === "time") {
        return item.time?.toString().includes(searchTerm);
      }
      return false;
    })
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

        <div className="datatype">
          <select
            value={dataType}
            onChange={handleDataTypeChange}
            style={{ width: "110px" }}
          >
            <option value="all">All</option>
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