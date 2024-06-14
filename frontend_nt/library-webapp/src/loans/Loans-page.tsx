import React from "react";
import "./Loans-page.css";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Rating,
  DialogActions,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { Loans } from "../api/Loans";
import { useApi } from "../api/ApiProvide";
import { Book } from "../api/Book";
import AppBarUser from "../components/AppBarUser";
import { GetReviewDto } from "../api/get-review.dto";

const LoansPage: React.FC = () => {
  const [loans, setLoans] = useState<Loans[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<Loans | null>(null);
  const [review, setReview] = useState({ comment: "", rating: 0 });

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
  const handleReturn = async (loanId: number) => {
    const userConfirmation = window.confirm(
      "Are you sure you want to return this book?",
    );
    if (userConfirmation) {
      const response = await apiClient.returnBook(loanId);
      if (response.status === 200) {
        alert("Book return was requested");
      } else {
        alert("Failed to request book return");
      }
    }
  };

  const handleOpenAddReview = (loan: Loans) => {
    setSelectedLoan(loan);
    setOpen(true);
  };
  const handleCloseAddReview = () => {
    setOpen(false);
  };
  const handleReviewSubmit = async () => {
    if (selectedLoan) {
      const today = new Date();
      const reviewDate = today.toISOString().split("T")[0];
      const reviewDto = {
        comment: review.comment,
        rating: review.rating,
        reviewDate: reviewDate,
      };
      const response = await apiClient.addReview(
        reviewDto,
        selectedLoan.bookId,
      );
      if (response.success) {
        alert("Review added successfully");
      } else if (response.status === 409) {
        alert("You can only add one review per book.");
      } else {
        alert("Failed to add review");
      }
    }
    handleCloseAddReview();
  };

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
                      disabled={loan.status !== "BORROWED"}
                    >
                      Return
                    </Button>
                    <Button
                      onClick={() => handleOpenAddReview(loan)}
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

      <Dialog open={open} onClose={handleCloseAddReview}>
        <DialogTitle>Add Review</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Comment"
            type="text"
            fullWidth
            value={review.comment}
            onChange={(e) => setReview({ ...review, comment: e.target.value })}
          />
          <Rating
            name="simple-controlled"
            value={review.rating}
            onChange={(event, newValue) => {
              setReview({ ...review, rating: newValue as number });
            }}
            precision={0.5}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddReview}>Close</Button>
          <Button onClick={handleReviewSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LoansPage;
