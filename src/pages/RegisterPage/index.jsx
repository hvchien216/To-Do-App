import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
  Grid,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import React, { useState, useReducer } from "react";
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { registerUser } from "../../redux/actions/user";
import { useStyles } from "./styles";
import InputField from "./../../components/InputField";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import { FIELDS_OF_REGISTER } from "./../../contants";
import { Link } from "react-router-dom";
function RegisterPage(props) {
  const classes = useStyles();
  const history = useHistory();
  const [formValues, setFormValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      email: "",
      password: "",
    }
  );

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email invalid").required("Email is not empty"),

    password: Yup.string().required("Password is not empty"),
  });

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setFormValues({ [name]: value });
  };

  const renderFields = (inputs, onChange) => {
    return inputs.map((input) => {
      return (
        <FastField
          key={"input" + input.name}
          name={input.name}
          component={InputField}
          onChange={onChange}
          label={input.label}
          autoComplete="off"
          type={input.type}
          autoFocus={input.name === "name"}
        />
      );
    });
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // e.preventDefault();
    const { email, password, name } = formValues;
    props.registerUser(name, email, password, history, setSubmitting);
  };
  if (props.authenticated) {
    return <Redirect to="/task-board" />;
  }
  return (
    <Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Formik
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => {
            const { handleChange, isSubmitting } = formikProps;
            const onChange = (e) => {
              handleChangeValue(e);
              return handleChange(e);
            };

            return (
              <Form className={classes.form}>
                {renderFields(FIELDS_OF_REGISTER, onChange)}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={isSubmitting}
                >
                  {!isSubmitting ? (
                    "Sign Up"
                  ) : (
                    <CircularProgress color="secondary" />
                  )}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to="/login" variant="body2">
                      {"Back to SignIn"}
                    </Link>
                  </Grid>
                  <Grid item></Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
        {/* <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={props.submitting}
          >
            {!props.submitting ? (
              "Sign Up"
            ) : (
              <CircularProgress color="secondary" />
            )}
          </Button>
        </form> */}
      </div>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    submitting: state.user.loading,
    authenticated: state.user.authenticated,
  };
};
const mapDispatchToProps = {
  registerUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
