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

// const sortedBooks = books.sort((a, b) => b.rating - a.rating).slice(0, 4);

const HomePage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [sortedBooks, setSortedBooks] = useState<{ [genre: string]: Book[] }>(
    {},
  );
  const apiClient = useApi();

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

  const navigate = useNavigate();

  const { t, i18n } = useTranslation();
  /* return (
    <div>
      <AppBar position="static" className="AppBar">
        <Toolbar className="ToolBar">
          <Typography
            variant="h6"
            component="div"
            style={{ marginRight: "20px" }}
          >
            <MenuBookRoundedIcon /> My Library
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              navigate("/home");
            }}
          >
            All Books
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              navigate("/loans");
            }}
          >
            Your Books
          </Button>
          <Button
            color="inherit"
            endIcon={<LogoutRoundedIcon />}
            onClick={() => {
              navigate("/login");
            }}
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>

      <Typography variant="h4" component="h2" className="section-title">
        Most Popular Books
      </Typography>
      <Grid container justifyContent="center" spacing={3} className="book-list">
        {sortedBooks.map((book, index) => {
          console.log(book.rating);
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card className="book-card">
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h2"
                    className="book-title"
                  >
                    {book.title}
                  </Typography>
                  <Typography className="book-author">{book.author}</Typography>
                  <img
                    className="book-cover"
                    src={book.coverImageUrl}
                    alt={book.title}
                    style={{ width: "100%", height: "auto" }}
                  />

                  <Rating
                    name="book-rating"
                    value={book.rating}
                    precision={0.5}
                    readOnly
                  />
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
                      Genre: {book.genre} <br />
                      Summary: {book.summary} <br />
                      Rating: {book.rating} <br />
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {genres.map((genre, index) => (
        <div key={index}>
          <Typography variant="h4" component="h2" className="section-title">
            {genre}
          </Typography>

          <Grid
            container
            justifyContent="center"
            spacing={3}
            className="book-list"
          >
            {books
              .filter((book) => book.genre === genre)
              .map((book, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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
                      <Rating
                        name="book-rating"
                        value={book.rating}
                        precision={0.5}
                        readOnly
                      />
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
                          Genre: {book.genre} <br />
                          Summary: {book.summary} <br />
                          <Button variant="contained" color="primary">
                            Borrow Book
                          </Button>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </Card>
                </Grid>
              ))}
          </Grid>

        </div>
      ))}
    </div>
  );

   */
  return (
    <div>
      <AppBar position="static" className="AppBar">
        <Toolbar className="ToolBar">
          <Typography
            variant="h6"
            component="div"
            style={{ marginRight: "20px" }}
          >
            <MenuBookRoundedIcon /> {t("library")}
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              navigate("/home");
            }}
          >
            {t("books")}
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              navigate("/loans");
            }}
          >
            Your Books
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              navigate("/admin");
            }}
          >
            Admin Console
          </Button>
          <Button
            color="inherit"
            endIcon={<LogoutRoundedIcon />}
            onClick={() => {
              navigate("/login");
            }}
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
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
    </div>
  );
};

export default HomePage;
