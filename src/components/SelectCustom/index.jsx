import React from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@material-ui/core";
import { useStyles } from "./styles";

SelectCustom.defaultProps = {
  label: "",
  placeholder: "",
  disabled: false,
  options: [],
};

function SelectCustom(props) {
  const classes = useStyles();

  const { field, form, label, onChange, options } = props;
  const { name, onChange: onChangeOfField } = field;
  const { errors, touched } = form;
  const isError = errors[name] && touched[name];

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{label && label}</InputLabel>
      <Select
        {...props}
        id={name}
        name={name}
        {...field}
        onChange={onChange || onChangeOfField}
        native
      >
        {options.map((item) => (
          <option key={"option" + item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </Select>
      <FormHelperText>{isError && errors[name]}</FormHelperText>
    </FormControl>
  );
}

SelectCustom.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

export default SelectCustom;
