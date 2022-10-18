const mongoose = require("mongoose");

// Service Schema
const serviceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please provide a service name."],
      trim: true,
      unique: [true, "Service name must be unique."],
      minLength: [3, "Name must be 3 characters or more."],
      maxLength: [100, "Service name is too large."],
    },
    slots: {
      type: Array,
      require: [true, "Please provide service slots"],
    },
  },
  {
    timestamps: true,
  }
);

// Service Model
const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
