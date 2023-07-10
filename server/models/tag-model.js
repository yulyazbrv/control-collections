const { Schema, model } = require("mongoose");

const TagSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  item: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
});

TagSchema.index({ name: 'text' });

module.exports = model("Tag", TagSchema);
