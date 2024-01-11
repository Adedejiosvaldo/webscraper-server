const APIFeatures = require("../utils/APIFeatures");
const APIErrors = require("../utils/ApiErrors");

const getAll = (Model) => async (req, res, next) => {
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

module.exports = { getAll };
