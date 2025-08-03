const Booking = require('../models/Booking');
const emailService = require('../services/emailService');

exports.createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    
    // Валидация
    const errors = booking.validate();
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // Отправка email
    await emailService.sendBookingEmail({
      ...booking,
      total: booking.calculateTotal()
    });

    res.status(201).json({ 
      success: true,
      total: booking.calculateTotal()
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
};