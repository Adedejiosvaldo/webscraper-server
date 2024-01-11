require("express-async-errors");

const express = require("express");
const cors = require("cors");
const jumiaRoute = require("./routes/jumia");
const app = express();

app.use(cors());

app.use("/api/v1/products", jumiaRoute);

app.get("/", (req, res) => {
  res.json({ msg: "success", location: "Homepage" });
});


module.exports = app
