import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./ManageUsers.css";

interface UserFormValues {
  userId: string;
  username: string;
  password: string;
  role: string;
  email: string;
}
interface DeleteUserProps {
  deleteUser: (userId: string) => void;
}

function DeleteUser({ deleteUser }: DeleteUserProps) {
  return (
    <Formik
      initialValues={{ userId: "" }}
      onSubmit={(values, { setSubmitting }) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
          deleteUser(values.userId);
        }
        setSubmitting(false);
      }}
    >
      <Form>
        <Field name="userId" type="text" placeholder="User ID" />
        <ErrorMessage name="userId" component="div" />
        <button type="submit">Delete User</button>
      </Form>
    </Formik>
  );
}

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<UserFormValues[]>([]);

  const addUser = (values: UserFormValues) => {
    setUsers([...users, values]);
  };

  const deleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.userId !== userId));
  };

  return (
    <div className="manage-users">
      <h2>Add User</h2>
      <Formik
        initialValues={{
          userId: "",
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
        <Form>
          <Field name="username" type="text" placeholder="Username" />
          <ErrorMessage name="username" component="div" />
          <Field name="password" type="password" placeholder="Password" />
          <ErrorMessage name="password" component="div" />
          <Field name="role" type="text" placeholder="Role" />
          <ErrorMessage name="role" component="div" />
          <Field name="email" type="email" placeholder="Email" />
          <ErrorMessage name="email" component="div" />
          <button type="submit">Add User</button>
        </Form>
      </Formik>

      <h2>Delete User</h2>
      <DeleteUser deleteUser={deleteUser} />
      <ul>
        {users.map((user) => (
          <li key={user.userId}>
            {user.username} (ID: {user.userId})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;
