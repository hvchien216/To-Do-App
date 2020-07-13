import { Drawer, List, ListItem } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTES } from "./../.././../contants";
import { useStyles } from "./styles";
function SideBar(props) {
  const classes = useStyles();
  const { showSideBar, onToggleSideBar } = props;
  const toggleDrawer = (value) => {
    onToggleSideBar(value);
  };

  const rednerList = () => {
    let xhtml = null;

    xhtml = (
      <List>
        {ADMIN_ROUTES.map((route) => {
          return (
            <NavLink
              to={route.path}
              exact={route.exact}
              key={route.path}
              className={classes.menuLink}
              activeClassName={classes.menuLinkActive}
            >
              <ListItem button key={route.path}>
                {route.name}
              </ListItem>
            </NavLink>
          );
        })}
      </List>
    );

    return xhtml;
  };

  return (
    <Drawer
      // anchor={anchor}
      variant="persistent"
      open={showSideBar}
      onClose={() => toggleDrawer(false)}
      classes={{ paper: classes.drawerPaper }}
    >
      {rednerList()}
    </Drawer>
  );
}

SideBar.propTypes = {
  // hideModal: PropTypes.func.isRequired,
  // component: PropTypes.object,
  // open: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    // open: state.modal.showModal,
    // title: state.modal.title,
    // component: state.modal.component,
  };
};
const mapDispatchToProps = {
  // hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
