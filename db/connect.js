const mongoose = require("mongoose");

const connectToDb = (url) => {
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("DB connection successful!"));
};

module.exports = connectToDb;
