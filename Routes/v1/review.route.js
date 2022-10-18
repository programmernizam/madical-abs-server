const express = require("express");
const router = express.Router();
const reviewController = require("../../controllers/review.controller");

router
  .route("/")
  .get(reviewController.getReviews)
  .post(reviewController.createReview);

module.exports = router;
