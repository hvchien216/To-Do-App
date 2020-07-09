import React from "react";
import PropTypes from "prop-types";
import loadingIcon from "./../../assets/imgages/loading.gif";
import { useStyles } from "./styles";
import { connect } from "react-redux";
import { showLoading, hideLoading } from "./../../redux/actions/ui";
function GlobalLoading(props) {
  const classes = useStyles();
  const { visibleLoading } = props;

  if (!visibleLoading) return null;

  return (
    <div className={classes.globalLoading}>
      <div className={classes.wrapperIcon}>
        <img src={loadingIcon} alt="" />
      </div>
    </div>
  );
}

GlobalLoading.propTypes = {
  visibleLoading: PropTypes.bool.isRequired,
  showLoading: PropTypes.func.isRequired,
  hideLoading: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => {
  return {
    visibleLoading: state.ui.showLoading,
  };
};
const mapDispatchToProps = {
  showLoading,
  hideLoading,
};
export default connect(mapStateToProps, mapDispatchToProps)(GlobalLoading);
