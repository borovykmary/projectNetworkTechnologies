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

const ManageLoans: React.FC = () => {
  const [loanIdForBorrow, setLoanIdForBorrow] = useState("");
  const [loanIdForReturn, setLoanIdForReturn] = useState("");

  const apiClient = useApi();

  const [allLoans, setAllLoans] = useState<Loans[]>([]);

  const handleSeeAllLoans = async () => {
    const response = await apiClient.getAllLoans();
    if (response.success) {
      setAllLoans(response.data);
    } else if (response.status === 403) {
      alert("You do not have ADMIN permissions");
    } else {
      alert("Failed to retrieve loans");
    }
  };

  const handleProcessBorrow = async () => {
    const response = await apiClient.processLoan(loanIdForBorrow);
    console.log("loan id to borrow " + loanIdForBorrow);
    if (response.status === 200) {
      alert("Loan processed successfully");
    } else if (response.status === 403) {
      alert("You do not have ADMIN permissions");
    } else {
      alert("failed processing loan");
    }
  };

  const handleProcessReturn = async () => {
    const response = await apiClient.processReturn(loanIdForReturn);
    if (response.status === 200) {
      alert("Loan return processed successfully");
    } else if (response.status === 403) {
      alert("You do not have ADMIN permissions");
    } else {
      alert("failed processing loan return");
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
          loanIdForBorrow: Yup.string().required("Required"),
          loanIdForReturn: Yup.string().required("Required"),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div className="form-section">
              <h2>Process Borrowing of Book</h2>
              <div className="form-group">
                <label htmlFor="loanId">Loan ID</label>
                <Field
                  name="loanIdForBorrow"
                  type="text"
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
                    Process Borrow
                  </button>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2>Process Returning of Book</h2>
              <div className="form-group">
                <label htmlFor="loanId">Loan ID</label>
                <Field
                  name="loanIdForReturn"
                  type="text"
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
                    Process Return
                  </button>
                </div>
              </div>
            </div>
            <h2>All Loans</h2>
            <div className="button-group">
              <button type="submit" onClick={handleSeeAllLoans}>
                See All Loans
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="all-loans">
        {allLoans.map((loan) => (
          <Card key={loan.loanId}>
            <CardContent>
              <Typography variant="h5">Loan ID: {loan.loanId}</Typography>
              <Typography variant="h5">Book ID: {loan.bookId}</Typography>
              <Typography variant="h5">Loan Date: {loan.loanDate}</Typography>
              <Typography variant="h5">Due Date: {loan.dueDate}</Typography>
              <Typography variant="h5">
                Return Date: {loan.returnDate}
              </Typography>
              <Typography variant="h5">Status: {loan.status}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManageLoans;
