const express = require("express");
const scraper = require("./JumiaIndex");
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.get("/api/jumia", async (req, res) => {
  try {
    const scrapedJumiaCourses = await scraper.jumiaData();
    res.send(scrapedJumiaCourses);
    console.log(scrapedJumiaCourses);
  } catch (error) {
    throw error;
  }

  //   const scrapedJumiaCourses = new Promise((resolve, reject) => {
  //     scraper
  //       .jumiaData()
  //       .then((data) => resolve(data))
  //       .catch((err) => reject("Jumia Scraping Failed"));
  //   });
  //   console.log(scrapedJumiaCourses);
  //   Promise.all([scrapedJumiaCourses])
  //     .then((data) => {
  //       console.log("Then");
  //       console.log(data);
  //       res.send(data);
  //     })
  //     .catch((err) => {
  //       console.log("Catch");
  //       res.status(500).send(err);
  //     });
});

app.listen(PORT, () => {
  console.log("Port");
});
