const mongoose = require("../database");

const FilterSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  });


  const Filter = mongoose.model('Filter', FilterSchema);
  
  module.exports = Filter;