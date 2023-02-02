const puppeteer = require("puppeteer");

const scrapeJumia = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page
    .goto("https://www.jumia.com", { waitUntil: "networkidle0" })
    .catch((error) => console.log("Error:", error));

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

module.exports.jumiaData = scrapeJumia;
