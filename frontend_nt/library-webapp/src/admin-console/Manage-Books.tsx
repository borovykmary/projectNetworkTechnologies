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
import { Book } from "../api/Book";
import { useTranslation } from "react-i18next";

/*interface BookFormValues {
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
}*/
interface DeleteBookProps {
  deleteBook: (bookId: number) => void;
}

function DeleteBook({ deleteBook }: DeleteBookProps) {
  const { t, i18n } = useTranslation();
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
      <Form className="form-section">
        <div className="form-group">
          <Field name="bookId" type="text" placeholder="Book ID" />
          <ErrorMessage
            name="bookId"
            component="div"
            className="error-message"
          />
        </div>
        <div className="button-group">
          <button type="submit">{t("delete-book")}</button>
        </div>
      </Form>
    </Formik>
  );
}

const ManageBooks: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [books, setBooks] = useState<CreateBookRequestDto[]>([]);
  const [bookDetails, setBookDetails] = useState<AddBookDetailsRequestDto[]>(
    [],
  );
  const apiClient = useApi();

  const addBook = async (values: CreateBookRequestDto) => {
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
        alert("Book is successfully created");
      } else {
        console.error(`Book creation failed with status code ${response}`);
        alert("Book creation failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addBookDetails = async (values: AddBookDetailsRequestDto) => {
    const data: AddBookDetailsRequestDto = {
      bookId: values.bookId,
      genre: values.genre,
      summary: values.summary,
      coverImageUrl: values.coverImageUrl,
    };
    try {
      const response = await apiClient.addBookDetails(data);

      if (response === 201) {
        setBookDetails([...bookDetails, values]);
        alert("Book Details is successfully updated");
      } else {
        console.error(
          `Book details creation failed with status code ${response}`,
        );
        alert("Book details creation failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteBook = async (bookId: number) => {
    const response = await apiClient.deleteBook(bookId);
    if (response.success) {
      alert("Book is successfully deleted");
    } else {
      alert("Book deletion failed");
    }
  };
  const [allBooks, setAllBooks] = useState<Book[]>([]);

  const handleSeeAllBooks = async () => {
    const response = await apiClient.getBooks();
    console.log(response.data);
    if (response.success) {
      setAllBooks(response.data);
    } else {
      alert("Failed to retrieve books");
    }
  };

  return (
    <div className="manage-books">
      <h2>{t("add-book")}</h2>
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
            <label htmlFor="isbn">{t("isbn")}</label>
            <Field name="isbn" type="text" placeholder={t("isbn")} />
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
            <label htmlFor="author">{t("author")}</label>
            <Field name="author" type="text" placeholder={t("author")} />
            <ErrorMessage
              name="author"
              component="div"
              className="error-message"
            />
          </div>
          <div className="form-group">
            <label htmlFor="publisher">{t("publisher")}</label>
            <Field name="publisher" type="text" placeholder={t("publisher")} />
            <ErrorMessage
              name="publisher"
              component="div"
              className="error-message"
            />
          </div>
          <div className="form-group">
            <label htmlFor="yearPublished">{t("yearPublished")}</label>
            <Field
              name="yearPublished"
              type="number"
              placeholder={t("yearPublished")}
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
            <button type="submit">{t("add-book")}</button>
          </div>
        </Form>
      </Formik>

      <h2>{t("update-book-details")}</h2>

      <Formik
        initialValues={{
          bookId: 0,
          genre: "",
          summary: "",
          coverImageUrl: "",
        }}
        validationSchema={Yup.object({
          bookId: Yup.number().required("Required"),
          genre: Yup.string().required("Required"),
          summary: Yup.string().required("Required"),
          coverImageUrl: Yup.string().url("Invalid URL").required("Required"),
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
            <label htmlFor="genre">{t("genre")}</label>
            <Field name="genre" type="text" placeholder={t("genre")} />
            <ErrorMessage
              name="genre"
              component="div"
              className="error-message"
            />
          </div>
          <div className="form-group">
            <label htmlFor="summary">{t("summary")}</label>
            <Field name="summary" as="textarea" placeholder={t("summary")} />
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

      <h2>{t("delete-book")}</h2>

      <DeleteBook deleteBook={handleDeleteBook} />
      <h2>{t("books")}</h2>
      <div className="button-group">
        <button type="submit" onClick={handleSeeAllBooks}>
          {t("see-all-books-button")}
        </button>
      </div>
      <div>
        {allBooks.map((book) => (
          <Card key={book.id}>
            <CardContent>
              <Typography variant="h5">Book ID: {book.id}</Typography>
              <Typography variant="h5">ISBN: {book.isbn}</Typography>
              <Typography variant="h5">Title: {book.title}</Typography>
              <Typography variant="h5">Author: {book.author}</Typography>
              <Typography variant="h5">Publisher: {book.publisher}</Typography>
              <Typography variant="h5">
                Year Published: {book.yearPublished}
              </Typography>
              <Typography variant="h5">
                Is Available: {book.available ? "Available" : "Not Available"}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManageBooks;
