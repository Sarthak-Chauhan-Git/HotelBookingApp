const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isReviewAuthor, validateReview} = require("../middleware.js");
const reviewController = require("../controller/review.js");

// Add reviews route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.newReview)
);

// Delete review route
router.delete("/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.deleteReview));

module.exports = router;