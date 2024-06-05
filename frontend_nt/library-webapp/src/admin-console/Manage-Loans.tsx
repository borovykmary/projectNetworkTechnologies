import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import "./ManageLoans.css";
import { Formik, Form, Field } from "formik";

const ManageLoans: React.FC = () => {
  const [loanIdForBorrow, setLoanIdForBorrow] = useState("");
  const [loanIdForReturn, setLoanIdForReturn] = useState("");
  const [loanIdForSearch, setLoanIdForSearch] = useState("");

  const handleSeeAllLoans = () => {
    // Implement the logic to see all loans
  };

  const handleProcessBorrow = () => {
    // Implement the logic to process borrowing of a book
  };

  const handleProcessReturn = () => {
    // Implement the logic to process returning of a book
  };

  const handleSearch = () => {
    // Implement the logic to search for loans
  };

  return (
    <div className="manage-loans">
      <Formik
        initialValues={{
          loanIdForBorrow: "",
          loanIdForReturn: "",
          loanIdForSearch: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          // Implement the logic to process borrowing, returning, and searching
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-section">
              <Typography variant="h5">Process Borrowing of Book</Typography>
              <div className="form-group">
                <Field as={TextField} name="loanIdForBorrow" label="Loan ID" />
                <button type="submit" disabled={isSubmitting}>
                  Process Borrow
                </button>
              </div>
            </div>

            <div className="form-section">
              <Typography variant="h5">Process Returning of Book</Typography>
              <div className="form-group">
                <Field as={TextField} name="loanIdForReturn" label="Loan ID" />
                <button type="submit" disabled={isSubmitting}>
                  Process Return
                </button>
              </div>
            </div>
            <div className="form-section">
              <Typography variant="h5">Search for Loans</Typography>
              <div className="form-group">
                <Field as={TextField} name="loanIdForSearch" label="Loan ID" />
                <button type="submit" disabled={isSubmitting}>
                  Search
                </button>
              </div>
            </div>
            <Typography variant="h5">All Loans</Typography>
            <div className="form-group">
              <button type="submit" onClick={handleSeeAllLoans}>
                See All Loans
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ManageLoans;
