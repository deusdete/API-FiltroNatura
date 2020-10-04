const mongoose = require("../database");

const QRCodeSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    filter:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Filter',
      require: true
    },
    url: {
      type: String,
      required: true,
    },
    data: {
      type: String,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  });


  const QRCode = mongoose.model('QRCode', QRCodeSchema);
  
  module.exports = QRCode;