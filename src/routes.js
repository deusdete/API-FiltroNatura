const express = require("express");
const router = express.Router();

const AuthController = require('./controllers/AuthController');
const FiltersController = require("./controllers/FiltersController");
const QRCodeController = require("./controllers/QRCodeController");

router.post('/auth/login', AuthController.login);
router.post('/auth/register', AuthController.register);

router.get('/filters', FiltersController.getFilters);
router.get('/filters/:idFilter', FiltersController.getFilter);
router.post('/filters', FiltersController.registerFilter);

router.get('/qrcodes/:id/open', QRCodeController.openQRCode);
router.get('/qrcodes', QRCodeController.getQRCodes);
router.post('/qrcodes', QRCodeController.createQR);

router.get('/analytics/qr-scanned', QRCodeController.getQRCodesScanned);

module.exports = router;