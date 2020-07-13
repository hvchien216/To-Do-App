import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  MenuItem,
  Menu,
} from "@material-ui/core";
import { Menu as MenuIcon, More, AccountCircle } from "@material-ui/icons";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import { filterTask } from "../../../redux/actions/task";
import { useStyles } from "./styles";
import SearchBox from "../../SearchBox";
import qs from "query-string";
import { useHistory } from "react-router-dom";

function Header(props) {
  const classes = useStyles();
  let history = useHistory();

  const { name, showSideBar, handleToggleSideBar } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleChange = (e) => {
    let searchParams = qs.stringify({
      q: e.target.value,
    });
    props.filterTask(e.target.value);
    history.push({
      pathname: "/task-board",
      search: searchParams,
    });
  };

  const onToggleSideBar = () => {
    handleToggleSideBar(!showSideBar);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const logoutUser = () => {
    props.handleLogoutUser();
  };
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={logoutUser}>Logout</MenuItem>
    </Menu>
  );

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>{props.userInfo.user.name}</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={onToggleSideBar}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            {name}
          </Typography>
          {name === "Quản lý công việc" && (
            <SearchBox handleChange={handleChange} />
          )}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <span style={{ marginRight: 8 }}>
                  {props.userInfo && props.userInfo.user.name}
                </span>
                <AccountCircle />
              </div>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <More />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

Header.propTypes = {
  // hideModal: PropTypes.func.isRequired,
  // component: PropTypes.object,
  // open: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    listTask: state.task.listTask,
    userInfo: state.user.user,
  };
};
const mapDispatchToProps = {
  filterTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
