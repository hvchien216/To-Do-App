import { Button, Grid, Box } from "@material-ui/core";
//icon
import { AddCircle } from "@material-ui/icons";
import PropTypes from "prop-types";
import qs from "query-string";
import React, { useEffect, useRef } from "react";
//redux
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import SearchBox from "../../components/SearchBox";
import TaskForm from "../../components/TaskForm";
import TaskList from "../../components/TaskList";
import { STATUSES } from "./../../contants";
import {
  changeModalContent,
  changeModalTitle,
  hideModal,
  showModal,
} from "./../../redux/actions/modal";
import {
  fetchListTask,
  fetchListTaskRequest,
  filterTask,
  setTaskEditing,
  deleteTask,
} from "./../../redux/actions/task";
import { useStyles } from "./styles";
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
  let location = useLocation();
  const selectRef = useRef(null);
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

  const handleClose = () => {
    // setOpen(false);
  };

  const openForm = () => {
    props.setTaskEditing(null);
    props.showModal();
    props.changeModalTitle("Thêm mới công việc");
    props.changeModalContent(<TaskForm />);
  };

  // const renderForm = () => {
  //   let xhtml = null;

  //   xhtml = <TaskForm handleClose={handleClose} />;

  //   return xhtml;
  // };

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
        {/* {renderForm()} */}
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
