const express = require("express");
const router = express.Router();
const serviceController = require("../../controllers/service.controller");

router
  .route("/")
  // Get All Services
  .get(serviceController.getServices)
  // Create a new service
  .post(serviceController.createService)

module.exports = router;
