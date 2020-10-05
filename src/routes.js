const express = require("express");
const router = express.Router();

const Authorization = require('./shared/Authorization');

const AuthController = require('./controllers/AuthController');
const FiltersController = require("./controllers/FiltersController");
const QRCodeController = require("./controllers/QRCodeController");

router.post('/auth/login', AuthController.login);
router.post('/auth/register', AuthController.register);

router.get('/filters', Authorization, FiltersController.getFilters);
router.get('/filters/:idFilter', Authorization, FiltersController.getFilter);
router.post('/filters', Authorization, FiltersController.registerFilter);

router.get('/qrcodes/:id/open', QRCodeController.openQRCode);
router.get('/qrcodes', Authorization, QRCodeController.getQRCodes);
router.post('/qrcodes', Authorization, QRCodeController.createQR);

router.get('/analytics/qr-scanned', Authorization, QRCodeController.getQRCodesScanned);

module.exports = router;