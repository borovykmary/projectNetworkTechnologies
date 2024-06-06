import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import { Link } from "react-router-dom";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
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
        <Button color="inherit">
          <Link to="/home"> {t("books")} </Link>
        </Button>
        <Button color="inherit">
          <Link to="/loans"> Your Books </Link>
        </Button>
        <Button color="inherit">
          <Link to="/admin"> Admin Console </Link>
        </Button>
        <Button color="inherit" endIcon={<LogoutRoundedIcon />}>
          <Link to="/login">Log out</Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarUser;
