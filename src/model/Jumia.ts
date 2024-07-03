import mongoose, { Schema, Model, model } from "mongoose";

interface IProducts {
  title: string;
  URL: string;
  imageURL: string;
  itemsLeft: string;
  discountPrice: string;
  price: number;
}

// const ProductSchema = new Schema<Products>({});

const ProductSchema = new mongoose.Schema<IProducts>({
  title: { type: String, required: true },
  URL: { type: String, required: true },
  imageURL: { type: String, required: true },
  itemsLeft: { type: String, required: false },
  discountPrice: String,
  price: Number,
});

// jumiaSchema.post(/^find/, function (next) {
//   const newVal = new Intl.NumberFormat().format(this.price);
//   this.price = newVal;
// });

const Jumia = model<IProducts>("Jumia", ProductSchema);

export default Jumia;
