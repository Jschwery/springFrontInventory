import React, { ReactNode } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useState } from "react";
import { Box, Icon, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../theme";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import UsersIcon from "@mui/icons-material/PeopleOutlined";
import BillIcon from "@mui/icons-material/ReceiptOutlined";
import UserProfileIcon from "@mui/icons-material/PersonOutlined";
import CalendarIcon from "@mui/icons-material/CalendarTodayOutlined";
import FaqIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartIcon from "@mui/icons-material/BarChartOutlined";
import PieChartIcon from "@mui/icons-material/PieChartOutlineOutlined";
import LineChartIcon from "@mui/icons-material/TimelineOutlined";
import MenuIcon from "@mui/icons-material/MenuOutlined";
import MapIcon from "@mui/icons-material/MapOutlined";
import ContactIcon from "@mui/icons-material/ContactsOutlined";

interface SidebarLinkProps {
  label: string;
  path: string;
  symbol: ReactNode;
  current: string;
  setCurrent: (label: string) => void;
  fontSize?: number;
}
const activeStyles = {
  transform: "scale(1.1)",
  fontWeight: "bold",
};
const SidebarLink = ({
  label,
  path,
  symbol,
  current,
  setCurrent,
  fontSize,
}: SidebarLinkProps) => {
  const theme = useTheme();
  const colorPalette = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={current === label}
      style={{
        color: colorPalette.grey[100],
        marginLeft: 10,
        ...(current === label ? activeStyles : {}),
      }}
      onClick={() => setCurrent(label)}
      icon={symbol}
    >
      <Typography style={{ fontSize: fontSize || 14 }}>{label}</Typography>
      <Link to={path} />
    </MenuItem>
  );
};

const SideNavBar = ({ className }: { className: string }) => {
  const theme = useTheme();
  const colorPalette = tokens(theme.palette.mode);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [sidebarState, setSidebarState] = useState("uncollapsed");

  const handleSidebarToggle = () => {
    setIsMinimized((currentIsMinimized) => !currentIsMinimized);
    setSidebarState((currentState) =>
      currentState === "collapsed" ? "uncollapsed" : "collapsed"
    );
  };

  return (
    <Box
      component="div"
      className={className}
      sx={{
        transition: "all 0.5s ease",
        width: isMinimized ? theme.spacing(15) : theme.spacing(30), // Replace with your own widths
        "& .pro-sidebar-inner": {
          background: `${colorPalette.primary[400]} !important`,
          height: "100vh",
          overflow: "auto",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar
        style={{ cursor: "default", transition: "all 0.5s ease" }}
        className={sidebarState}
        collapsed={isMinimized}
      >
        <Menu iconShape="square">
          <MenuItem
            icon={
              isMinimized ? (
                <IconButton onClick={handleSidebarToggle}>
                  <MenuIcon style={{ width: "25px", height: "25px" }} />
                </IconButton>
              ) : undefined
            }
            style={{
              margin: "0px 10px 20px 0px",
              color: colorPalette.grey[100],
            }}
          >
            {!isMinimized && (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                position="relative"
                ml="15px"
                mt="10px"
                sx={{ cursor: "default" }}
              >
                <Typography variant="h3" color={colorPalette.grey[100]}>
                  ADMINS
                </Typography>
                <IconButton
                  style={{
                    paddingLeft: "10px",
                    right: -40,
                    position: "absolute",
                  }}
                  onClick={handleSidebarToggle}
                >
                  <MenuIcon style={{ width: "26px", height: "26px" }} />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isMinimized && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-picture"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color={colorPalette.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  User Name Here
                </Typography>
                <Typography variant="h5" color={colorPalette.greenAcc[500]}>
                  User Title
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isMinimized ? undefined : "10%"}>
            <SidebarLink
              label="Home"
              path="/"
              symbol={<HomeIcon style={{ width: "30px", height: "30px" }} />}
              current={activeItem}
              setCurrent={setActiveItem}
              fontSize={16}
            />

            <Typography
              variant="h6"
              color={colorPalette.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <SidebarLink
              label="Team"
              path="/team"
              symbol={<UsersIcon />}
              current={activeItem}
              setCurrent={setActiveItem}
            />
            <SidebarLink
              label="Contacts"
              path="/contacts"
              symbol={<ContactIcon />}
              current={activeItem}
              setCurrent={setActiveItem}
            />
            <SidebarLink
              label="Invoices"
              path="/invoices"
              symbol={<BillIcon />}
              current={activeItem}
              setCurrent={setActiveItem}
            />

            <Typography
              variant="h6"
              color={colorPalette.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            <SidebarLink
              label="Profile Form"
              path="/form"
              symbol={<UserProfileIcon />}
              current={activeItem}
              setCurrent={setActiveItem}
            />
            <SidebarLink
              label="Calendar"
              path="/calendar"
              symbol={<CalendarIcon />}
              current={activeItem}
              setCurrent={setActiveItem}
            />
            <SidebarLink
              label="FAQ Page"
              path="/faq"
              symbol={<FaqIcon />}
              current={activeItem}
              setCurrent={setActiveItem}
            />

            <Typography
              variant="h6"
              color={colorPalette.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <SidebarLink
              label="Bar Chart"
              path="/bar"
              symbol={<BarChartIcon />}
              current={activeItem}
              setCurrent={setActiveItem}
            />
            <SidebarLink
              label="Pie Chart"
              path="/pie"
              symbol={<PieChartIcon />}
              current={activeItem}
              setCurrent={setActiveItem}
            />
            <SidebarLink
              label="Line Chart"
              path="/line"
              symbol={<LineChartIcon />}
              current={activeItem}
              setCurrent={setActiveItem}
            />
            <SidebarLink
              label="Geography Chart"
              path="/geography"
              symbol={<MapIcon />}
              current={activeItem}
              setCurrent={setActiveItem}
            />
            <Box
              sx={{
                bgcolor: colorPalette.primary[400],
                height: "10px",
              }}
            ></Box>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default SideNavBar;
