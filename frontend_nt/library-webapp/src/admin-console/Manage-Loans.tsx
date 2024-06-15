import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import "./ManageLoans.css";
import { Formik, Form, Field, useFormikContext, ErrorMessage } from "formik";
import { useApi } from "../api/ApiProvide";
import { Loans } from "../api/Loans";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const ManageLoans: React.FC = () => {
  const [loanIdForBorrow, setLoanIdForBorrow] = useState("");
  const [loanIdForReturn, setLoanIdForReturn] = useState("");
  const { t } = useTranslation();

  const apiClient = useApi();

  const [allLoans, setAllLoans] = useState<Loans[]>([]);

  const handleSeeAllLoans = async () => {
    const response = await apiClient.getAllLoans();
    if (response.success) {
      setAllLoans(response.data);
    } else if (response.status === 403) {
      alert(t("alert4"));
    } else {
      alert(t("alert16"));
    }
  };

  const handleProcessBorrow = async () => {
    const response = await apiClient.processLoan(loanIdForBorrow);
    console.log("loan id to borrow " + loanIdForBorrow);
    if (response.status === 200) {
      alert(t("alert17"));
    } else if (response.status === 403) {
      alert(t("alert4"));
    } else {
      alert(t("alert18"));
    }
  };

  const handleProcessReturn = async () => {
    const response = await apiClient.processReturn(loanIdForReturn);
    if (response.status === 200) {
      alert(t("alert19"));
    } else if (response.status === 403) {
      alert(t("alert4"));
    } else {
      alert(t("alert20"));
    }
  };

  return (
    <div className="manage-loans">
      <Formik
        initialValues={{
          loanIdForBorrow: "",
          loanIdForReturn: "",
        }}
        validationSchema={Yup.object({
          loanIdForBorrow: Yup.string().required(t("required")),
          loanIdForReturn: Yup.string().required(t("required")),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div className="form-section">
              <h2>{t("process-borrowing")}</h2>
              <div className="form-group">
                <label htmlFor="loanId">{t("loanId")}</label>
                <Field
                  name="loanIdForBorrow"
                  type="text"
                  placeholder={t("loanId")}
                  onChange={(e: any) => {
                    setLoanIdForBorrow(e.target.value);
                    setFieldValue("loanIdForBorrow", e.target.value);
                  }}
                />
                <ErrorMessage
                  name="loanIdForBorrow"
                  component="div"
                  className="error-message"
                />
                <div className="button-group">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onClick={handleProcessBorrow}
                  >
                    {t("process-borrow-button")}
                  </button>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2>{t("process-returning")}</h2>
              <div className="form-group">
                <label htmlFor="loanId">{t("loanId")}</label>
                <Field
                  name="loanIdForReturn"
                  type="text"
                  placeholder={t("loanId")}
                  onChange={(e: any) => {
                    setLoanIdForReturn(e.target.value);
                    setFieldValue("loanIdForReturn", e.target.value);
                  }}
                />
                <ErrorMessage
                  name="loanIdForReturn"
                  component="div"
                  className="error-message"
                />
                <div className="button-group">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onClick={handleProcessReturn}
                  >
                    {t("process-return-button")}
                  </button>
                </div>
              </div>
            </div>
            <h2>{t("all-loans")}</h2>
            <div className="button-group">
              <button type="submit" onClick={handleSeeAllLoans}>
                {t("see-all-loans-button")}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="all-loans">
        {allLoans.map((loan) => (
          <Card key={loan.loanId}>
            <CardContent>
              <Typography variant="h5">
                {t("loanId")}: {loan.loanId}
              </Typography>
              <Typography variant="h5">
                {t("bookId")}: {loan.bookId}
              </Typography>
              <Typography variant="h5">
                {t("borrowing-date")}: {loan.loanDate}
              </Typography>
              <Typography variant="h5">
                {t("due-date")}: {loan.dueDate}
              </Typography>
              <Typography variant="h5">
                {t("return-date")}: {loan.returnDate}
              </Typography>
              <Typography variant="h5">
                {t("status")}: {loan.status}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManageLoans;
