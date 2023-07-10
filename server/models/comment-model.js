const { Schema, model } = require("mongoose");

const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  item: {
    type: Schema.Types.ObjectId,
    ref: "Item",
  },
  message: {
    type: String,
    required: true,
  },
  creation_date: {
    type: String,
  },
});

CommentSchema.index({ message: 'text' });

module.exports = model("Comment", CommentSchema);
