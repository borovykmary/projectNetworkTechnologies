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
    rating: 3,
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
    rating: 4,
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
    rating: 3.5,
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
    rating: 4,
  },
  {
    isbn: "9780547928227",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    publisher: "Houghton Mifflin Harcourt",
    yearPublished: 1937,
    availableCopies: 45,
    genre: "Fantasy",
    summary: "Bilbo Baggins embarks on an adventure with dwarves.",
    coverImageUrl:
      "https://images-na.ssl-images-amazon.com/images/I/51EstVXM1UL._SX331_BO1,204,203,200_.jpg",
    rating: 4.5,
  },
  {
    isbn: "9780064471831",
    title: "The Golden Compass",
    author: "Philip Pullman",
    publisher: "Scholastic Point",
    yearPublished: 1995,
    availableCopies: 30,
    genre: "Fantasy",
    summary: "Lyra Belacqua's journey to the Arctic.",
    coverImageUrl:
      "https://m.media-amazon.com/images/I/91KDVcPx-mL._SY522_.jpg",
    rating: 4,
  },
  {
    isbn: "9780060530945",
    title: "American Gods",
    author: "Neil Gaiman",
    publisher: "William Morrow Paperbacks",
    yearPublished: 2001,
    availableCopies: 35,
    genre: "Fantasy",
    summary: "Shadow Moon gets mixed up with the gods.",
    coverImageUrl:
      "https://images-na.ssl-images-amazon.com/images/I/61Iz2yy2CKL.jpg",
    rating: 5,
  },
  {
    isbn: "9780007448036",
    title: "A Game of Thrones",
    author: "George R.R. Martin",
    publisher: "Harper Voyager",
    yearPublished: 1996,
    availableCopies: 40,
    genre: "Fantasy",
    summary: "The fight for the Iron Throne begins.",
    coverImageUrl:
      "https://m.media-amazon.com/images/I/71P+4DslKmL._SY522_.jpg",
    rating: 5.5,
  },
  {
    isbn: "9780345350497",
    title: "Foundation",
    author: "Isaac Asimov",
    publisher: "Bantam",
    yearPublished: 1951,
    availableCopies: 30,
    genre: "Sci-Fi",
    summary:
      "A mathematician uses the science of psychohistory to predict the future of civilization.",
    coverImageUrl:
      "https://ryanyarber.files.wordpress.com/2021/05/the-foundation-trilogy.jpg",
    rating: 3,
  },
  {
    isbn: "9780525952920",
    title: "Gone Girl",
    author: "Gillian Flynn",
    publisher: "Crown",
    yearPublished: 2012,
    availableCopies: 20,
    genre: "Thriller",
    summary:
      "A woman's disappearance creates a media frenzy and suspicions about her husband's involvement.",
    coverImageUrl:
      "https://m.media-amazon.com/images/I/41bQ4uhDK1L._SY445_SX342_.jpg",
    rating: 2.5,
  },
  {
    isbn: "9780316430698",
    title: "The Notebook",
    author: "Nicholas Sparks",
    publisher: "Grand Central Publishing",
    yearPublished: 1996,
    availableCopies: 25,
    genre: "Romance",
    summary:
      "A man reads from his notebook to a woman with Alzheimer's, telling a story of love that has lasted for decades.",
    coverImageUrl:
      "https://i.ebayimg.com/images/g/P8AAAOSwt4Ra9HJa/s-l1600.webp",
    rating: 2.5,
  },
  {
    isbn: "9780441569595",
    title: "Neuromancer",
    author: "William Gibson",
    publisher: "Ace",
    yearPublished: 1984,
    availableCopies: 15,
    genre: "Sci-Fi",
    summary:
      "A washed-up computer hacker is hired by a mysterious employer to pull off the ultimate hack.",
    coverImageUrl:
      "https://images-na.ssl-images-amazon.com/images/I/51ojzN10rHL.jpg",
    rating: 4,
  },
  {
    isbn: "9780312853235",
    title: "Jurassic Park",
    author: "Michael Crichton",
    publisher: "Ballantine Books",
    yearPublished: 1990,
    availableCopies: 20,
    genre: "Thriller",
    summary:
      "A theme park suffers a major power breakdown that allows its cloned dinosaur exhibits to run amok.",
    coverImageUrl:
      "http://agentpalmer.com/wp-content/uploads/2014/05/Jurassic-Park-book-cover.jpg",
    rating: 4,
  },
  {
    isbn: "9780062024022",
    title: "The Fault in Our Stars",
    author: "John Green",
    publisher: "Dutton Books",
    yearPublished: 2012,
    availableCopies: 30,
    genre: "Romance",
    summary:
      "Two teenagers with life-threatening illnesses meet in a cancer support group and fall in love.",
    coverImageUrl: "https://m.media-amazon.com/images/I/51o5dnjk07L.jpg",
    rating: 3.5,
  },
  {
    isbn: "9780345803508",
    title: "Love in the Highlands",
    author: "Isabella Sinclair",
    publisher: "Random House",
    yearPublished: 2023,
    availableCopies: 25,
    genre: "Romance",
    summary:
      "In the misty Scottish Highlands, a forbidden love blossoms between a spirited lass and a brooding laird, testing loyalties and kindling passions that cannot be denied.",
    coverImageUrl: "https://images.randomhouse.com/cover/9780345803508",
    rating: 3,
  },
  {
    isbn: "9780062273203",
    title: "Summer Breeze",
    author: "Olivia Rivers",
    publisher: "HarperCollins",
    yearPublished: 2024,
    availableCopies: 30,
    genre: "Romance",
    summary:
      "Amidst the sun-kissed shores of a seaside town, a chance encounter ignites a summer romance, but secrets lurk beneath the surface, threatening to extinguish the flame.",
    coverImageUrl:
      "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781665922074/the-summer-i-turned-pretty-9781665922074_lg.jpg",
    rating: 4.5,
  },
];

const genres = ["Fantasy", "Sci-Fi", "Thriller", "Romance"];
const sortedBooks = books.sort((a, b) => b.rating - a.rating).slice(0, 4);

const HomePage: React.FC = () => {
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
