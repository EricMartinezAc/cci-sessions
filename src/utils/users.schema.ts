import mongoose  from "mongoose";

const users_schema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  pswLogin: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    required: false,
  },
  id_prodct: {
    type: String,
    required: true
    // mongoose.Schema.Types.ObjectId,
    // ref: "prodct",
  },
});

export default mongoose.model("user", users_schema);
