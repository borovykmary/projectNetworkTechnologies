import "./Login-form.css";
import { Button, TextField } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { Formik } from "formik";
import { useCallback, useMemo } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useApi } from "../api/ApiProvide";
import { useTranslation } from "react-i18next";

type FormValues = {
  username: string;
  password: string;
};

function LoginForm() {
  const initialValues = { username: "", password: "" };
  const navigate = useNavigate();
  const apiClient = useApi();
  const { t } = useTranslation();

  const submit = useCallback(
    (values: FormValues, formik: any) => {
      formik.resetForm();

      apiClient.login(values).then((response) => {
        console.log(response);
        if (!response.success) {
          console.log("Login failed");
          return;
        }
      });
      navigate("/home");
    },
    [navigate],
  );

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup.string().required(t("required")),
        password: yup
          .string()
          .required(t("required"))
          .min(8, t("alert21")),
      }),
    [],
  );

  return (
    <div className="login-page">
      <div className="login-content">
        <div className="login-text">
          <h1>{t("login")}</h1>
          <p>{t("welcome-text")}</p>
        </div>

        <Formik
          initialValues={initialValues}
          onSubmit={submit}
          validationSchema={validationSchema}
          validateOnChange
          validateOnBlur
        >
          {(formik: any) => (
            <form
              id="loginForm"
              className="Login-form"
              onSubmit={formik.handleSubmit}
              noValidate
            >
              <TextField
                id="username"
                label={t("username")}
                variant="outlined"
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && !!formik.errors.username}
                helperText={formik.touched.username && formik.errors.username}
              />
              <TextField
                id="password"
                label={t("password")}
                variant="outlined"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && !!formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
              />
              <Button
                variant="contained"
                style={{ backgroundColor: "#2f3e46", color: "#fbf7f2" }}
                type="submit"
                form="loginForm"
                disabled={!formik.isValid && formik.dirty}
                endIcon={<LoginIcon />}
              >
                {" "}
                {t("login")}{" "}
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default LoginForm;
