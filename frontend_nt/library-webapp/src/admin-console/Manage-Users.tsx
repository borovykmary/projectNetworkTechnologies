import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./ManageUsers.css";
import { useApi } from "../api/ApiProvide";
import { RegisterUserRequestDto } from "../api/register-user-request.dto";
import { Users } from "../api/Users";
import { Card, CardContent, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface DeleteUserProps {
  deleteUser: (userId: number) => void;
}

function DeleteUser({ deleteUser }: DeleteUserProps) {
  const { t } = useTranslation();
  return (
    <Formik
      initialValues={{ userId: 0 }}
      onSubmit={(values, { setSubmitting }) => {
        if (window.confirm(t("alert1"))) {
          deleteUser(values.userId);
        }
        setSubmitting(false);
      }}
    >
      <Form className="form-selection">
        <div className="form-group">
          <label htmlFor="userId">{t("userId")}</label>

          <Field name="userId" type="text" placeholder={t("userId")} />
          <ErrorMessage
            name="userId"
            component="div"
            className="error-message"
          />
          <div className="button-group">
            <button type="submit">{t("delete-user")}</button>
          </div>
        </div>
      </Form>
    </Formik>
  );
}

const ManageUsers: React.FC = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<RegisterUserRequestDto[]>([]);
  const apiClient = useApi();

  const addUser = async (values: RegisterUserRequestDto) => {
    const data: RegisterUserRequestDto = {
      username: values.username,
      password: values.password,
      role: values.role,
      email: values.email,
    };

    const response = await apiClient.registerUser(data);

    if (response === 201) {
      setUsers([...users, values]);
      alert(t("alert2"));
    } else if (response === 403) {
      alert(t("alert4"));
    } else {
      console.error(`User registration failed with status code ${response}`);
      alert(t("alert3"));
    }
  };
  const [allUsers, setAllUsers] = useState<Users[]>([]);

  const handleSeeAllUsers = async () => {
    const response = await apiClient.getAllUsers();
    if (response.success) {
      setAllUsers(response.data);
    } else if (response.status === 403) {
      alert(t("alert4"));
    } else {
      alert(t("alert5"));
    }
  };
  const handleDeleteUser = async (userId: number) => {
    const response = await apiClient.deleteUser(userId);
    if (response.success) {
      alert(t("alert6"));
    } else {
      alert(t("alert7"));
    }
  };


  return (
    <div className="manage-users">
      <h2>{t("add-user")}</h2>
      <Formik
        initialValues={{
          userId: 0,
          username: "",
          password: "",
          role: "",
          email: "",
        }}
        validationSchema={Yup.object({
          username: Yup.string().required(t("required")),
          password: Yup.string().required(t("required")),
          role: Yup.string().required(t("required")),
          email: Yup.string().email(t("invalid-email")).required(t("required")),
        })}
        onSubmit={(values, { resetForm }) => {
          addUser(values);
          resetForm();
        }}
      >
        <Form className="form-section">
          <div className="form-group">
            <label htmlFor="username">{t("username")}</label>
            <Field name="username" type="text" placeholder={t("username")} />
            <ErrorMessage
              name="username"
              component="div"
              className="error-message"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">{t("password")}</label>
            <Field
              name="password"
              type="password"
              placeholder={t("password")}
            />
            <ErrorMessage
              name="password"
              component="div"
              className="error-message"
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">{t("role")}</label>
            <Field as="select" name="role">
              <option value="">{t("select-role")}</option>
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
            <label htmlFor="email">{t("email")}</label>
            <Field name="email" type="email" placeholder={t("email")} />
            <ErrorMessage
              name="email"
              component="div"
              className="error-message"
            />
          </div>
          <div className="button-group">
            <button type="submit">{t("add-user")}</button>
          </div>
        </Form>
      </Formik>

      <h2>{t("delete-user")}</h2>
      <DeleteUser deleteUser={handleDeleteUser} />
      <h2>{t("all-users")}</h2>
      <div className="button-group">
        <button type="submit" onClick={handleSeeAllUsers}>
          {t("see-all-users-button")}
        </button>
      </div>
      <div>
        {allUsers.map((user) => (
          <Card key={user.userId}>
            <CardContent>
              <Typography variant="h5">
                {t("userId")}: {user.userId}
              </Typography>
              <Typography variant="h5">
                {t("email")}: {user.email}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
