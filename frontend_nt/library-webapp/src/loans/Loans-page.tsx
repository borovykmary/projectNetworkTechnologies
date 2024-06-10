import React from "react";
import "./Loans-page.css";
import {
  AppBar,
  Toolbar,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import { useEffect, useState } from "react";
import { Loans } from "../api/Loans";
import { useApi } from "../api/ApiProvide";
import { Book } from "../api/Book";
import { BookDetails } from "../api/BookDetails";
import AppBarUser from "../components/AppBarUser";

const LoansPage: React.FC = () => {
  const [loans, setLoans] = useState<Loans[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const apiClient = useApi();

  useEffect(() => {
    const fetchLoans = async () => {
      const [loansResponse, booksResponse] = await Promise.all([
        apiClient.getAllLoansUser(),
        apiClient.getBooks(),
      ]);

      if (loansResponse.success && booksResponse.success) {
        const bookDetailsPromises = loansResponse.data.map((loan: Loans) =>
          apiClient.getBookDetails(
            typeof loan.bookId === "number" ? loan.bookId : -1,
          ),
        );
        const bookDetailsResponses = await Promise.all(bookDetailsPromises);

        const mappedLoans = loansResponse.data.map(
          (loan: Loans, index: number) => {
            const book = booksResponse.data.find(
              (book: Book) => book.id === loan.bookId,
            );
            const bookDetail = bookDetailsResponses[index].data;

            // If the book was found, add the coverImageURL to it

            book.coverImageUrl = bookDetail?.coverImageUrl;

            console.log(book);
            return {
              ...loan,
              coverImageUrl: bookDetail?.coverImageUrl,
              title: book?.title,
              author: book?.author,
            };
          },
        );

        setLoans(mappedLoans);
        setBooks(booksResponse.data);
      }
    };

    fetchLoans();
  }, [apiClient]);
  const handleReturn = (id: number) => {
    console.log(`Return book with id ${id}`);
  };
  const handleAddReview = (id: number) => {
    console.log(`Add review for book with id ${id}`);
  };
  const navigate = useNavigate();
  return (
    <div>
      <AppBarUser />
      {loans.map((loan) => {
        const book = books.find((book) => book.id === loan.bookId);
        return (
          <Card
            key={loan.loanId}
            className="loan-card"
            sx={{ width: "80%", margin: "0 auto", marginBottom: 2 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <CardMedia
                  className="book-cover"
                  component="img"
                  sx={{ width: 200 }}
                  image={book?.coverImageUrl}
                  alt="Book cover"
                />
              </Grid>
              <Grid item xs={12} sm={9}>
                <CardContent className="loan-info">
                  <Typography className="book-title-loan" variant="h5">
                    {book?.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {book?.author}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Status: {loan.status}
                  </Typography>
                </CardContent>

                <Accordion className="details-accordion">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Borrowing Details</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="subtitle1" color="text.secondary">
                      Borrowed: {loan.loanDate}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      Due date: {loan.dueDate}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      Return: {loan.returnDate}
                    </Typography>
                    <Button
                      onClick={() => handleReturn(loan.loanId)}
                      variant="outlined"
                      disabled={loan.returnDate.trim() !== ""}
                    >
                      Return
                    </Button>
                    <Button
                      onClick={() => handleAddReview(loan.loanId)}
                      variant="outlined"
                    >
                      Add Review
                    </Button>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          </Card>
        );
      })}
    </div>
  );
};

export default LoansPage;
