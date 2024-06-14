import React, { useEffect } from "react";
import { AppBar, Toolbar, Button, Typography, Grid } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import ManageUsers from "./Manage-Users";
import ManageBooks from "./Manage-Books";
import ManageLoans from "./Manage-Loans";
import "./AdminConsole.css";
import HomePage from "../home-page/Home-page";
import { useTranslation } from "react-i18next";
import Flag from "@mui/icons-material/FlagRounded";
import MenuBookRounded from "@mui/icons-material/MenuBookRounded";

const AdminConsole: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    navigate("/admin/users");
  }, []);

  return (
    <div>
      <AppBar position="static" className="AppBar">
        <Toolbar className="ToolBar">
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {t("admin-console")}
          </Typography>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Button color="inherit" onClick={() => changeLanguage("en")}>
                <Flag /> EN
              </Button>
            </Grid>
            <Grid item>
              <Button color="inherit" onClick={() => changeLanguage("ua")}>
                <Flag /> UA
              </Button>
            </Grid>
          </Grid>
          <Button color="inherit" component={Link} to="/admin/users">
            {t("manage-users")}
          </Button>
          <Button color="inherit" component={Link} to="/admin/books">
            {t("manage-books")}
          </Button>
          <Button color="inherit" component={Link} to="/admin/loans">
            {t("manage-loans")}
          </Button>
          <Button color="inherit" component={Link} to="/home">
            {t("home-page")}
          </Button>
        </Toolbar>
      </AppBar>

      <div className="manage-section">
        <Routes>
          <Route path="users" element={<ManageUsers />} />
          <Route path="books" element={<ManageBooks />} />
          <Route path="loans" element={<ManageLoans />} />
          <Route path="home" element={<HomePage />} />
        </Routes>
      </div>
    </div>
  );
};
export default AdminConsole;
