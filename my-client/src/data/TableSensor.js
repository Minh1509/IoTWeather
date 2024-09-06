import React from "react";
import MUIDataTable from "mui-datatables";
import usedataSenSor from "../assets/API/DataSenSor";
import { formatter } from "../routes/formatter";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const columns = [
  {
    name: "id",
    label: "Id",
    options: {
      filter: true,
      sort: true,
      filterType: "dropdown",
    },
  },
  {
    name: "temperature",
    label: "Temperature",
    options: {
      filter: true,
      sort: true,
      filterType: "dropdown",
      customBodyRender: (value) => (
        <p className="capitalize px-3 py-1" style={{ color: "#d32f2f" }}>
          {value}
        </p>
      ),
    },
  },
  {
    name: "humidity",
    label: "Humidity",
    options: {
      filter: true,
      sort: true,
      filterType: "dropdown",
      customBodyRender: (value) => (
        <p className="capitalize px-3 py-1" style={{ color: "#388e3c" }}>
          {value}
        </p>
      ),
    },
  },
  {
    name: "light",
    label: "Light",
    options: {
      filter: true,
      sort: true,
      filterType: "dropdown",
      customBodyRender: (value) => (
        <p className="capitalize px-3 py-1" style={{ color: "#fbc02d", fontWeight: "500" }}>
          {value}
        </p>
      ),
    },
  },
  {
    name: "time",
    label: "Time",
    options: {
      filter: true,
      sort: true,
      filterType: "dropdown",
      customBodyRender: (value) => (
        <p className="capitalize px-3 py-1" style={{ color: "#1976d2" }}>
          {formatter(value)}
        </p>
      ),
    },
  },
];

const options = {
  filterType: "dropdown",
  selectableRows: "none",
  rowPerPage: 5,
  rowsPerPageOptions: [5, 10, 20, 50],
  download: false,
  print: false,
  viewColumns: false,
  search: true,
  filter: true,
};

const getMuiTheme = () =>
  createTheme({
    typography: {
      fontFamily: "Poppins",
      fontSize: '24px'
    },
    palette: {
      background: {
        paper: "#f6f6f9",
        default: "#eee",
      },
    },
    components: {
      MuiTableCell: {
        styleOverrides: {
          head: {
            padding: "10px 5px",
          },
          body: {
            padding: "13px 25px",
          },
        },
      },
      // MuiIconButton: {
      //   styleOverrides: {
      //     root: {
      //       fontSize: '1.5rem', // Tăng kích thước nút tìm kiếm
      //     },
      //   },
      // },
      MuiInputBase: {
        styleOverrides: {
          root: {
            fontSize: '1.2rem', // Tăng kích thước input tìm kiếm
          },
        },
      },
      // MuiFormControl: {
      //   styleOverrides: {
      //     root: {
      //       fontSize: '1.5rem', // Tăng kích thước bộ lọc
      //     },
      //   },
      // },
    },
  });

export default function Table() {
  const dataSenSor = usedataSenSor();

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        data={dataSenSor.data}
        columns={columns}
        options={options}
      />
    </ThemeProvider>
  );
}