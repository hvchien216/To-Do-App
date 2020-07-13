import {
  Button,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Select,
} from "@material-ui/core";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React, { useReducer } from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import SelectCustom from "../SelectCustom";
import { FIELDS_OF_TASK, STATUSES } from "./../../contants";
import { hideModal } from "./../../redux/actions/modal";
import { addTask, updateTask } from "./../../redux/actions/task";
import InputField from "./../InputField";
import { useStyles } from "./styles";
const TaskForm = (props) => {
  const classes = useStyles();
  const { hideModal, taskEditing } = props;

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is not empty"),

    description: Yup.string().required("Description is not empty"),

    status: Yup.number(),
  });

  const [formValues, setFormValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      title: (taskEditing && taskEditing.title) || "",
      description: (taskEditing && taskEditing.description) || "",
      status: (taskEditing && taskEditing.status) || 0,
    }
  );

  const { title, description, status } = formValues;

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    console.log("value of form==>", name, value);
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
          onChange={handleChangeValue}
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
  // const renderFields = (inputs, onChange) => {
  //   return inputs.map((input) => {
  //     if (input.type === "select") {
  //       if (taskEditing) {
  //         return (
  //           <Grid item md={12} key={"input" + input.name}>
  //             <FastField
  //               name={input.name}
  //               component={SelectCustom}
  //               onChange={onChange}
  //               label={input.label}
  //               options={input.options}
  //             />
  //           </Grid>
  //         );
  //       }
  //       return null;
  //     }

  //     return (
  //       <Grid item md={12} key={"input" + input.name}>
  //         <FastField
  //           name={input.name}
  //           component={InputField}
  //           onChange={onChange}
  //           label={input.label}
  //           autoFocus={input.name === "title"}
  //         />
  //       </Grid>
  //     );
  //   });
  // };

  return (
    // <Formik
    //   initialValues={formValues}
    //   validationSchema={validationSchema}
    //   onSubmit={handleSubmit}
    // >
    //   {(formikProps) => {
    //     console.log("formikProps==>", formikProps);
    //     const { handleChange } = formikProps;
    //     const onChange = (e) => {
    //       handleChangeValue(e);
    //       return handleChange(e);
    //     };

    //     return (
    //       <Form className={classes.form}>
    //         <Grid container spacing={1}>
    //           {renderFields(FIELDS_OF_TASK, onChange)}
    //           <Grid item md={12} className={classes.boxActions}>
    //             <Button color="primary" variant="contained" type="submit">
    //               Lưu lại
    //             </Button>
    //             <Button
    //               style={{ marginLeft: "8px" }}
    //               color="secondary"
    //               variant="outlined"
    //               onClick={hideModal}
    //             >
    //               Hủy bỏ
    //             </Button>
    //           </Grid>
    //         </Grid>
    //       </Form>
    //     );
    //   }}
    // </Formik>
    <form action="" onSubmit={handleSubmit} id="form">
      <Grid container spacing={1}>
        <Grid item md={12}>
          <TextField
            autoFocus={true}
            label="Title"
            fullWidth
            margin="normal"
            name="title"
            onChange={handleChangeValue}
            variant="filled"
            value={title}
          />
        </Grid>
        <Grid item md={12}>
          <TextField
            label="Description"
            name="description"
            onChange={handleChangeValue}
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
