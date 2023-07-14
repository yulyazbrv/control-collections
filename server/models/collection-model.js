const { Schema, model } = require("mongoose");

const ItemCollectionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  theme: {
    type: String,
    required: true,
  },
  image: {
    type: Buffer,
    required: true,
  },
});

ItemCollectionSchema.index({
  name: "text",
  description: "text",
  theme: "text",
});

module.exports = model("ItemCollection", ItemCollectionSchema);
