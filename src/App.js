import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";

import { AddUser } from "./components/users/AddUser";
import { EditUser } from "./components/users/EditUser";
import React from "react";
// import { usersSlice } from "./admins/usersSlice";
import { UserList } from "./components/users/ListUsers";
import "./App.css";
import { LoginForm } from "./components/Login";
import Dashboard from "./components/users/DashBoard";
import { PrivateRoute } from "./helper/PrivateRoute";
export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route  component={LoginForm} path="/login" />
          <PrivateRoute>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route path="/edit-user">
              <EditUser />
            </Route>

            {/* <Route  component={UserList} /> */}

            <Route path="/add-user" component={AddUser} />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}
