const express = require("express");
const scraper = require("./JumiaIndex");
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Webscraper");
});

app.get("/api/jumia", async (req, res) => {
  const scrapedJumiaCourses = await scraper.jumiaData.catch((err) => {
    console.error("err:", err);
  });
  if (!scrapedJumiaCourses) res.status(400).send("Error From Your End");
  res.send(scrapedJumiaCourses);
});

app.listen(PORT, () => {
  //   console.log("Port");
});
