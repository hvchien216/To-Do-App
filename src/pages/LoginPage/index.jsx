import {
  Avatar,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import React, { useState, useReducer } from "react";
import { connect } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { loginUser } from "./../../redux/actions/user";
import InputField from "./../../components/InputField";
import { FastField, Form, Formik } from "formik";
import { useStyles } from "./styles";
import * as Yup from "yup";
import { FIELDS_OF_LOGIN } from "./../../contants";

function LoginPage(props) {
  const classes = useStyles();
  const history = useHistory();
  const [formValues, setFormValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
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

  const handleSubmit = (values, { setSubmitting }) => {
    // e.preventDefault();
    const { email, password } = formValues;
    props.loginUser(email, password, history, setSubmitting);
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
          type={input.type}
          autoComplete="off"
          // autoFocus={input.name === "email"}
        />
      );
    });
  };

  if (props.authenticated) {
    return <Redirect to="/task-board" />;
  }
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => {
            const { handleChange, isSubmitting, isValid } = formikProps;
            const onChange = (e) => {
              handleChangeValue(e);
              return handleChange(e);
            };

            return (
              <Form className={classes.form}>
                <Grid container spacing={1}>
                  {renderFields(FIELDS_OF_LOGIN, onChange)}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={isSubmitting}
                  >
                    {!isSubmitting ? (
                      "Sign In"
                    ) : (
                      <CircularProgress color="secondary" />
                    )}
                  </Button>
                  <Grid container>
                    <Grid item xs></Grid>
                    <Grid item>
                      <Link to="/register" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
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
              "Sign In"
            ) : (
              <CircularProgress color="secondary" />
            )}
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
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
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
