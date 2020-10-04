const QRCode = require('../models/QRCode');
const QRCodeGenerate = require("qrcode");
const ScannedQR = require('../models/Analytics/ScannedQR');

require('dotenv').config();

const opts = {
  errorCorrectionLevel: "H",
  type: "image/jpeg",
  quality: 0.3,
  margin: 1,
  color: {
    dark: "#000000",
    light: "#ffffff",
  },
};

module.exports = {
  async getQRCodes (req, res) {
    try {

      const qrcodes = await QRCode.find({}).populate(['filter'])

      return res.status(200).json({qrcodes})
    } catch (error) {
      return res.status(400).json({ error: "Falha ao obter os QR Codes" })
    }
  },

  async getQRCodesScanned (req, res) {
    try {

      const scannedQR = await ScannedQR.find({})

      return res.status(200).json({scannedQR})
    } catch (error) {
      return res.status(400).json({ error: "Falha ao obter os QR Codes" })
    }
  },

  async openQRCode (req, res) {
    const { id } = req.params;
    try {
      const qrcode = await QRCode.findById(id);
      if(qrcode){
        await ScannedQR.create({qrCodeId: qrcode._id, urlOpened:  qrcode.url });
        console.log('QR Open')
        return res.redirect(qrcode.url)
      }else{
        return res.status(404).json({error: "QR Code não encontrado" })
      }
     
    } catch (error) {
      console.error(error)
      return res.status(400).json({ error: "Erro ao abrir QR Code" })
    }
  },

  async createQR (req, res) {
    const { url } = req.body
    const host = req.headers.host;
    const baseUrl = req.baseUrl;
  
    try {
      if(await QRCode.findOne({url})){
        return res.status(400).json({error: 'QR Code já existe com essa url'});
      }
      
      const qrcode = await QRCode.create({...req.body});

      const link = `http://${host}${baseUrl}/scan/${qrcode._id}`
      console.log(link)
      const imgUrl =  await QRCodeGenerate.toDataURL(link, opts)
      qrcode.data = imgUrl;
      await qrcode.save()

      return res.status(200).json({qrcode})
    } catch (error) {
      console.error(error)
      return res.status(400).json({error})
    }
  },
}