const mongoose = require("mongoose");

const anonyModel = mongoose.Schema(
  {},
  {
    timestamps: true,
  }
);

const Anony = mongoose.model("Anony", anonyModel);

module.exports = Anony;