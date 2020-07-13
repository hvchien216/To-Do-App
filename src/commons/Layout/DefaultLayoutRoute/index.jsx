import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { useStyles } from "./styles";

function DefaultLayoutRoute(props) {
  const classes = useStyles();
  const { component: Component, ...remainProps } = props;
  return (
    <Route
      {...remainProps}
      render={(routeProps) => {
        return <Component {...routeProps} />;
      }}
    ></Route>
  );
}

DefaultLayoutRoute.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayoutRoute);
