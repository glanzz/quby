import mongoose from "mongoose";
import { FEED_PROVIDER } from "./constants.js";


const FetchDB = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    enum: Object.keys(FEED_PROVIDER),
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  postedOn: {
    type: String,
    required: true,
  },
}, {
  timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt"
  }
});



const FetchDBModel = mongoose.model("Qfetcher", FetchDB);

export default FetchDBModel;


