const Review = require("../models/Review");

exports.getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({});
    res.status(200).json({
      status: "success",
      message: "reviews successfully find.",
      data: reviews,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Can't inserted data.",
      error: error.message,
    });
  }
};
exports.createReview = async (req, res, next) => {
  try {
    const review = new Review(req.body);
    const result = await review.save();
    res.status(200).json({
      status: "success",
      message: "reviews successfully inserted.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Can't inserted data.",
      error: error.message,
    });
  }
};
