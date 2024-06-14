import { AppBar, Toolbar, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { Link } from "react-router-dom";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import "./AppBarUser.css";
import Flag from "@mui/icons-material/FlagRounded";
import MenuBookRounded from "@mui/icons-material/MenuBookRounded";

const AppBarUser = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };
  return (
    <AppBar position="static" className="AppBar">
      <Toolbar className="ToolBar">
        <Typography
          variant="h6"
          component="div"
          style={{ marginRight: "20px" }}
        >
          <MenuBookRounded />
          {t("library")}
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
        <Button color="inherit" component={Link} to="/home">
          {" "}
          {t("books")}
        </Button>
        <Button color="inherit" component={Link} to="/loans">
          {" "}
          {t("your-books")}
        </Button>
        <Button color="inherit" component={Link} to="/admin">
          {" "}
          {t("admin-console")}
        </Button>
        <Button
          color="inherit"
          endIcon={<LogoutRoundedIcon />}
          component={Link}
          to="/login"
        >
          {t("logout")}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarUser;
