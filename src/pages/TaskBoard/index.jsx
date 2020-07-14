import { Box, Button, Grid } from "@material-ui/core";
//icon
import { AddCircle } from "@material-ui/icons";
import PropTypes from "prop-types";
import qs from "query-string";
import React, { useEffect } from "react";
//redux
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import TaskForm from "../../components/TaskForm";
import TaskList from "../../components/TaskList";
import { STATUSES } from "../../contants";
import {
  changeModalContent,
  changeModalTitle,
  hideModal,
  showModal,
} from "../../redux/actions/modal";
import {
  deleteTask,
  fetchListTask,
  fetchListTaskRequest,
  filterTask,
  setTaskEditing,
} from "../../redux/actions/task";
import { useStyles } from "./styles";

function TaskBoard(props) {
  const classes = useStyles();
  let location = useLocation();
  useEffect(() => {
    // props.fetchListTaskRequest();
    let q = qs.parse(location.search);
    props.fetchListTask(q.q);
  }, []);

  const handleEdit = (task) => {
    props.setTaskEditing(task);
    props.showModal();
    props.changeModalTitle("Cập nhật công việc");
    props.changeModalContent(<TaskForm />);
  };

  const handleDeleteTask = (task) => {
    props.deleteTask(task._id);
    props.hideModal();
  };

  const handleDelete = (task) => {
    props.showModal();
    props.changeModalTitle("Xóa công việc");
    props.changeModalContent(
      <div className={classes.modalDelete}>
        <div className={classes.modalConfirmText}>
          Bạn chắc chắn muốn xóa{" "}
          <span className={classes.modalConfirmTextBold}>{task.title}</span>?
        </div>
        <Box display="flex" flexDirection="row-reverse" mt={2}>
          <Box ml={1}>
            <Button variant="contained" onClick={props.hideModal}>
              Hủy Bỏ
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleDeleteTask(task)}
            >
              Đồng Ý
            </Button>
          </Box>
        </Box>
      </div>
    );
  };

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
            <TaskList
              key={status.value}
              tasks={taskFilter}
              status={status}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          );
        })}
      </Grid>
    );

    return xhtml;
  };

  const openForm = () => {
    props.setTaskEditing(null);
    props.showModal();
    props.changeModalTitle("Thêm mới công việc");
    props.changeModalContent(<TaskForm />);
  };
  return (
    <>
      <div className={classes.taskBoard}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={openForm}
        >
          <AddCircle fontSize="small" /> Thêm mới công việc
        </Button>
        {renderBoard()}
      </div>
    </>
  );
}

TaskBoard.propTypes = {
  listTask: PropTypes.array.isRequired,
  fetchListTaskRequest: PropTypes.func.isRequired,
  fetchListTask: PropTypes.func.isRequired,
  filterTask: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  changeModalTitle: PropTypes.func.isRequired,
  changeModalContent: PropTypes.func.isRequired,
  setTaskEditing: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
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
  showModal,
  hideModal,
  changeModalTitle,
  changeModalContent,
  setTaskEditing,
  deleteTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskBoard);
