const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {
  isLoggedIn,
  isOwner,
  validateListing,
  countryList,
} = require("../middleware.js");
const listingController = require("../controller/listing.js");
const multer = require("multer");
const { storage, cloudinary } = require("../cloudConfig.js");
const upload = multer({ storage });

// Index route
router
  .route("/")
  .get(wrapAsync(listingController.index)) //view listing
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.newFunc)
  ); // New route (CRUD: create)

// new listing form
router.get("/new", isLoggedIn, listingController.newForm);

//edit form
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editForm)
);

// Show route (CRUD: read)
router
  .route("/:id")
  .get(wrapAsync(listingController.show))
  .put(
    // Update route (CRUD: update)
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.editFunc)
  )
  .delete(
    // Delete route (CRUD: delete)
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.deleteFunc)
  );

// search page redirect
// router.route("/filter/search/:q").get((req, res) => {
//   let query = req.params;
//   console.log(req.params);
//   res.render("listings/search.ejs", query);
// });
router.route("/filter/search").get(listingController.searchFunc);

module.exports = router;
