const puppeteer = require("puppeteer");
const express = require("express");
const scraper = require("./JumiaIndex");
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.get("/api/jumia", async (req, res) => {
  try {
    const jumiaData = async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto("https://www.jumia.com", { waitUntil: "networkidle0" });

      const categories = await page.$$eval(".crs .itm.-pvs._v", (elements) =>
        elements.map((e) => ({
          title: e.querySelector("p.-maxs.-fs14.-elli2").innerText,
          URL: e.querySelector("a.-fw.-rad4.-hov-e-2").href,
          imageURL: e.querySelector("img.-rad4").getAttribute("data-src"),
        }))
      );

      await browser.close();
      return categories;
    };
    const data = await jumiaData();
    res.send(data);
  } catch (error) {
    res.send(error);
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
  //   console.log("Port");
});
