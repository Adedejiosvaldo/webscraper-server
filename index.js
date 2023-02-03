const puppeteer = require("puppeteer");
const express = require("express");
const scraper = require("./JumiaIndex");
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.get("/api/jumia", async (req, res) => {
  console.debug("IT begins");
  try {
    const jumiaData = async () => {
      console.log("Launching");
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto("https://www.jumia.com");

      console.log("Function");
      const categories = await page.$$eval(".crs .itm.-pvs._v", (elements) =>
        elements.map((e) => ({
          title: e.querySelector("p.-maxs.-fs14.-elli2").innerText,
          URL: e.querySelector("a.-fw.-rad4.-hov-e-2").href,
          imageURL: e.querySelector("img.-rad4").getAttribute("data-src"),
        }))
      );
      //   console.log(categories);
      //   console.log("Returning");
      console.debug("Returning");
      await browser.close();
      return categories;
    };
    console.log("callFunction 2");
    const data = await jumiaData();
    res.send(data);
    // console.log(data);
  } catch (error) {
    console.debug("ErrorFound");

    res.status(400).send(error);
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log("Port");
});
