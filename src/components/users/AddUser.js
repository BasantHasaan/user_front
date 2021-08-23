import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import React  from "react";
import { useDispatch } from "react-redux";
import { addUserAsync } from "../../redux/usersSlice";
import { useHistory } from "react-router-dom";


import {
  Button,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";

export const AddUser = () => {
  const [serverState, setServerState] = React.useState();
  const handleServerResponse = (ok, msg) => {
    setServerState({ ok, msg });
  };
  const history = useHistory();
	const [value, setValue] = React.useState("");
  const dispatch = useDispatch();


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
          dispatch(
            addUserAsync(values)
          );
          setSubmitting(false);
          history.push('/')
          resetForm();
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
                  Add New User 
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
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Formik>
  );
};
