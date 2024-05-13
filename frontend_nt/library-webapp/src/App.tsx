import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginForm from "./login-form/Login-form";
import HomePage from "./home-page/Home-page";
import LoansPage from "./loans/Loans-page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/loans" element={<LoansPage />} />
      </Routes>
    </Router>
  );
}

export default App;
