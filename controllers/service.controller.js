const Service = require("../models/Service");

exports.getServices = async (req, res, next) => {
  try {
    const services = await Service.find();
    res.status(200).json({
      status: "success",
      message: "Service find successfully",
      data: services,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Can't find any services.",
      error: error.message,
    });
  }
};

exports.createService = async (req, res, next) => {
  try {
    const service = new Service(req.body);
    const result = await service.save();
    res.status(200).json({
      status: "success",
      message: "service successfully inserted.",
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
