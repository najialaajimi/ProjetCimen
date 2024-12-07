let mongoose = require("mongoose");

let RoleSchema = new mongoose.Schema({
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

module.exports = mongoose.model("roles", RoleSchema);
