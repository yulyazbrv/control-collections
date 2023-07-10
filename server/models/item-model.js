const { Schema, model } = require("mongoose");

const ItemSchema = new Schema({
  itemCollection: {
    type: Schema.Types.ObjectId,
    ref: "ItemCollection",
  },
  name: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Like",
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  tags: [String],
});

ItemSchema.index({ name: 'text' });

module.exports = model("Item", ItemSchema);
