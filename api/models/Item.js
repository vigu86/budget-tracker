const { Schema, model } = require("mongoose");

const ItemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  tags: {
    type: Object,
    required: true,
  },
});

const Item = model("item", ItemSchema);

module.exports = Item;
