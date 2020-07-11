import {
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import React, { useReducer, forwardRef } from "react";
import PropTypes from "prop-types";
import { useStyles } from "./styles";
import { connect } from "react-redux";
import { hideModal } from "./../../redux/actions/modal";
import { addTask, updateTask } from "./../../redux/actions/task";
import { STATUSES } from "./../../contants";
const TaskForm = (props) => {
  const classes = useStyles();
  const { hideModal, taskEditing } = props;
  const [formValues, setFormValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      title: (taskEditing && taskEditing.title) || "",
      description: (taskEditing && taskEditing.description) || "",
      status: (taskEditing && taskEditing.status) || 0,
    }
  );

  const { title, description, status } = formValues;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.hideModal();
    if (taskEditing && taskEditing._id) {
      props.updateTask(taskEditing._id, title, description, status);
    } else {
      props.addTask(title, description);
    }
  };

  const renderStatusSelection = () => {
    let xhtml = null;

    xhtml = (
      <FormControl className={classes.formControl}>
        <InputLabel>Status</InputLabel>
        <Select
          id="status"
          name="status"
          value={status}
          onChange={handleChange}
        >
          {STATUSES.map((item) => (
            <MenuItem key={"option" + item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );

    return xhtml;
  };

  return (
    <form action="" onSubmit={handleSubmit} id="form">
      <Grid container spacing={1}>
        <Grid item md={12}>
          <TextField
            autoFocus={true}
            label="Title"
            fullWidth
            margin="normal"
            name="title"
            onChange={handleChange}
            variant="filled"
            value={title}
          />
        </Grid>
        <Grid item md={12}>
          <TextField
            label="Description"
            name="description"
            onChange={handleChange}
            fullWidth
            multiline
            rowsMax="4"
            margin="normal"
            variant="filled"
            value={description}
          />
        </Grid>
        {taskEditing && renderStatusSelection()}
        <Grid item md={12} className={classes.boxActions}>
          <Button color="primary" variant="contained" type="submit">
            Lưu lại
          </Button>
          <Button
            style={{ marginLeft: "8px" }}
            color="secondary"
            variant="outlined"
            onClick={hideModal}
          >
            Hủy bỏ
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

TaskForm.propTypes = {
  hideModal: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
  taskEditing: PropTypes.object,
  updateTask: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    taskEditing: state.task.taskEditing,
  };
};
const mapDispatchToProps = {
  hideModal,
  addTask,
  updateTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
