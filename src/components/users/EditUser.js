import { useHistory, useLocation } from "react-router-dom";
import { editUserAsync } from "../../redux/usersSlice";
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { Button, Grid, Paper, Typography } from "@material-ui/core";
export function EditUser() {
  const { pathname } = useLocation();
  const userId =pathname.replace("/edit-user/", "");
  const user = useSelector((state) => 
  state.users.users.find((user) => user._id === userId)
 
  );
  const dispatch = useDispatch();
  const history = useHistory();


 

  return (
    <Formik
      initialValues={{ email: user.email, fullName: user.fullName }}
      validationSchema={Yup.object({
        password: Yup.string()
          .min(6, "Must be 6 characters or less")
          .required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        try {
          dispatch(editUserAsync(values));
          setSubmitting(false);
          history.push("/");
          resetForm();
        } catch (error) {
          setSubmitting(false);
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
                      <label htmlFor="fullName">Full_Name </label>
                      <Field name="fullName" type="text" />
                      <ErrorMessage name="fullName" />
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
}
