const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
exports.checkIsCurrentUserAuthorReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: 'user',
    select: '_id',
  });
  if (!review) {
    return next(new AppError('No document found with that ID', 404));
  }
  if (req.user.role !== 'admin' && review.user._id.toString() !== req.user.id) {
    return next(
      new AppError("You don't have the permission to edit this review.", 401),
    );
  }
  next();
});

exports.getAllReviews = factory.getAll(Review);

exports.getReviewById = factory.getOne(Review);

exports.createReview = factory.createOne(Review);

exports.updateReview = factory.updateOne(Review);

exports.deleteReview = factory.deleteOne(Review);
