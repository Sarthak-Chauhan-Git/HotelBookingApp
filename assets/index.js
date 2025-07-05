const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/Listing.js");

// Connect database
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main().then((res)=>{
    console.log("Database connection succeded");
})
.catch((e)=>{
    console.log(e);
});
async function main() {
    await mongoose.connect(MONGO_URL);
};

const initDB = async () => {
  await Listing.deleteMany({});
  const seedData = initData.map((obj) => ({
    ...obj,
    owner: "685e1570ed2bf79e90c3d4dd",
  }));
  await Listing.insertMany(seedData);
  console.log("data was initialized");
};

initDB();




