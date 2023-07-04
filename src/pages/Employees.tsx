import { Box, Typography, useTheme } from "@mui/material";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowId,
} from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataTeam } from "../data/mockdata";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../components/Header";
import { useEffect, useState } from "react";

function Employees() {
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    if (selectedRows.length > 0) {
      const rows: any = mockDataTeam.filter((row) => {
        return selectedRows.includes(row.id);
      });
      console.log(rows);
    }
  }, [selectedRows]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
  ];

  if (windowWidth > 900) {
    columns.push({
      field: "email",
      headerName: "Email",
      flex: 1,
    });
  }

  if (windowWidth > 1150) {
    columns.push({
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    });
  }

  columns.push({
    field: "access",
    headerName: "Access Level",
    flex: 1,
    renderCell: ({ row: { access } }: GridCellParams) => {
      return (
        <Box
          sx={{
            backgroundColor:
              access === "admin"
                ? colors.greenAcc[600]
                : access === "manager"
                ? colors.greenAcc[700]
                : colors.greenAcc[700],
            width: "60%",
            minWidth: "100px",
            margin: "0 auto",
            padding: "5px",
            display: "flex",
            justifyContent: "center",
            borderRadius: "4px",
          }}
        >
          {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
          {access === "manager" && <SecurityOutlinedIcon />}
          {access === "user" && <LockOpenOutlinedIcon />}
          <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            {access}
          </Typography>
        </Box>
      );
    },
  });

  return (
    <Box m="20px">
      <Header title="TEAM" subTitle="Managing the Team Members" />
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
        <DataGrid
          checkboxSelection
          rows={mockDataTeam}
          columns={columns}
          onRowSelectionModelChange={(newSelection) => {
            setSelectedRows(newSelection);
          }}
        />
      </Box>
    </Box>
  );
}

export default Employees;
