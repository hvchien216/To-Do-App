import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";
// import { useStyles } from "./styles";

InputField.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  disabled: false,
};

function InputField(props) {
  const { field, form, type, label, disabled, onChange } = props;
  const { name, onChange: onChangeOfField } = field;
  const { errors, touched } = form;
  const isError = errors[name] && touched[name];
  return (
    <>
      <TextField
        {...props}
        variant="outlined"
        margin="normal"
        fullWidth
        id={name}
        name={name}
        {...field}
        error={isError}
        helperText={errors[name]}
        onChange={onChange || onChangeOfField}
        label={label && label}
        type={type}
        disabled={disabled}
      />
    </>
  );
}

InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

export default InputField;
