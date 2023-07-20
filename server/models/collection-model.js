const { Schema, model } = require("mongoose");
const customFields = require('mongoose-custom-fields');

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
  customFields: { type: Schema.Types.Mixed },

});

// ItemCollectionSchema.plugin(customFields, {
//   fields: {
//     customField1: { type: Number, required: true },
//     customField2: { type: Number },
//     customField3: { type: Number },
//     customField4: { type: String, required: true },
//     customField5: { type: String },
//     customField6: { type: String },
//     customField7: { type: String, required: true },
//     customField8: { type: Boolean },
//     customField9: { type: Boolean },
//     customField10: { type: Boolean, required: true },
//     customField11: { type: Date },
//     customField12: { type: Date },
//     customField13: { type: Date, required: true },
//   },
// });

ItemCollectionSchema.index({
  name: "text",
  description: "text",
  theme: "text",
});

module.exports = model("ItemCollection", ItemCollectionSchema);
