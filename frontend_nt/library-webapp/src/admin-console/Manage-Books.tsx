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
import { useApi } from "../api/ApiProvide";
import { CreateBookRequestDto } from "../api/add-book-request.dto";
import { AddBookDetailsRequestDto } from "../api/add-bookdetails-request.dto";

interface BookFormValues {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  yearPublished: number;
  availableCopies: number;
}
interface BookDetailsFormValues {
  bookId: number;
  genre: string;
  summary: string;
  coverImageUrl: string;
}
interface DeleteBookProps {
  deleteBook: (bookId: number) => void;
}

function DeleteBook({ deleteBook }: DeleteBookProps) {
  return (
    <Formik
      initialValues={{ deleteBook: 0 }}
      onSubmit={(values, { setSubmitting }) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
          deleteBook(values.deleteBook);
        }
        setSubmitting(false);
      }}
    >
      <Form>
        <Field name="bookId" type="text" placeholder="Book ID" />
        <ErrorMessage name="bookId" component="div" />
        <button type="submit">Delete Book</button>
      </Form>
    </Formik>
  );
}

const ManageBooks: React.FC = () => {
  const [books, setBooks] = useState<BookFormValues[]>([]);
  const [bookDetails, setBookDetails] = useState<BookDetailsFormValues[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const apiClient = useApi();

  const addBook = async (values: BookFormValues) => {
    const data: CreateBookRequestDto = {
      isbn: values.isbn,
      title: values.title,
      author: values.author,
      publisher: values.publisher,
      yearPublished: values.yearPublished,
      availableCopies: values.availableCopies,
    };
    try {
      const response = await apiClient.addBook(data);

      if (response === 201) {
        setBooks([...books, values]);
        setMessage("Book is successfully created");
      } else {
        console.error(`Book creation failed with status code ${response}`);
        setMessage("Book creation failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addBookDetails = async (values: BookDetailsFormValues) => {
    const data: AddBookDetailsRequestDto = {
      bookId: values.bookId,
      genre: values.genre,
      summary: values.summary,
      coverImageURL: values.coverImageUrl,
    };
    try {
      const response = await apiClient.addBookDetails(data);

      if (response === 201) {
        setBookDetails([...bookDetails, values]);
        setMessage("Book Details is successfully updated");
      } else {
        console.error(
          `Book details creation failed with status code ${response}`,
        );
        setMessage("Book details creation failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteBook = async (bookId: number) => {
    const response = await apiClient.deleteBook(bookId);
    if (response.success) {
      setMessage("Book is successfully deleted");
    } else {
      setMessage("Book deletion failed");
    }
  };

  return (
    <div className="manage-books">
      <h2>Add Book</h2>
      {message && <p>{message}</p>}
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
      {message && <p>{message}</p>}
      <Formik
        initialValues={{
          bookId: 0,
          genre: "",
          summary: "",
          coverImageUrl: "",
        }}
        validationSchema={Yup.object({
          bookId: Yup.number().required("Required"),
          genre: Yup.string(),
          summary: Yup.string(),
          coverImageUrl: Yup.string().url("Invalid URL"),
        })}
        onSubmit={(values, { resetForm }) => {
          addBookDetails(values);
          resetForm();
        }}
      >
        <Form className="form-section">
          <div className="form-group">
            <label htmlFor="bookId">Book ID</label>
            <Field name="bookId" type="text" placeholder="Book ID" />
            <ErrorMessage
              name="bookId"
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
      {message && <p>{message}</p>}
      <DeleteBook deleteBook={handleDeleteBook} />
    </div>
  );
};

export default ManageBooks;
