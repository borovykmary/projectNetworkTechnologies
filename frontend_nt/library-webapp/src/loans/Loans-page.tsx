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
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
/>;

const loans = [
  {
    loanId: 1,
    coverImageUrl:
      "https://media.harrypotterfanzone.com/sorcerers-stone-us-childrens-edition.jpg",
    status: "Borrowed",
    dueDate: "2022-01-31",
    loanDate: "2022-01-01",
    returnDate: "2022-01-31",
    bookDetails: { title: "Philosopher's Stone", author: "J.K. Rowling" },
  },
  {
    loanId: 2,
    coverImageUrl:
      "https://media.harrypotterfanzone.com/chamber-of-secrets-uk-childrens-edition-2014.jpg",
    status: "Borrowed",
    loanDate: "2022-02-01",
    dueDate: "2022-02-28",
    returnDate: "2022-02-28",
    bookDetails: { title: "Chamber of Secrets", author: "J.K. Rowling" },
  },
  {
    loanId: 3,
    coverImageUrl: "https://images.penguinrandomhouse.com/cover/9780439139601",
    status: "Borrowed",
    dueDate: "2022-03-31",
    loanDate: "2022-03-01",
    returnDate: "2022-03-31",
    bookDetails: { title: "Prisoner of Azkaban", author: "J.K. Rowling" },
  },
  {
    loanId: 4,
    coverImageUrl: "https://images.penguinrandomhouse.com/cover/9780439139595",
    status: "Borrowed",
    dueDate: "2022-04-30",
    loanDate: "2022-04-01",
    returnDate: "2022-04-30",
    bookDetails: { title: "Goblet of Fire", author: "J.K. Rowling" },
  },
];

const LoansPage: React.FC = () => {
  const handleReturn = (id: number) => {
    console.log(`Return book with id ${id}`);
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
        <Card key={loan.loanId} className="loan-card">
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={loan.coverImageUrl}
            alt="Book cover"
          />
          <CardContent className="loan-info">
            <Typography variant="h5">{loan.bookDetails["title"]}</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {loan.bookDetails["author"]}
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
                Return: {loan.returnDate}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Due date: {loan.dueDate}
              </Typography>
              <Button
                onClick={() => handleReturn(loan.loanId)}
                variant="outlined"
              >
                Return
              </Button>
            </AccordionDetails>
          </Accordion>
        </Card>
      ))}
    </div>
  );
};

export default LoansPage;
