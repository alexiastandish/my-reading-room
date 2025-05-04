import mongoose from "mongoose";

const magazineSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    frequency: {
      type: String,
      required: true,
    },
    circulation: {
      type: String,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Magazine = mongoose.model("Magazine", magazineSchema);
