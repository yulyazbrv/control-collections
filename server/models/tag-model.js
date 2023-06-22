const { Schema, model } = require("mongoose");

const TagSchema = new Schema({
  item: {
    type: Schema.Types.ObjectId,
    ref: "Item",
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = model("Tag", TagSchema);
