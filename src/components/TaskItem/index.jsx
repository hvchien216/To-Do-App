import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './styles';
import {
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Fab
} from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

function TaskItem(props) {
  const classes = useStyles();
  const { task: { title, description }, status } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item md={8}>
            <Typography>{title}</Typography>
          </Grid>
          <Grid item md={4}>{status.label}</Grid>
        </Grid>
        <p>{description}</p>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Fab color="primary" aria-label="Add" size='small' className={classes.fab}>
          <Edit fontSize='small' />
        </Fab>
        <Fab color="secondary" aria-label="Add" size='small' className={classes.fab}>
          <Delete fontSize='small' />
        </Fab>
      </CardActions>
    </Card>
  )
}

TaskItem.propTypes = {

}

export default TaskItem

