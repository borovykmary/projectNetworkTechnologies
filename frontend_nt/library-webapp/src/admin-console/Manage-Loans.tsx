import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./ManageLoans.css";

interface Loan {
  loanId: number;
  coverImageUrl: string;
  status: string;
  dueDate: string;
  loanDate: string;
  returnDate: string;
  bookDetails: {
    title: string;
    author: string;
  };
}

const loans: Loan[] = [
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

const ManageLoans: React.FC = () => {
  const handleReturn = (id: number) => {
    console.log(`Return book with id ${id}`);
    // Implement return logic here
  };

  return (
    <div className="manage-loans">
      <h2>Manage Loans</h2>
      {loans.map((loan) => (
        <Card key={loan.loanId} className="loan-card">
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={loan.coverImageUrl}
            alt="Book cover"
          />
          <CardContent className="loan-info">
            <Typography variant="h5">{loan.bookDetails.title}</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {loan.bookDetails.author}
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
                Due Date: {loan.dueDate}
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

export default ManageLoans;
