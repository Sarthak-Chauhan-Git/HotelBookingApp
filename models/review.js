const { number } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  rating: {
    type: Number,
    required: [true, "Rating is required"],
    min: 1,
    max: 5,
    validate: {
      validator: Number.isInteger,
      message: "Rating must be an integer"
    }
  },
  comment: {
    type: String,
    required: [true, "Comment is required"],
    trim: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Review", reviewSchema);
