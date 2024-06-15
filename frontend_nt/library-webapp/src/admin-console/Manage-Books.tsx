import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card, CardContent, Typography } from "@mui/material";
import "./ManageBooks.css";
import { useApi } from "../api/ApiProvide";
import { CreateBookRequestDto } from "../api/add-book-request.dto";
import { AddBookDetailsRequestDto } from "../api/add-bookdetails-request.dto";
import { Book } from "../api/Book";
import { useTranslation } from "react-i18next";

interface DeleteBookProps {
  deleteBook: (bookId: number) => void;
}

function DeleteBook({ deleteBook }: DeleteBookProps) {
  const { t } = useTranslation();
  return (
    <Formik
      initialValues={{ deleteBook: 0 }}
      onSubmit={(values, { setSubmitting }) => {
        if (window.confirm(t("alert8"))) {
          deleteBook(values.deleteBook);
        }
        setSubmitting(false);
      }}
    >
      <Form className="form-section">
        <div className="form-group">
          <Field name="bookId" type="text" placeholder={t("bookId")} />
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
  const { t } = useTranslation();
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
        alert(t("alert9"));
      } else {
        console.error(`Book creation failed with status code ${response}`);
        alert(t("alert10"));
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
        alert(t("alert11"));
      } else {
        console.error(
          `Book details creation failed with status code ${response}`,
        );
        alert(t("alert12"));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteBook = async (bookId: number) => {
    const response = await apiClient.deleteBook(bookId);
    if (response.success) {
      alert(t("alert13"));
    } else {
      alert(t("alert14"));
    }
  };
  const [allBooks, setAllBooks] = useState<Book[]>([]);

  const handleSeeAllBooks = async () => {
    const response = await apiClient.getBooks();
    console.log(response.data);
    if (response.success) {
      setAllBooks(response.data);
    } else {
      alert(t("alert15"));
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
          isbn: Yup.string().required(t("required")),
          title: Yup.string().required(t("required")),
          author: Yup.string().required(t("required")),
          publisher: Yup.string().required(t("required")),
          yearPublished: Yup.number()
            .typeError(t("must-be-number"))
            .required(t("required")),
          availableCopies: Yup.number()
            .typeError(t("must-be-number"))
            .required(t("required")),
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
            <label htmlFor="title">{t("title")}</label>
            <Field name="title" type="text" placeholder={t("title")} />
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
            <label htmlFor="availableCopies">{t("available-copies")}</label>
            <Field
              name="availableCopies"
              type="number"
              placeholder={t("available-copies")}
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
            <label htmlFor="bookId">{t("bookId")}</label>
            <Field name="bookId" type="text" placeholder={t("bookId")} />
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
            <label htmlFor="coverImageUrl">{t("cover-image-url")}</label>
            <Field
              name="coverImageUrl"
              type="text"
              placeholder={t("cover-image-url")}
            />
            <ErrorMessage
              name="coverImageUrl"
              component="div"
              className="error-message"
            />
          </div>
          <div className="button-group">
            <button type="submit">{t("update-book")}</button>
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
              <Typography variant="h5">
                {t("bookId")}: {book.id}
              </Typography>
              <Typography variant="h5">
                {t("isbn")} {book.isbn}
              </Typography>
              <Typography variant="h5">
                {t("title")}: {book.title}
              </Typography>
              <Typography variant="h5">
                {t("author")} {book.author}
              </Typography>
              <Typography variant="h5">
                {t("publisher")} {book.publisher}
              </Typography>
              <Typography variant="h5">
                {t("yearPublished")} {book.yearPublished}
              </Typography>
              <Typography variant="h5">
                {t("is-available")}:{" "}
                {book.available
                  ? t("availability-true")
                  : t("availability-false")}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManageBooks;
