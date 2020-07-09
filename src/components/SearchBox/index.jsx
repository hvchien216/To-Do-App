import React from "react";
import PropTypes from "prop-types";
import { useStyles } from "./styles";
import {
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Fab,
  TextField,
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

function SearchBox(props) {
  const classes = useStyles();
  const { handleChange } = props;

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        className={classes.textField}
        onChange={handleChange}
        margin="normal"
      />
    </form>
  );
}

SearchBox.propTypes = {};

export default SearchBox;
