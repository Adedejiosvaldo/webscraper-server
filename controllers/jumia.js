const puppeteer = require("puppeteer");

const getAllProducts = async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.jumia.com.ng");
  const categories = await page.$$eval(
    ".col16.-pvs .card.-oh._fw.-rad4  .crs-w._main.-phxs .crs.row._no-g.-fw-nw._6cl-4cm.-pvxs .itm.col",
    (elements) =>
      elements.map((e) => ({
        title: e.querySelector(" .prd._box._hvr .name").innerText,
        URL: e.querySelector(".core").href,
        imageURL: e.querySelector(".img").getAttribute("data-src"),
      }))
  );
  await browser.close();
  await res.status(200).json({ numHit: categories.length, data: categories });
};

module.exports = { getAllProducts };
