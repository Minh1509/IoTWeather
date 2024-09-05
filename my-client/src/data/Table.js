import React from "react";
import MUIDataTable from "mui-datatables";
import usedataSenSor from "../assets/API/DataSenSor";
import { formatter } from "../routes/formatter";

const columns = [
  {
    name: "id",
    label: "Id",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "temperature",
    label: "Temperature",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "humidity",
    label: "Humidity",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "light",
    label: "Light",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "time",
    label: "Time",
    options: {
      filter: true,
      sort: true,
      customBodyRender:value =>  formatter(value),
    },
  },
];

const options = {
  filterType: "checkbox",
  selectableRows: "none",
  rowPerPage: 5,
  rowsPerPageOptions: [5, 10, 20, 50],
  download: false,
  print: false,
  viewColumns: false
};

export default function Table() {
  const dataSenSor = usedataSenSor();
 
  return (
    <MUIDataTable
      title={"Sensor Data"}
      data={dataSenSor.data}
      columns={columns}
      options={options}
    />
  );
}
