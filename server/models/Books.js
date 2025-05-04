import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      required: true,
    },
    publishedDate: { type: Date, required: true },
    genre: {
      type: String,
      required: true,
    },
    pageCount: {
      type: Number,
      min: 1,
    },
    publisher: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      set: (v) => Math.round(v * 10) / 10,
    },
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model("Book", bookSchema);
