import "./Login-form.css";
import { Button, TextField } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { Formik } from "formik";
import { useCallback, useMemo } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useApi } from "../api/ApiProvide";
import {useCookies} from "react-cookie";

type FormValues = {
  username: string;
  password: string;
};

function LoginForm() {
  // const [cookies, setCookie] = useCookies(['token']);
  const initialValues = { username: "", password: "" };
  const navigate = useNavigate();
  const apiClient = useApi();

  const submit = useCallback(
  (values: FormValues, formik: any) => {
    formik.resetForm();

    apiClient.login(values).then((response) => {
      console.log(response);
      if (!response.success) {
        console.log("Login failed");
        return;
      }
        // setCookie("token", response.data.token, { path: "/"});
    });
    navigate("/home");
  },
  [navigate],
);

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup.string().required("Username is required"),
        password: yup
          .string()
          .required("Password is required")
          .min(8, "Password must be at least 8 characters"),
      }),
    [],
  );

  return (
    <div className="login-page">
      <div className="login-content">
        <div className="login-text">
          <h1>Log In</h1>
          <p>Welcome back, dear user!</p>
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
                label="Username"
                variant="outlined"
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && !!formik.errors.username}
                helperText={formik.touched.username && formik.errors.username}
              />
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && !!formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
              />
              <Button
                variant="contained"
                type="submit"
                form="loginForm"
                disabled={!formik.isValid && formik.dirty}
                endIcon={<LoginIcon />}
              >
                {" "}
                LogIn{" "}
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default LoginForm;
