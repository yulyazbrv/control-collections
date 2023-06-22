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
  author: {//???
    type: String,
  },
  published: {
    type: Date,
  },
  content: {
    type: String,
  },
});

module.exports = model("ItemCollection", ItemCollectionSchema);
