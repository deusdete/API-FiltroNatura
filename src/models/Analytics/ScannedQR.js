const mongoose = require("../../database");

const ScannedQRSchema = new mongoose.Schema({
    qrCodeId: {
      type: String,
      required: true,
    },
    urlOpened:{
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  });


  const ScannedQR = mongoose.model('ScannedQR', ScannedQRSchema);
  
  module.exports = ScannedQR;