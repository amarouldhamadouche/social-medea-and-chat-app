const mongoose = require("mongoose");

const posttSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    createdAt:{}
  },
  { timestamps: true }
);

module.exports = mongoose.model("postt", posttSchema);
