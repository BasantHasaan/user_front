import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authSlice, clearState } from "../../redux/authSlice";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import { UserList } from "./ListUsers";

const Dashboard = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isFetching, isError, isAdmin } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      dispatch(clearState());
      history.push("/login");
    }
  }, [isError]);

    useEffect(() => {
      if (!isAdmin) {
        history.push("/login");
      }
    }, []);

  const onLogOut = () => {
    dispatch(clearState());
    localStorage.removeItem("token");
    history.push("/login");
  };
    return (
      <div className="container mx-auto">
        {isFetching ? (
          <Loader type="Puff" color="#00BFFF" height={100} width={100} />
        ) : (
          <Fragment>
            <button onClick={onLogOut} className="button-primary">
              Log Out
            </button>
            <UserList />
          </Fragment>
        )}
      </div>
    );
  
};

export default Dashboard;
