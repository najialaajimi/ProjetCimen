let mongoose = require("mongoose");

let TypeProduitSchema = new mongoose.Schema({
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

module.exports = mongoose.model("TypeProduits", TypeProduitSchema);
