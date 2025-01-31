const express = require('express');
const bookingController = require('../controller/bookingController');
const authContorller = require('../controller/authController');

const router = express.Router();

router.use(authContorller.protect);

router.use(authContorller.restrictTo('admin', 'lead-guide'));

router.get('/checkout-session/:tourId', bookingController.getCheckoutSession);

router
  .route('/:id')
  .get(bookingController.getBookingById)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

router
  .route('/')
  .get(bookingController.getAllBookings)
  .post(bookingController.createBooking);

module.exports = router;
