import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Rating,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./ManageBooks.css";

interface BookFormValues {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  yearPublished: number;
  availableCopies: number;
  genre?: string;
  summary?: string;
  coverImageUrl?: string;
}

const ManageBooks: React.FC = () => {
  const [books, setBooks] = useState<BookFormValues[]>([]);

  const addBook = (values: BookFormValues) => {
    setBooks([...books, values]);
  };

  const updateBook = (isbn: string, updates: Partial<BookFormValues>) => {
    setBooks(
      books.map((book) =>
        book.isbn === isbn ? { ...book, ...updates } : book,
      ),
    );
  };

  const deleteBook = (isbn: string) => {
    setBooks(books.filter((book) => book.isbn !== isbn));
  };

  return (
    <div className="manage-books">
      <h2>Add Book</h2>
      <Formik
        initialValues={{
          isbn: "",
          title: "",
          author: "",
          publisher: "",
          yearPublished: 0,
          availableCopies: 0,
        }}
        validationSchema={Yup.object({
          isbn: Yup.string().required("Required"),
          title: Yup.string().required("Required"),
          author: Yup.string().required("Required"),
          publisher: Yup.string().required("Required"),
          yearPublished: Yup.number()
            .typeError("Must be a number")
            .required("Required"),
          availableCopies: Yup.number()
            .typeError("Must be a number")
            .required("Required"),
        })}
        onSubmit={(values, { resetForm }) => {
          addBook(values);
          resetForm();
        }}
      >
        <Form className="form-section">
          <div className="form-group">
            <label htmlFor="isbn">ISBN</label>
            <Field name="isbn" type="text" placeholder="ISBN" />
            <ErrorMessage
              name="isbn"
              component="div"
              className="error-message"
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <Field name="title" type="text" placeholder="Title" />
            <ErrorMessage
              name="title"
              component="div"
              className="error-message"
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <Field name="author" type="text" placeholder="Author" />
            <ErrorMessage
              name="author"
              component="div"
              className="error-message"
            />
          </div>
          <div className="form-group">
            <label htmlFor="publisher">Publisher</label>
            <Field name="publisher" type="text" placeholder="Publisher" />
            <ErrorMessage
              name="publisher"
              component="div"
              className="error-message"
            />
          </div>
          <div className="form-group">
            <label htmlFor="yearPublished">Year Published</label>
            <Field
              name="yearPublished"
              type="number"
              placeholder="Year Published"
            />
            <ErrorMessage
              name="yearPublished"
              component="div"
              className="error-message"
            />
          </div>
          <div className="form-group">
            <label htmlFor="availableCopies">Available Copies</label>
            <Field
              name="availableCopies"
              type="number"
              placeholder="Available Copies"
            />
            <ErrorMessage
              name="availableCopies"
              component="div"
              className="error-message"
            />
          </div>
          <div className="button-group">
            <button type="submit">Add Book</button>
          </div>
        </Form>
      </Formik>

      <h2>Update Book Details</h2>
      <Formik
        initialValues={{
          isbn: "",
          genre: "",
          summary: "",
          coverImageUrl: "",
        }}
        validationSchema={Yup.object({
          isbn: Yup.string().required("Required"),
          genre: Yup.string(),
          summary: Yup.string(),
          coverImageUrl: Yup.string().url("Invalid URL"),
        })}
        onSubmit={(values, { resetForm }) => {
          const { isbn, ...updates } = values;
          updateBook(isbn, updates);
          resetForm();
        }}
      >
        <Form className="form-section">
          <div className="form-group">
            <label htmlFor="isbn">ISBN</label>
            <Field name="isbn" type="text" placeholder="ISBN" />
            <ErrorMessage
              name="isbn"
              component="div"
              className="error-message"
            />
          </div>
          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <Field name="genre" type="text" placeholder="Genre" />
            <ErrorMessage
              name="genre"
              component="div"
              className="error-message"
            />
          </div>
          <div className="form-group">
            <label htmlFor="summary">Summary</label>
            <Field name="summary" as="textarea" placeholder="Summary" />
            <ErrorMessage
              name="summary"
              component="div"
              className="error-message"
            />
          </div>
          <div className="form-group">
            <label htmlFor="coverImageUrl">Cover Image URL</label>
            <Field
              name="coverImageUrl"
              type="text"
              placeholder="Cover Image URL"
            />
            <ErrorMessage
              name="coverImageUrl"
              component="div"
              className="error-message"
            />
          </div>
          <div className="button-group">
            <button type="submit">Update Book</button>
          </div>
        </Form>
      </Formik>

      <h2>Delete Book</h2>
      <Formik
        initialValues={{ isbn: "" }}
        validationSchema={Yup.object({
          isbn: Yup.string().required("Required"),
        })}
        onSubmit={(values, { resetForm }) => {
          if (window.confirm("Are you sure you want to delete this book?")) {
            deleteBook(values.isbn);
          }
          resetForm();
        }}
      >
        <Form className="form-section">
          <div className="form-group">
            <label htmlFor="isbn">ISBN</label>
            <Field name="isbn" type="text" placeholder="ISBN" />
            <ErrorMessage
              name="isbn"
              component="div"
              className="error-message"
            />
          </div>
          <div className="button-group">
            <button type="submit">Delete Book</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ManageBooks;
