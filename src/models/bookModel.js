const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    author: {
      type: String,
      trim: true,
    },
    publishedYear: {
      type: Number,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
