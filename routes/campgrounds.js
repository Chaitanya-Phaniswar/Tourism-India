const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'),validateCampground,catchAsync(campgrounds.renderNewCampground))

router.route('/new')
    .get(isLoggedIn, campgrounds.renderNewForm);
router.route('/search')
    .get(catchAsync(campgrounds.searchResult))
router.route('/:id/edit')
    .get(isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

router.route('/:id')
    .get(catchAsync(campgrounds.renderCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'),validateCampground, catchAsync(campgrounds.renderEditedCampground))
    .delete( isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));
router.route('/search/:word')
    .get(catchAsync(campgrounds.searchResult))
module.exports = router;