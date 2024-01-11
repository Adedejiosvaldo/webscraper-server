const connectToDb = require("./db/connect");
const app = require("./index");
const PORT = process.env.PORT || 3000;
const dotenv = require("dotenv");
dotenv.config();

const DB = process.env.DATABASE_URL.replace("<Password>", process.env.PASSWORD);

connectToDb(DB);

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
