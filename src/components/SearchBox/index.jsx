import React from "react";
import PropTypes from "prop-types";
import { useStyles } from "./styles";
import { InputBase } from "@material-ui/core";
import { Search } from "@material-ui/icons";

function SearchBox(props) {
  const classes = useStyles();
  const { handleChange } = props;

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <Search />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
        onChange={handleChange}
      />
    </div>
  );
}

SearchBox.propTypes = {};

export default SearchBox;
