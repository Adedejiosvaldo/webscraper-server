require("express-async-errors");

const express = require("express");
const cors = require("cors");
const jumiaRoute = require("./routes/jumia");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

app.use("/api/v1/products", jumiaRoute);
app.use(express.json);

app.get("/", (req, res) => {
  res.json({ msg: "success", location: "Homepage" });
});

app.listen(PORT, () => {
  console.log("Port");
});
