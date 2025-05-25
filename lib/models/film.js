import mongoose from "mongoose";
const filmSchema = new mongoose.Schema({
  id: Number,
  title: String,
  tur:String,
  poster_path: String,
  vote_average: Number,
});
export default mongoose.models.Film || mongoose.model("Film", filmSchema)