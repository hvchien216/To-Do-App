import { Modal } from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { hideModal } from "../../../redux/actions/modal";
import { useStyles } from "./styles";

function Content(props) {
  const classes = useStyles();
  const { open, component, hideModal, title } = props;
  return (
    <Modal open={open} onClose={hideModal}>
      <div className={classes.modal}>
        <div className={classes.heading}>
          <h1>{title}</h1>

          <Clear onClick={hideModal} fontSize="large" />
        </div>
        <div className={classes.content}>{component}</div>
      </div>
    </Modal>
  );
}

Content.propTypes = {
  hideModal: PropTypes.func.isRequired,
  component: PropTypes.object,
  open: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    open: state.modal.showModal,
    title: state.modal.title,
    component: state.modal.component,
  };
};
const mapDispatchToProps = {
  hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
