import { Response, Request } from "express";
import puppeteer from "puppeteer";
import Jumia from "../model/Jumia";
import { getAll } from "./handlerFactory";
const createDataIntoModel = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.jumia.com.ng");

    const categories = await page.$$eval(
      ".col16.-pvs .card.-oh._fw.-rad4  .crs-w._main.-phxs .crs.row._no-g.-fw-nw._6cl-4cm.-pvxs .itm.col",
      (elements: any[]) =>
        elements.map((e) => {
          const titleElement = e.querySelector(".prd._box._hvr .name");
          const stkElement = e.querySelector(".stk");
          const bdgElement = e.querySelector(".bdg._dsct");
          const coreElement = e.querySelector(".prd._box._hvr .core");
          const imgElement = e.querySelector(".img");
          const prcElement = e.querySelector(".prc");

          const priceString = prcElement ? prcElement.innerText : "N/A";
          const price = new Intl.NumberFormat().format(
            parseInt(priceString.replace(/[^0-9.]/g, ""))
          );
          // Format price into a readable form

          const parsedPrice = parseInt(price.replace(/[^\d.-]/g, ""));
          const formattedPrice = isNaN(parsedPrice) ? "N/A" : parsedPrice;

          return {
            title: titleElement ? titleElement.innerText : "N/A",
            itemsLeft: stkElement ? stkElement.innerText : "N/A",
            discountPrice: bdgElement ? bdgElement.innerText : "N/A",
            URL: coreElement ? coreElement.href : "N/A",
            imageURL: imgElement ? imgElement.getAttribute("data-src") : "N/A",
            price: formattedPrice,
          };
        })
    );
    // Remove non-numeric characters (excluding the currency symbol)
    await browser.close();
    return categories;
  } catch (error) {
    console.error("Error during scraping:", error);
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10; // Default limit to 10 items
  const skip = (page - 1) * limit;

  try {
    const allData = await Jumia.find().skip(skip).limit(limit);
    const total = await Jumia.countDocuments(); // Get total documents for pagination info

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      limit,
      data: allData,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error });
  }
};
// const getAllProducts = async (req, res) => {
//   const cat = await createDataIntoModel();
//   console.log(typeof cat[0].price);

//   res.status(200).json({ cat });
// };

// Schedule the job to run every 5 minutes

// cron.schedule("0 0 * * *", async () => {
//   try {
//     console.log("Running the task at 12-AM.");
//     const scrappedData = await createDataIntoModel(); // Replace with the actual code to create data in your model
//     await Jumia.create(scrappedData);
//     console.log("Successfully scrapped and upladed");
//   } catch (error) {
//     console.log(error);
//   }
// });

// cron.schedule("55 23 * * *", async () => {
//   console.log("Deleting the existing data at 11:55pm everyday.");
//   // Replace with the actual code to create data in your model
//   try {
//     await Jumia.deleteMany();
//   } catch (error) {
//     console.log(error);
//   }
// });

export { getAllProducts, createDataIntoModel };
// module.exports = { getAllProducts, createDataIntoModel };
