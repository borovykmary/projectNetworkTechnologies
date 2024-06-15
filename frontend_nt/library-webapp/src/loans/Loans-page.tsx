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
import { useTranslation } from "react-i18next";

const LoansPage: React.FC = () => {
  const [loans, setLoans] = useState<Loans[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<Loans | null>(null);
  const [review, setReview] = useState({ comment: "", rating: 0 });
  const { t } = useTranslation();

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
    const userConfirmation = window.confirm(t("alert22"));
    if (userConfirmation) {
      const response = await apiClient.returnBook(loanId);
      if (response.status === 200) {
        alert(t("alert23"));
      } else {
        alert(t("alert24"));
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
        alert(t("alert25"));
      } else if (response.status === 409) {
        alert(t("alert26"));
      } else {
        alert(t("alert27"));
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
                    {t("status")}: {loan.status}
                  </Typography>
                </CardContent>

                <Accordion className="details-accordion">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>{t("borrowing-details")}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="subtitle1" color="text.secondary">
                      {t("borrowing-details")}: {loan.loanDate}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {t("due-date")}: {loan.dueDate}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {t("return-date")}: {loan.returnDate}
                    </Typography>
                    <Button
                      onClick={() => handleReturn(loan.loanId)}
                      variant="outlined"
                      disabled={loan.status !== "BORROWED"}
                    >
                      {t("return-book")}
                    </Button>
                    <Button
                      onClick={() => handleOpenAddReview(loan)}
                      variant="outlined"
                    >
                      {t("add-review")}
                    </Button>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          </Card>
        );
      })}

      <Dialog open={open} onClose={handleCloseAddReview}>
        <DialogTitle>{t("add-review")}</DialogTitle>
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
          <Button onClick={handleCloseAddReview}>{t("close")}</Button>
          <Button onClick={handleReviewSubmit}>{t("submit")}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LoansPage;
