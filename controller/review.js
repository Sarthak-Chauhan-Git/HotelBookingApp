const Review = require("../models/review.js");
const Listing = require("../models/Listing.js");

module.exports.newReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }

    // 1) Build the review
    const review = new Review(req.body.review);
    review.author = req.user._id;
    await review.save();

    // 2) Link it & save parent
    listing.reviews.push(review._id);
    await listing.save();

    req.flash("success", "Review added!");
    res.redirect(`/listings/${id}`);
  } catch (e) {
    console.error("Error in newReview:", e);
    next(e);
  }
};


module.exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted!");
  res.redirect(`/listings/${id}`);
};
