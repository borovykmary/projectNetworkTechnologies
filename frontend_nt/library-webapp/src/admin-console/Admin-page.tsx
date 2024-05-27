import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ManageUsers from "./Manage-Users";
import ManageBooks from "./Manage-Books";
import ManageLoans from "./Manage-Loans";
import "./AdminConsole.css";

const AdminConsole: React.FC = () => {
  return (
    <div>
      <AppBar position="static" className="AppBar">
        <Toolbar className="ToolBar">
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            Admin Console
          </Typography>
          <Button color="inherit" component={Link} to="/admin/users">
            Manage Users
          </Button>
          <Button color="inherit" component={Link} to="/admin/books">
            Manage Books
          </Button>
          <Button color="inherit" component={Link} to="/admin/loans">
            Manage Loans
          </Button>
        </Toolbar>
      </AppBar>

      <div className="manage-section">
        <Routes>
          <Route path="users" element={<ManageUsers />} />
          <Route path="books" element={<ManageBooks />} />
          <Route path="loans" element={<ManageLoans />} />
        </Routes>
      </div>
    </div>
  );
};
export default AdminConsole;
