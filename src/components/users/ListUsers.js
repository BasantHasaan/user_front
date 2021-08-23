import { deleteUserAsync, getUsersAsync } from "../../redux/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import React from 'react';
import { Link } from "react-router-dom";

export function UserList() {

  const dispatch = useDispatch();
  const {users} = useSelector((state) => state.users);
  const loading = useSelector((state) => state.loading);
  console.log(users,";;;")
  React.useEffect(() => {
    dispatch(getUsersAsync());
  }, [dispatch]);
  const handleDelete = (id) => {
    dispatch(deleteUserAsync(id));
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Users</h1>
      </div>
      <div className="row">
        <div className="two columns"></div>
        <div className="two columns">
          <Link to="/add-user">
            <button className="button-primary">Add user</button>
          </Link>
        </div>
      </div>
      <div className="row">
        {loading ? (
          "Loading..."
        ) : (
          <table className="u-full-width">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length &&
                users.map(({ _id, email, fullName, isActive }, i) => (
                  <tr key={i}>
                    <td>{i}</td>
                    <td>{fullName}</td>
                    <td>{email}</td>
                    <td>{isActive ? "active" : "notActive"}</td>
                    <td>
                      <button onClick={() => handleDelete(_id)}>Delete</button>
                      <Link to={`/edit-user/${_id}`}>
                        <button>Edit</button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
