import mongoose from "mongoose";

const prodct_schema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },
  clav_prodct: {
    type: String,
    required: true,
  },
  stat: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model("prodct", prodct_schema);
