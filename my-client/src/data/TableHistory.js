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
      filterType : "dropdown",
    },
  },
  {
    name: "temperature",
    label: "Temperature",
    options: {
      filter: true,
      sort: true,
      filterType : "dropdown",
    },
  },
  {
    name: "humidity",
    label: "Humidity",
    options: {
      filter: true,
      sort: true,
      filterType : "dropdown",
    },
  },
  {
    name: "light",
    label: "Light",
    options: {
      filter: true,
      sort: true,
      filterType : "dropdown",
    },
  },
  {
    name: "time",
    label: "Time",
    options: {
      filter: true,
      sort: true,
      filterType : "dropdown",
      customBodyRender:value =>  formatter(value),
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
