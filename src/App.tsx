import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import SideNavBar from "./global/SideNavBar";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./global/Topbar";
import Teams from "./pages/Employees";
import Employees from "./pages/Employees";
import "../src/index.css";

// import Teams from "./pages/Teams";
// import Calendar from "./pages/Calendar";
// import Contacts from "./pages/Contacts";
// import Form from "./pages/Form";
// import Invoices from "./pages/Invoices";
// import FAQs from "./pages/Faqs";
// import Charts from "./pages/Charts";
// import Geography from "./pages/Geography";

function App() {
  const mode = useMode();

  return (
    <ColorModeContext.Provider value={mode}>
      <ThemeProvider theme={mode.theme}>
        <CssBaseline />
        <div className="app">
          <Router>
            <div className="layout">
              <SideNavBar className="sidebar" />
              <div className="main-content">
                <Topbar />
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/employees" element={<Employees />} />
                  ...
                </Routes>
              </div>
            </div>
          </Router>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
