// Credential imports
if(process.env.NODE_ENV != "production"){
  require("dotenv").config();
}

// Imports
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRoute = require("./routes/listingRoute.js");
const reviewRoute = require("./routes/reviewRoute.js");
const userRoute = require("./routes/userRoute.js");

// Basic setup for imports
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_METHOD"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// Connect database
const ATLAS_URL = process.env.ATLAS_URL;
main()
  .then((res) => {
    console.log("Database connection succeded");
  })
  .catch((e) => {
    console.log(e);
  });
async function main() {
  await mongoose.connect(ATLAS_URL);
}

// Session setup
const store = MongoStore.create({
  mongoUrl: ATLAS_URL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24*3600,
});

store.on("error", (err)=>{
  console.log("Error in store", err);
})

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, 
  },
};


app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next(); 
});

// Start server

app.listen(8080, () => {
  console.log("Server listning on port 8080");
});

// Routes setup
app.use("/listings", listingRoute);
app.use("/listings/:id/reviews", reviewRoute);
app.use("/", userRoute);

// Error handling
app.all("*wildcard", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Some error" } = err;
  try {
    res.status(statusCode).render("error.ejs", { message });
  } catch (e) {
    res.status(500).send("Critical Error: Couldn't render error page");
  }
});




