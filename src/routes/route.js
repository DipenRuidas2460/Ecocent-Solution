const express = require("express");
const {
  createBook,
  updateBook,
  deleteBook,
  fetchAllBooks,
  fetchSingleBook,
} = require("../controllers/bookController");
const router = express.Router();

router.post("/books", createBook);
router.get("/books", fetchAllBooks);
router.get("/books/:id", fetchSingleBook);
router.put("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);

module.exports = router;
