const { Schema, model } = require("mongoose");

const withdrowSchema = new Schema(
  {
    sellerId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("withdrowRequest", withdrowSchema);
