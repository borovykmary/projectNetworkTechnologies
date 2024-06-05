import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./ManageUsers.css";
import { useApi } from "../api/ApiProvide";
import { RegisterUserRequestDto } from "../api/register-user-request.dto";

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
  const [message, setMessage] = useState<string | null>(null);
  const apiClient = useApi();

  const addUser = async (values: UserFormValues) => {
    const data: RegisterUserRequestDto = {
      username: values.username,
      password: values.password,
      role: values.role,
      email: values.email,
    };
    try {
      const response = await apiClient.registerUser(data);

      if (response === 201) {
        setUsers([...users, values]);
        setMessage("User is successfully created");
      } else {
        console.error(`User registration failed with status code ${response}`);
        setMessage("User registration failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    const response = await apiClient.deleteUser(userId);
    if (response.success) {
      setMessage("User is successfully deleted");
    } else {
      setMessage("User deletion failed");
    }
  };

  return (
    <div className="manage-users">
      <h2>Add User</h2>
      {message && <p>{message}</p>}
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
        <Form>
          <Field name="username" type="text" placeholder="Username" />
          <ErrorMessage name="username" component="div" />
          <Field name="password" type="password" placeholder="Password" />
          <ErrorMessage name="password" component="div" />
          <Field as="select" name="role">
            <option value="">Select a role</option>
            <option value="ROLE_ADMIN">ROLE_ADMIN</option>
            <option value="ROLE_READER">ROLE_READER</option>
          </Field>
          <ErrorMessage name="role" component="div" />
          <Field name="email" type="email" placeholder="Email" />
          <ErrorMessage name="email" component="div" />
          <button type="submit">Add User</button>
        </Form>
      </Formik>

      <h2>Delete User</h2>
      {message && <p>{message}</p>}
      <DeleteUser deleteUser={handleDeleteUser} />
    </div>
  );
};

export default ManageUsers;
