import React from "react";
import "./Home-page.css";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const books = [
  {
    bookTitle: "Book 1",
    bookAuthor: "Author 1",
    bookDescription: "Description 1",
  },
  {
    bookTitle: "Book 2",
    bookAuthor: "Author 2",
    bookDescription: "Description 2",
  },
  {
    bookTitle: "Book 3",
    bookAuthor: "Author 3",
    bookDescription: "Description 3",
  },

];

const HomePage: React.FC = () => {
  return (
    <Grid container justifyContent="center" spacing={3} className="book-list">
      {books.map((book, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card className="book-card">
            <CardContent>
              <Typography variant="h5" component="h2" className="book-title">
                {book.bookTitle}
              </Typography>
              <Typography className="book-author">{book.bookAuthor}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
export default HomePage;
