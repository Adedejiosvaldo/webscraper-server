const mongoose = require("mongoose");

const jumiaSchema = mongoose.Schema({
  title: String,
  URL: String,
  imageURL: String,
  itemsLeft: String,
  discountPrice: String,
  price: Number,
});

// jumiaSchema.post(/^find/, function (next) {
//   const newVal = new Intl.NumberFormat().format(this.price);
//   this.price = newVal;
// });

const Jumia = mongoose.model("Jumia", jumiaSchema);

module.exports = Jumia;
