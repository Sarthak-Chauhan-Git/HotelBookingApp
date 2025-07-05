// Credential imports
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const Listing = require("../models/Listing");
const getCoordinates = require("../utils/geocode.js");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  const countryList = [
    ...new Set(allListings.map((listing) => listing.country)),
  ];
  res.render("listings/index.ejs", { allListings, countryList });
};

module.exports.newForm = async (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.newFunc = async (req, res) => {
  if (!req.file) {
    req.flash("error", "File upload failed or no file uploaded.");
    return res.redirect("/listings/new");
  }
  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  const { lat, lng } = await getCoordinates(
    `${newListing.location}, ${newListing.country}`
  );
  newListing.geometry = {
    type: "Point",
    coordinates: [lng, lat],
  };
  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.show = async (req, res, next) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing does not exist!");
    return res.redirect("/listings");
  }
  const allListings = await Listing.find({});
  const countryList = [
    ...new Set(allListings.map((listing) => listing.country)),
  ];
  const lng = listing.geometry.coordinates[0];
  const lat = listing.geometry.coordinates[1];
  res.render("listings/show.ejs", {
    countryList,
    listing,
    lat,
    lng,
    MAPTILER_KEY: process.env.MAPTILER_KEY,
  });
};

module.exports.editForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing does not exist!");
    return res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  let lowDimensionalUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listing, lowDimensionalUrl });
};

module.exports.editFunc = async (req, res) => {
  let { id } = req.params;
  let editedListing = await Listing.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    { runValidators: true, new: true }
  );
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    editedListing.image = { url, filename };
    await editedListing.save();
  }
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteFunc = async (req, res) => {
  const { id } = req.params;
  let listing = await Listing.findByIdAndDelete(id);
  console.log(listing);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};

module.exports.searchFunc = async (req, res, next) => {
  const { area, country } = req.query;
  let allListings = await Listing.find({});
  let searchedList = [];
  const countryList = [
    ...new Set(allListings.map((listing) => listing.country)),
  ];
  for (let listing of allListings) {
    const commaSeparatedLocations = listing.location
      .toLowerCase()
      .split(",")
      .map((part) => part.trim());
    const spaceSeparatedLocations = listing.location
      .toLowerCase()
      .split(" ")
      .map((part) => part.trim());
    const areaLocationSplit = area
      ? area
          .toLowerCase()
          .split(" ")
          .map((part) => part.trim())
      : [];

    //check matching conditions
    const matchCountry = !country || listing.country === country;
    if (!area && matchCountry) {
      searchedList.push(listing);
      continue;
    }
    const matchComma = areaLocationSplit.some((q) =>
      commaSeparatedLocations.includes(q)
    );
    const matchSpace = areaLocationSplit.some((q) =>
      spaceSeparatedLocations.includes(q)
    );
    //push to list
    if ((matchComma || matchSpace) && matchCountry) {
      searchedList.push(listing);
    }
  }
  res.render("listings/search.ejs", { area, searchedList, countryList, country, area });
};
