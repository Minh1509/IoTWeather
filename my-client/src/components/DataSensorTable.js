import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaSortUp, FaSortDown } from "react-icons/fa"; 

const DataSensorTable = (props) => {
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
          item.temperature.toString().includes(searchTerm) ||
          item.humidity.toString().includes(searchTerm) ||
          item.light.toString().includes(searchTerm) ||
          item.time.toString().includes(searchTerm)
        );
      } else {
        return item[dataType].toString().includes(searchTerm);
      }
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

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
          <select value={dataType} onChange={handleDataTypeChange}>
            <option value="all">All</option>
            <option value="id">ID</option>
            <option value="temperature">Temperature</option>
            <option value="humidity">Humidity</option>
            <option value="light">Light</option>
            <option value="time">Time</option>
          </select>
        </div>
      </div>
      <div className="content-table">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("id")} >ID {getSortIcon("id")}</th>
              <th onClick={() => handleSort("temperature")}>Temperature {getSortIcon("temperature")}</th>
              <th onClick={() => handleSort("humidity")}>Humidity {getSortIcon("humidity")}</th>
              <th onClick={() => handleSort("light")}>Light {getSortIcon("light")}</th>
              <th onClick={() => handleSort("time")}>Time {getSortIcon("time")}</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td style={{ color: "#d32f2f" }}>{item.temperature}</td>
                <td style={{ color: "#388e3c" }}>{item.humidity}</td>
                <td style={{ color: "#fbc02d", fontWeight: "450" }}>
                  {item.light}
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
              currentPage === totalPages || totalPages === 1 ? "disable" : ""
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

export default DataSensorTable;
