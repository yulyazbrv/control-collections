const { Schema, model } = require("mongoose");

const LikeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  item: {
    type: Schema.Types.ObjectId,
    ref: "Item",
  },
});

module.exports = model("Like", LikeSchema);
