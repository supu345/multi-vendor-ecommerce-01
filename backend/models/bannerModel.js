const { Schema, model } = require("mongoose");

const bannerSchema = new Schema(
  {
    productId: {
      type: Schema.ObjectId,
      required: true,
    },
    banner: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("banners", bannerSchema);
