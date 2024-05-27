import React from "react";
import "./App.css";
import LoginForm from "./login-form/Login-form";
import HomePage from "./home-page/Home-page";
import LoansPage from "./loans/Loans-page";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import ApiProvider from "./api/ApiProvide";
import AdminConsole from "./admin-console/Admin-page";

function App() {
  return (
    <BrowserRouter>
      <ApiProvider>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/loans" element={<LoansPage />} />
          <Route path="/admin/*" element={<AdminConsole />} />
        </Routes>
      </ApiProvider>
    </BrowserRouter>
  );
}

export default App;
