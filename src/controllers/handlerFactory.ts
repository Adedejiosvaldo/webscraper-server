import { RequestHandler, Request, Response, NextFunction } from "express";
import { Model, Document } from "mongoose";

const APIFeatures = require("../utils/APIFeatures");
const APIErrors = require("../utils/ApiErrors");

const getAll =
  (Model: Model<Document>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .limitFields()
      .pagination()
      .sort();

    const doc = await features.query;

    if (!doc) {
      return next(new APIErrors("No document found", 400));
    }

    res.status(200).json({
      status: "success",
      count: doc.length,
      data: {
        data: doc,
      },
    });
  };

export { getAll };
