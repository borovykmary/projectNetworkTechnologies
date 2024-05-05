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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Home-page.css";

const books = [
  {
    isbn: "9780747532747",
    title: "Philosopher's Stone",
    author: "J.K. Rowling",
    publisher: "Bloomsbury Publishing PLC",
    yearPublished: 1997,
    availableCopies: 60,
    genre: "Fantasy",
    summary: "Summary of the book",
    coverImageUrl:
      "https://media.harrypotterfanzone.com/sorcerers-stone-us-childrens-edition.jpg",
  },
  {
    isbn: "9780747532748",
    title: "Chamber of Secrets",
    author: "J.K. Rowling",
    publisher: "Bloomsbury Publishing PLC",
    yearPublished: 1998,
    availableCopies: 54,
    genre: "Fantasy",
    summary: "Summary of the book",
    coverImageUrl:
      "https://media.harrypotterfanzone.com/chamber-of-secrets-uk-childrens-edition-2014.jpg",
  },
  {
    isbn: "9780747532749",
    title: "Prisoner of Azkaban",
    author: "J.K. Rowling",
    publisher: "Bloomsbury Publishing PLC",
    yearPublished: 1999,
    availableCopies: 70,
    genre: "Fantasy",
    summary: "Summary of the book",
    coverImageUrl:
      "https://media.harrypotterfanzone.com/prisoner-of-azkaban-uk-childrens-edition-2014.jpg",
  },
  {
    isbn: "9780399128967",
    title: "Dune",
    author: "Frank Herbert",
    publisher: "Putnam Adult",
    yearPublished: 1984,
    availableCopies: 39,
    genre: "Sci-Fi",
    summary: "Summary of the book",
    coverImageUrl:
      "https://cdnb.artstation.com/p/assets/images/images/042/950/663/large/giova-favazzi-dune-cover-front.jpg?1635882121",
  },
];

const genres = ["Fantasy", "Sci-Fi", "Mystery", "Romance"];

const HomePage: React.FC = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            My Library
          </Typography>
        </Toolbar>
      </AppBar>

      <Typography variant="h4" component="h2" className="section-title">
        Most Popular Books
      </Typography>

      <Grid container justifyContent="center" spacing={3} className="book-list">
        {books.map((book, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card className="book-card">
              <CardContent>
                <Typography variant="h5" component="h2" className="book-title">
                  {book.title}
                </Typography>
                <Typography className="book-author">{book.author}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
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
