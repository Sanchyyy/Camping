const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')
const catchAsync = require('../utilities/catchAsync');
const { reviewSchema } = require('../schemas.js');
const methodOverride = require('method-override');
const Campground = require('../models/campgrounds');
const Review = require('../models/review');
const reviews = require('../controllers/review');
const ExpressError = require('../utilities/expressError');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))


module.exports = router;