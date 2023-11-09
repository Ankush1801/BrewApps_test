const mongoose = require("mongoose");

const DocSchema = new mongoose.Schema({
  title: {
    type: String,
    default: ""
  },
  author: {
    type: String,
    default: "",
    lowercase: true
  },
  summary: {
    type: String,
    default: ""
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});
DocSchema.set("toJSON", {
  virtuals: true
});

module.exports = mongoose.model("Book", DocSchema);