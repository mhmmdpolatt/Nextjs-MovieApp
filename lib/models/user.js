import mongoose from "mongoose";
import film from "./film";
const userSchema = new mongoose.Schema({
  kullaniciAdi: {
    type: String,
    required: true,
    unique: true,
  },
  parola: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  begendigiFilmler: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Film',
  }],
  dahaSonraIzle: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Film',
  }],
  izlediklerim: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Film',
  }],
}, { timestamps: true });
export default mongoose.models.User || mongoose.model('User', userSchema);
