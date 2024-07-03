const mongoose = require("mongoose");

const connectToDb = async (url: string) => {
  await mongoose.connect(url, {});
  // .then(() => console.log("DB connection successful!"));
};

export default connectToDb;
