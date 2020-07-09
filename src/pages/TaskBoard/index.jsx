import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useStyles } from "./styles";
import { Button, Grid } from "@material-ui/core";
import { toast } from "react-toastify";
//icon
import { AddCircle, Edit } from "@material-ui/icons";
import { STATUSES } from "./../../contants";
import TaskList from "../../components/TaskList";
import SearchBox from "../../components/SearchBox";
import TaskForm from "../../components/TaskForm";
//redux
import { connect } from "react-redux";
import {
  fetchListTaskRequest,
  fetchListTask,
  filterTask,
} from "./../../redux/actions/task";
const data = [
  {
    id: 1,
    title: "Reactjs",
    description: "learn reactjs",
    status: 1,
  },
  {
    id: 2,
    title: "Angular",
    description: "learn Angular",
    status: 0,
  },
  {
    id: 3,
    title: "Nodejs",
    description: "learn Nodejs",
    status: 2,
  },
];

function TaskBoard(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  // const [open, setOpen] = useState(false);

  useEffect(() => {
    // props.fetchListTaskRequest();
    props.fetchListTask();
  }, []);

  const renderBoard = () => {
    const { listTask } = props;
    let xhtml = null;

    xhtml = (
      <Grid container spacing={2}>
        {STATUSES.map((status) => {
          const taskFilter = listTask.filter(
            (item) => item.status === status.value
          );
          return (
            <TaskList key={status.value} tasks={taskFilter} status={status} />
          );
        })}
      </Grid>
    );

    return xhtml;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openForm = () => {
    setOpen(true);
  };

  const renderForm = () => {
    let xhtml = null;

    xhtml = <TaskForm open={open} handleClose={handleClose} />;

    return xhtml;
  };

  const handleChange = (e) => {
    props.filterTask(e.target.value);
  };

  const renderSearchBox = () => {
    let xhtml = null;

    xhtml = <SearchBox handleChange={handleChange} />;

    return xhtml;
  };

  const showToast = () => {
    toast.success("🦄 Wow so easy!");
  };
  return (
    <>
      <div className={classes.taskBoard} id="1">
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          // onClick={this.loadData}
          style={{
            marginRight: 20,
          }}
        >
          Load Data
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={openForm}
        >
          <AddCircle fontSize="small" /> Thêm mới công việc
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={showToast}
        >
          <AddCircle fontSize="small" /> mở toast
        </Button>
        {renderSearchBox()}
        {renderBoard()}
        {renderForm()}
      </div>
    </>
  );
}

TaskBoard.propTypes = {
  listTask: PropTypes.array.isRequired,
  fetchListTaskRequest: PropTypes.func.isRequired,
  fetchListTask: PropTypes.func.isRequired,
  filterTask: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    listTask: state.task.listTask,
  };
};
const mapDispatchToProps = {
  fetchListTaskRequest,
  fetchListTask,
  filterTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskBoard);
