import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Logo from "./Logo";
import Navbar from "./Home/Navbar";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { withStyles } from "@material-ui/core/styles";
import HomeIcon from '@material-ui/icons/Home';
const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

const UserNavbar = ({ onMobileNavOpen, ...rest }) => {
  const [notifications] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("my-token");
  const handleLogout = () => {
    localStorage.removeItem("my-token");
    localStorage.removeItem("user-data");
    navigate("/", { push: true });
  };
  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden lgDown>
        <IconButton
            aria-label="home"
            color="inherit"
            onClick={() => navigate("/")}
          >
            <StyledBadge color="secondary">
              <HomeIcon />
            </StyledBadge>
          </IconButton>
          <IconButton
            aria-label="cart"
            color="inherit"
            onClick={() => navigate("/cart")}
          >
            <StyledBadge color="secondary">
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
          {token ? (
            <IconButton color="inherit" onClick={() => handleLogout()}>
              <InputIcon />
            </IconButton>
          ) : (
            <IconButton color="inherit" onClick={() => navigate("/login")}>
              <VpnKeyIcon />
            </IconButton>
          )}
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

UserNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func,
};

export default UserNavbar;
