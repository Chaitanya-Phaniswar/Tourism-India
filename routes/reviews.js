const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const Campground = require('../models/campground');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const reviews=require('../controllers/reviews');

router.route('/')
    .post( isLoggedIn, validateReview, catchAsync(reviews.postReview))

router.route('/:reviewId')
    .delete( isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;