import React from "react";
import PropTypes from "prop-types";
import { useStyles } from "./styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
function TaskForm(props) {
  const { open, handleClose } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Thêm mới công việc</DialogTitle>
      <DialogContent>
        <h1>ahhaah</h1>
        {/* <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          autxoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
        /> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

TaskForm.propTypes = {};

export default TaskForm;
