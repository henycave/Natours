const express = require('express');
const reviewController = require('../controller/reviewController');
const authContorller = require('../controller/authController');

const router = express.Router({ mergeParams: true });

router.use(authContorller.protect);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authContorller.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview,
  );

router
  .route('/:id')
  .get(reviewController.getReviewById)
  .patch(
    authContorller.restrictTo('user', 'admin'),
    reviewController.checkIsCurrentUserAuthorReview,
    reviewController.updateReview,
  )
  .delete(
    authContorller.restrictTo('user', 'admin'),
    reviewController.checkIsCurrentUserAuthorReview,
    reviewController.deleteReview,
  );

module.exports = router;
