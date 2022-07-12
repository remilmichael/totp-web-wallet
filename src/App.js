import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import Dashboard from "./containers/Dashboard/Dashboard";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} /> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
