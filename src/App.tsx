import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CardContainer from "./components/cardContainer";
import registration from "./images/register.svg";
import Login from "./pages/login";
import Home from "./pages/Home";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/register"
          element={
            <div className="bg-slate-700 min-h-screen flex justify-center items-center">
              <div
                className="flex h-screen flex-1"
                style={{
                  backgroundImage: `url(${registration})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                }}
              ></div>
              <div className="w-7/12 h-screen flex items-start">
                <CardContainer
                  numberOfRows={4}
                  rowTitles={["Name", "Email", "Password", "Re-enter Password"]}
                  submitButtonText="Submit"
                  containerTitle="Register"
                  additionalText={["Already have an account?", "Log in"]}
                  setLink="/login"
                />
              </div>
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
