
const express = require('express');
const bookingController = require('./bookingController');

const router = express.Router();

// Добавляем OPTIONS для предварительных CORS-запросов
router.options('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.status(200).end();
});

router.post('/', bookingController.createBooking);

module.exports = router;
