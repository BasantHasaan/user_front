import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  Grid,
  Paper,
  Typography,
  Link
} from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import { loginUser, clearState } from "../redux/authSlice";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";

export const LoginForm = () => {
  const [serverState, setServerState] = React.useState();
  const handleServerResponse = (ok, msg) => {
    setServerState({ ok, msg });
  };
  const dispatch = useDispatch();
  const history = useHistory();
  // const { register, errors, handleSubmit } = useForm();
  const { isFetching, isSuccess, isError, errorMessage } = useSelector(state=>state.auth
    // userSelector
  );
  // React.useEffect(() => {
  //   return () => {
  //     dispatch(clearState());
  //   };
  // }, []);
  React.useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
      history.push("/login");
      dispatch(clearState());
    }
    if (isSuccess) {
      dispatch(clearState());
      history.push("/");
    }
  }, [isError, isSuccess]);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        password: Yup.string()
          .min(6, "Must be 6 characters or less")
          .required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
      })}
      
      onSubmit={(values, { setSubmitting, resetForm }) => {
        try {
           dispatch(loginUser(values));
          setSubmitting(false);
          resetForm()
        } catch (error) {
          setSubmitting(false);
          handleServerResponse(false, error.response.data.error);
        }
      }}
    >
      <Grid container spacing={0} justifyContent="center" direction="row">
        <Grid item>
          <Grid
            container
            direction="column"
            justifyContent="center"
            spacing={2}
            className="login-form"
          >
            <Paper
              variant="elevation"
              elevation={2}
              className="login-background"
            >
              <Grid item>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
              </Grid>
              <Grid item>
                <Form>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <label htmlFor="email">Email Address</label>
                      <Field name="email" type="email" />
                      <ErrorMessage name="email" />
                    </Grid>
                    <Grid item>
                      <label htmlFor="password">Password </label>
                      <Field name="password" type="password" />
                      <ErrorMessage name="password" />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className="button-block"
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  Forgot Password?
                </Link>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Formik>
  );
};
