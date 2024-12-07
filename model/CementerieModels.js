let mongoose = require("mongoose");

let CementerieSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  etat: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Cementeries", CementerieSchema);
