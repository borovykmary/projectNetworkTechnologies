import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import { Link } from "react-router-dom";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import "./AppBarUser.css";

const AppBarUser = () => {
  const { t, i18n } = useTranslation();
  return (
    <AppBar position="static" className="AppBar">
      <Toolbar className="ToolBar">
        <Typography
          variant="h6"
          component="div"
          style={{ marginRight: "20px" }}
        >
          <MenuBookRoundedIcon /> {t("library")}
        </Typography>
        <Button color="inherit" component={Link} to="/home">
          {" "}
          {t("books")}
        </Button>
        <Button color="inherit" component={Link} to="/loans">
          {" "}
          Your Books
        </Button>
        <Button color="inherit" component={Link} to="/admin">
          {" "}
          Admin Console
        </Button>
        <Button
          color="inherit"
          endIcon={<LogoutRoundedIcon />}
          component={Link}
          to="/login"
        >
          Log out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarUser;
