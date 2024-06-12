import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./ManageUsers.css";
import { useApi } from "../api/ApiProvide";
import { RegisterUserRequestDto } from "../api/register-user-request.dto";
import { Users } from "../api/Users";
import { Card, CardContent, Typography } from "@mui/material";
import { use } from "i18next";

interface UserFormValues {
  userId: number;
  username: string;
  password: string;
  role: string;
  email: string;
}
interface DeleteUserProps {
  deleteUser: (userId: number) => void;
}

function DeleteUser({ deleteUser }: DeleteUserProps) {
  return (
    <Formik
      initialValues={{ userId: 0 }}
      onSubmit={(values, { setSubmitting }) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
          deleteUser(values.userId);
        }
        setSubmitting(false);
      }}
    >
      <Form className="form-selection">
        <div className="form-group">
          <label htmlFor="userId">User ID</label>

          <Field name="userId" type="text" placeholder="User ID" />
          <ErrorMessage
            name="userId"
            component="div"
            className="error-message"
          />
          <div className="button-group">
            <button type="submit">Delete User</button>
          </div>
        </div>
      </Form>
    </Formik>
  );
}

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<UserFormValues[]>([]);
  const apiClient = useApi();

  const addUser = async (values: UserFormValues) => {
    const data: RegisterUserRequestDto = {
      username: values.username,
      password: values.password,
      role: values.role,
      email: values.email,
    };

    const response = await apiClient.registerUser(data);

    if (response === 201) {
      setUsers([...users, values]);
      alert("User is successfully added");
    } else {
      console.error(`User registration failed with status code ${response}`);
      alert("User registration failed");
    }
  };
  const [allUsers, setAllUsers] = useState<Users[]>([]);

  const handleSeeAllUsers = async () => {
    const response = await apiClient.getAllUsers();
    if (response.success) {
      setAllUsers(response.data);
    } else if (response.status === 403) {
      alert("You do not have ADMIN permissions");
    } else {
      alert("Failed to retrieve users");
    }
  };
  const handleDeleteUser = async (userId: number) => {
    const response = await apiClient.deleteUser(userId);
    if (response.success) {
      alert("User is successfully deleted");
    } else {
      alert("User deletion failed");
    }
  };

  return (
    <div className="manage-users">
      <h2>Add User</h2>
      <Formik
        initialValues={{
          userId: 0,
          username: "",
          password: "",
          role: "",
          email: "",
        }}
        validationSchema={Yup.object({
          username: Yup.string().required("Required"),
          password: Yup.string().required("Required"),
          role: Yup.string().required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
        })}
        onSubmit={(values, { resetForm }) => {
          addUser(values);
          resetForm();
        }}
      >
        <Form className="form-section">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Field name="username" type="text" placeholder="Username" />
            <ErrorMessage
              name="username"
              component="div"
              className="error-message"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" placeholder="Password" />
            <ErrorMessage
              name="password"
              component="div"
              className="error-message"
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <Field as="select" name="role">
              <option value="">Select a role</option>
              <option value="ROLE_ADMIN">ROLE_ADMIN</option>
              <option value="ROLE_READER">ROLE_READER</option>
            </Field>
            <ErrorMessage
              name="role"
              component="div"
              className="error-message"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" placeholder="Email" />
            <ErrorMessage
              name="email"
              component="div"
              className="error-message"
            />
          </div>
          <div className="button-group">
            <button type="submit">Add User</button>
          </div>
        </Form>
      </Formik>

      <h2>Delete User</h2>
      <DeleteUser deleteUser={handleDeleteUser} />
      <h2>All Users</h2>
      <div className="button-group">
        <button type="submit" onClick={handleSeeAllUsers}>
          See All Users
        </button>
      </div>
      <div>
        {allUsers.map((user) => (
          <Card key={user.userId}>
            <CardContent>
              <Typography variant="h5">User ID: {user.userId}</Typography>
              <Typography variant="h5">Email: {user.email}</Typography>
              <Typography variant="h5">Username: {user.name}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
