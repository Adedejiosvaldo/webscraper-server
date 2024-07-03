import { createDataIntoModel } from "../controllers/jumia";
import Jumia from "../model/Jumia";
import cron from "node-cron";
// Define executeCronJob to manage cron jobs based on some condition
const executeCronJob = () => {
  const RUN_CRON_JOB = true; // This could be dynamically set based on some external configuration

  if (RUN_CRON_JOB) {
    // Schedule the job to run every 5 minutes
    cron.schedule("0 0 * * *", async () => {
      try {
        console.log("Running the task at 12-AM.");
        const scrappedData = await createDataIntoModel(); // Replace with the actual code to create data in your model

        await Jumia.create(scrappedData);
        console.log("Successfully scrapped and uploaded");
      } catch (error) {
        console.log(error);
      }
    });

    cron.schedule("55 23 * * *", async () => {
      console.log("Deleting the existing data at 11:55pm everyday.");
      try {
        await Jumia.deleteMany();
      } catch (error) {
        console.log(error);
      }
    });
  } else {
    console.log("Cron jobs are disabled.");
  }
};

export { executeCronJob };
