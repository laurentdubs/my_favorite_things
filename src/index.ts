import express from "express";
import nunjucks from "nunjucks";

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

type Book = {
  name: string;
  author: string;
  year: string;
};
type Books = Book[];

const myBooks: Book[] = [
  {
    name: "Da Vinci Code",
    author: "Dan Brown",
    year: "2003",
  },

  {
    name: "Anges et Démons",
    author: "Dan Brown",
    year: "2000",
  },

  {
    name: "Inferno",
    author: "Dan Brown",
    year: "2013",
  },
];
app.set("view engine", "njk");

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.render("home", { myBooks });
});

app.get("/books/:bookName", (request, response) => {
  const routeParameters = request.params;
  const findBook = myBooks.find((book) => book.name === routeParameters.bookName);
  if (findBook) {
    response.render("book details", { bookName: routeParameters.bookName });
  } else {
    response.status(404).render("not-found", { error: "Book no found" });
  }
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
