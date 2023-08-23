const mongoose = require("mongoose");
const bookModel = require("../models/bookModel");

const isValid = function (x) {
  if (typeof x === "undefined" || x === null) return false;
  if (typeof x !== "string") return false;
  if (typeof x === "string" && x.trim().length === 0) return false;
  return true;
};

const isValidBody = function (y) {
  return Object.keys(y).length > 0;
};

function validateYear(year) {
  const yearRegex = /^(19|20)\d{2}$/;
  return typeof year === "number" && yearRegex.test(year.toString());
}

const createBook = async function (req, res) {
  try {
    const data = req.body;
    if (!isValidBody(data)) {
      return res
        .status(400)
        .send({ status: false, message: "Data can't be empty" });
    }

    const { title, author, publishedYear } = data;

    if (!title) {
      return res
        .status(400)
        .send({ status: false, message: "Title is required." });
    }
    if (!isValid(title))
      return res
        .status(400)
        .send({ status: false, message: "Please enter valid title" });

    if (!author) {
      return res
        .status(400)
        .send({ status: false, message: "Author is required." });
    }
    if (!isValid(author))
      return res
        .status(400)
        .send({ status: false, message: "Please enter valid Author Name" });

    if (!publishedYear) {
      return res
        .status(400)
        .send({ status: false, message: "PublishedYear is required." });
    }

    if (!validateYear(publishedYear)) {
      return res
        .status(400)
        .send({ status: false, message: "PublishedYear is Invalid." });
    }

    const newBookList = {
      title,
      author,
      publishedYear,
    };

    const createNewBook = await bookModel.create(newBookList);
    return res.status(201).send({
      status: true,
      message: "New Book created successfully",
      data: createNewBook,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, message: "Error", Error: err.message });
  }
};

const fetchAllBooks = async function (req, res) {
  try {
    const findAllBooks = await bookModel.find({});
    if (findAllBooks.length === 0) {
      return res
        .status(404)
        .send({ status: false, message: "No Book is Present" });
    }
    return res
      .status(200)
      .send({ status: true, message: "All Book List", data: findAllBooks });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, message: "Error", Error: err.message });
  }
};

const fetchSingleBook = async function (req, res) {
  try {
    const bookId = req.params.id;
    if (!bookId)
      return res
        .status(400)
        .send({ status: false, message: "Please provide bookId in params" });

    if (!mongoose.isValidObjectId(bookId))
      return res
        .status(400)
        .send({ status: false, message: "BookId is not valid" });

    const findBook = await bookModel.findOne({ _id: bookId });

    if (!findBook)
      return res
        .status(404)
        .send({ status: false, message: "No such book found" });

    return res
      .status(200)
      .send({
        status: true,
        message: "Successfully Book Found!",
        bookData: findBook,
      });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, message: "Error", Error: err.message });
  }
};

const updateBook = async function (req, res) {
  try {
    const data = req.body;
    const bookId = req.params.id;
    if (!bookId)
      return res
        .status(400)
        .send({ status: false, message: "Please provide bookId in params" });

    if (!mongoose.isValidObjectId(bookId))
      return res
        .status(400)
        .send({ status: false, message: "BookId is not valid" });

    if (!isValidBody(data)) {
      return res
        .status(400)
        .send({ status: false, message: "Data can't be empty" });
    }

    const { title, author, publishedYear } = data;
    let updatedData = {};

    if (title) {
      if (!isValid(title))
        return res
          .status(400)
          .send({ status: false, message: "Please enter valid title" });
      updatedData.title = title;
    }

    if (author) {
      if (!isValid(author))
        return res
          .status(400)
          .send({ status: false, message: "Please enter valid Author Name" });

      updatedData.author = author;
    }

    if (publishedYear) {
      if (!validateYear(publishedYear)) {
        return res
          .status(400)
          .send({ status: false, message: "PublishedYear is Invalid." });
      }
      updatedData.publishedYear = publishedYear;
    }

    const updatedBook = await bookModel.findOneAndUpdate(
      { _id: bookId },
      updatedData,
      { new: true }
    );
    return res.status(200).send({
      status: true,
      message: "Book updated Successfully",
      data: updatedBook,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, message: "Error", Error: err.message });
  }
};

const deleteBook = async function (req, res) {
  try {
    const bookId = req.params.id;
    if (!bookId)
      return res
        .status(400)
        .send({ status: false, message: "Please provide bookId in params" });

    if (!mongoose.isValidObjectId(bookId))
      return res
        .status(400)
        .send({ status: false, message: "BookId is not valid" });

    const findDeletedBook = await bookModel.findOne({ _id: bookId });

    if (!findDeletedBook)
      return res
        .status(404)
        .send({ status: false, message: "No such book found" });

    if (findDeletedBook.isDeleted === true) {
      return res
        .status(404)
        .send({ status: false, message: "Book Already Deleted!" });
    }

    await bookModel.findOneAndUpdate(
      { _id: bookId },
      { isDeleted: true, deletedAt: Date.now() },
      { new: true }
    );
    return res
      .status(200)
      .send({ status: true, message: "successfully deleted Book" });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, message: "Error", Error: err.message });
  }
};

module.exports = {
  createBook,
  fetchAllBooks,
  fetchSingleBook,
  updateBook,
  deleteBook,
};
