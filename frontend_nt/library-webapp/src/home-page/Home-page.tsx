import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Home-page.css";
import { useNavigate } from "react-router-dom";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { useEffect, useState } from "react";
import { useApi } from "../api/ApiProvide";
import { Book } from "../api/Book";
import { BookDetails } from "../api/BookDetails";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AppBarUser from "../components/AppBarUser";
import {GetReviewDto} from "../api/get-review.dto";

// const sortedBooks = books.sort((a, b) => b.rating - a.rating).slice(0, 4);

const HomePage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [sortedBooks, setSortedBooks] = useState<{ [genre: string]: Book[] }>(
    {},
  );
  const apiClient = useApi();
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [borrowStatus, setBorrowStatus] = useState<string | null>(null);
  const [isBorrowing, setIsBorrowing] = useState<boolean>(false);
  const [reviews, setReviews] = useState<GetReviewDto[]>([]);

  const handleBorrowBook = async (bookId: number) => {
    setIsBorrowing(true);
    const response = await apiClient.borrowBook(bookId);
    if (response.success) {
      setBorrowStatus(response.data.status);
      setIsBorrowing(true);
    } else {
      setBorrowStatus(response.data.status);
    }
    setIsBorrowing(false);
  };
  const handleOpenBook = async (book: Book) => {
    console.log("Open book clicked", book);
    setSelectedBook(book);
    const response = await apiClient.getBookReviews(book.id);
    if (response.success) {
      setReviews(response.data);
    } else {
      console.error("Failed to fetch reviews:", response.data);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
    setShowModal(false);
  };

  const Modal = () => {
    if (!showModal || !selectedBook) return null;


    const averageRating =
        reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length || 0;

    return (
      <div className="modal">
        <Grid container>
          <Grid item xs={12} sm={6}>
            <img
              className="book-cover-modal"
              src={selectedBook.coverImageUrl}
              alt={selectedBook.title}
              style={{ width: "100%", height: "auto" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="h5"
              component="h2"
              className="book-title-modal"
            >
              {selectedBook.title}
            </Typography>
            <Typography className="book-isbn">
              ISBN: {selectedBook.isbn}
            </Typography>
            <Typography className="book-isbn">
              Year Published: {selectedBook.yearPublished}
            </Typography>
            <Typography className="book-author">
              Author: {selectedBook.author}
            </Typography>
            <Typography className="book-publisher">
              Publisher: {selectedBook.publisher}
            </Typography>
            <Typography className="book-genre">
              Genre: {selectedBook.genre}
            </Typography>
            <Typography className="book-copies">
              Available copies: {selectedBook.availableCopies}
            </Typography>
            <Typography className="book-summary">
              Summary: {selectedBook.summary}
            </Typography>
            <Rating name="read-only" value={averageRating} readOnly />
            <Typography className="book-reviews">
              Review Comments:
              {reviews.length > 0 ? (
                  reviews.map((review, index) => (
                      <Typography key={index}>{review.comment}</Typography>
                  ))
              ) : (
                  <Typography>No comments yet provided</Typography>
              )}
            </Typography>
            <button
              className="button-borrow"
              onClick={() => handleBorrowBook(selectedBook.id)}
              disabled={isBorrowing}
            >
              {borrowStatus || "Borrow Book"}
            </button>
            <button onClick={handleCloseModal} className="button-close">
              Close
            </button>
          </Grid>
        </Grid>
      </div>
    );
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await apiClient.getBooks();
      if (response.success) {
        const fetchedBooks = response.data;
        const promises = fetchedBooks.map(async (book: Book) => {
          const detailsResponse = await apiClient.getBookDetails(book.id);
          if (detailsResponse.success) {
            return { ...book, ...detailsResponse.data };
          } else {
            console.error(
              "Failed to fetch details for book:",
              book.id,
              detailsResponse.data,
            );
            return {
              ...book,
              genre: "No data",
              summary: "No data",
              coverImageUrl:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNT0xwyLstvC7wH8jYIKur3GTcSq-g6fj2EbL4wk-qaONHYjBswa3rpFsZJeEjuXcG-lw&usqp=CAU",
            };
          }
        });
        const booksWithDetails = await Promise.all(promises);
        console.log("Books with Details:", booksWithDetails);
        setBooks(booksWithDetails);

        const sorted = booksWithDetails.reduce(
          (acc: { [genre: string]: Book[] }, book) => {
            const genre =
              !book.genre || book.genre === "No data"
                ? "Not Categorized"
                : book.genre;
            if (!acc[genre]) {
              acc[genre] = [];
            }
            acc[genre].push(book);
            return acc;
          },
          {},
        );
        console.log("Sorted Books:", sorted);

        setSortedBooks(sorted);
      }
    };

    fetchBooks();
  }, [apiClient]);
  useEffect(() => {
    console.log("Modal state changed", showModal);
  }, [showModal]);

  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  return (
    <div>
      <AppBarUser />
      {Object.keys(sortedBooks).map((genre, genreIndex) => (
        <div key={genreIndex}>
          <Typography variant="h4" component="h2" className="section-title">
            {genre}
          </Typography>
          <Grid
            container
            justifyContent="center"
            spacing={3}
            className="book-list"
          >
            {sortedBooks[genre].map((book, bookIndex) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={bookIndex}>
                <Card className="book-card">
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="h2"
                      className="book-title"
                    >
                      {book.title}
                    </Typography>
                    <Typography className="book-author">
                      {book.author}
                    </Typography>
                    <img
                      className="book-cover"
                      src={book.coverImageUrl}
                      alt={book.title}
                      style={{ width: "100%", height: "auto" }}
                    />
                    <button onClick={() => handleOpenBook(book)}>
                      Open Book
                    </button>
                  </CardContent>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Year Published: {book.yearPublished} <br />
                        Genre: {book.genre} <br />
                        Summary: {book.summary} <br />
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      ))}
      <Modal />
    </div>
  );
};

export default HomePage;
