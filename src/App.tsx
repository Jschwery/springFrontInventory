import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Registration from "./pages/registration/Registration";
import Login from "./pages/login/Login";
import SideNavBar from "./global/SideNavBar";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./global/Topbar";
import Teams from "./pages/employees/Employees";
import Employees from "./pages/employees/Employees";
import "../src/index.css";
import Contacts from "./pages/contacts/Contacts";
import Invoices from "./pages/invoices/Invoices";
import Form from "./pages/form/Form";
import Cal from "./pages/calendar/Cal";

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
                  <Route path="/team" element={<Employees />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/invoices" element={<Invoices />} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/calendar" element={<Cal />} />
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
