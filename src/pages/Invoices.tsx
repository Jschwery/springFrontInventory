import { Box, Typography, useThemeProps, Grid, useTheme } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataInvoices } from "../data/mockdata";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { green } from "@mui/material/colors";

function Invoices() {
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setWindowWidth(window.innerWidth);
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "cost",
      headerName: "Cost ($)",
      width: 100,
      renderCell: (params: any) => {
        return (
          <Typography color={colors.greenAcc[500]}>
            ${params.row.cost}
          </Typography>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
    },
  ];

  // if (windowWidth > 900) {
  //   columns.push({
  //     field: "email",
  //     headerName: "Email",
  //     flex: 1,
  //   });
  // }

  return (
    <Box m="20px">
      <Header title="Invoices" subTitle="Current invoices for review" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAcc[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAcc[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAcc[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAcc[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={mockDataInvoices} columns={columns} />
      </Box>
    </Box>
  );
}

export default Invoices;
