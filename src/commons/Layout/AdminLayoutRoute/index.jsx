import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import Dashboard from "./../../../components/DashBoard";
import { useStyles } from "./styles";

function AdminLayoutRoute(props) {
  const classes = useStyles();
  const { component: Component, ...remainProps } = props;
  return (
    <Route
      {...remainProps}
      render={(routeProps) => {
        return (
          <Dashboard {...remainProps}>
            <Component {...routeProps} />
          </Dashboard>
        );
      }}
    ></Route>
  );
}

AdminLayoutRoute.propTypes = {
  // hideModal: PropTypes.func,
  // component: PropTypes.func,
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminLayoutRoute);
