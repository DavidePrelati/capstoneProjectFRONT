import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterUser from "./components/RegisterUser";
import MainPage from "./components/MainPage";
import Squad from "./components/Squad";
import Shirt from "./components/Shirt";
import ShirtDetail from "./components/ShirtDetails";
import MyNavbar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/nation/:nationName" element={<Squad />} />
        <Route path="/squad/:squadName" element={<Shirt />} />
        <Route path="/shirt/:shirtName" element={<ShirtDetail />} />
        <Route path="/register" element={<RegisterUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
