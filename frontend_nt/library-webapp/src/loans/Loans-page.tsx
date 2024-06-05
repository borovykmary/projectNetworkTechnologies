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

const LoansPage: React.FC = () => {
  const [loans, setLoans] = useState<Loans[]>([]);
  const apiClient = useApi();

  useEffect(() => {
    const fetchLoans = async () => {
      const loansResponse = await apiClient.getAllLoansUser();
      if (loansResponse.success) {
        const fetchedLoans: Loans[] = loansResponse.data;
        const promises = fetchedLoans.map(async (loan: Loans) => {
          console.log("Fetching details for loan:", loan.bookId);
          const bookResponse = await apiClient.getBook(loan.bookId);
          console.log("Book response:", bookResponse);
          const detailsResponse = await apiClient.getBookDetails(loan.bookId);
          console.log("Details response:", detailsResponse);

          if (bookResponse.success) {
            return {
              ...loan,
              book: { ...bookResponse.data, ...detailsResponse.data },
            };
          } else {
            console.error(
              "Failed to fetch details for loan:",
              loan.loanId,
              bookResponse.data,
              detailsResponse.data,
            );
            return {
              ...loan,
              title: "No data",
              author: "No data",
              coverImageUrl:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNT0xwyLstvC7wH8jYIKur3GTcSq-g6fj2EbL4wk-qaONHYjBswa3rpFsZJeEjuXcG-lw&usqp=CAU",
            };
          }
        });
        const loansWithDetails = await Promise.all(promises);
        setLoans(loansWithDetails);
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
      {loans.map((loan) => (
        <Card
          key={loan.loanId}
          className="loan-card"
          sx={{ width: "80%", margin: "0 auto" }}
        >
          <CardMedia
            component="img"
            sx={{ width: 100 }}
            image={loan.coverImageUrl}
            alt="Book cover"
          />
          <CardContent className="loan-info">
            <Typography variant="h5">{loan.title}</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {loan.author}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Status: {loan.status}
            </Typography>
          </CardContent>

          <Accordion className="details-accordion" defaultExpanded>
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
        </Card>
      ))}
    </div>
  );
};

export default LoansPage;
