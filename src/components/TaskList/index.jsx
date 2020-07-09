import React from "react";
import PropTypes from "prop-types";
import { useStyles } from "./styles";
import TaskItem from "./../TaskItem";
import { Grid, Box } from "@material-ui/core";

function TaskList(props) {
  const classes = useStyles();

  const { status, tasks } = props;

  return (
    <Grid item md={4}>
      <Box mt={1} mb={1}>
        <div className={classes.status}>{status.label}</div>
      </Box>
      <div className={classes.wrapperTask}>
        {tasks.map((task) => {
          return (
            <TaskItem key={"task" + task._id} task={task} status={status} />
          );
        })}
      </div>
    </Grid>
  );
}

TaskList.propTypes = {};

export default TaskList;
