import { Route, Routes, useNavigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState, createContext } from "react";
import axios from "./axiosConfig";

export const AppState = createContext();

const App = () => {
  const [user, setUser] = useState({});

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  async function checkuser() {
    if (!token) {
      console.log("No token found, redirecting to login");
      navigate("/login");
      return;
    }

    try {
      const { data } = await axios.get("/users/checkuser", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setUser(data);
    } catch (error) {
      if (error.response) {
        console.log("Error response:", error.response);
      } else if (error.request) {
        console.log("Error request:", error.request);
      } else {
        console.log("Error message:", error.message);
      }
      navigate("/login");
    }
  }

  // check if user is logged in or no one cannot access the home page
  useEffect(() => {
    checkuser();
  }, []);

  return (
    <AppState.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AppState.Provider>
  );
};

export default App;
