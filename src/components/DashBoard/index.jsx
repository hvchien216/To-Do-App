import cn from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { hideSideBar, showSideBar } from "../../redux/actions/ui";
import { logoutUser } from "../../redux/actions/user";
import Header from "./Header";
import SideBar from "./SideBar";
import { useStyles } from "./styles";
function DashBoard(props) {
  const classes = useStyles();
  const { children, name, visibleSideBar } = props;

  const handleToggleSideBar = (value) => {
    if (value) {
      props.showSideBar();
    } else {
      props.hideSideBar();
    }
  };
  if (!props.authenticated) {
    return <Redirect to="/login" />;
  }
  return (
    <div className={classes.dashboard}>
      <Header
        name={name}
        showSideBar={visibleSideBar}
        handleToggleSideBar={handleToggleSideBar}
        handleLogoutUser={props.logoutUser}
      />
      <div className={classes.wrapper}>
        <SideBar
          showSideBar={visibleSideBar}
          onToggleSideBar={handleToggleSideBar}
        />
        <div
          className={cn(classes.wrapperContent, {
            [classes.shiftLeft]: !visibleSideBar,
          })}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

DashBoard.propTypes = {
  visibleSideBar: PropTypes.bool,
  showSideBar: PropTypes.func,
  hideSideBar: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    // open: state.modal.showModal,
    // title: state.modal.title,
    visibleSideBar: state.ui.showSideBar,
    authenticated: state.user.authenticated,
  };
};
const mapDispatchToProps = {
  showSideBar,
  hideSideBar,
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
