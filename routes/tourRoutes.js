const express = require('express');
const tourContorller = require('../controller/tourController');
const authContorller = require('../controller/authController');
const reviewRouter = require('./reviewRoute');

const router = express.Router();

// router.param('id', tourContorller.checkId);

router.use('/:tourId/reviews', reviewRouter);

router
  .route('/top-5-cheap')
  .get(tourContorller.aliasTopTours, tourContorller.getAllTours);

router.route('/tour-stats').get(tourContorller.getTourStats);

router
  .route('/monthly-plan/:year')
  .get(
    authContorller.protect,
    authContorller.restrictTo('admin', 'lead-guide', 'guide'),
    tourContorller.getMonthlyPlan,
  );

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourContorller.getToursWithin);

router.route('/distances/:latlng/unit/:unit').get(tourContorller.getDistances);

router
  .route('/')
  .get(tourContorller.getAllTours)
  .post(
    authContorller.protect,
    authContorller.restrictTo('admin', 'lead-guide'),
    tourContorller.createTour,
  );

router
  .route('/:id')
  .get(tourContorller.getTourById)
  .patch(
    authContorller.protect,
    authContorller.restrictTo('admin', 'lead-guide'),
    tourContorller.uploadTourImages,
    tourContorller.resizeTourImages,
    tourContorller.updateTour,
  )
  .delete(
    authContorller.protect,
    authContorller.restrictTo('admin', 'lead-guide'),
    tourContorller.deleteTour,
  );

module.exports = router;
