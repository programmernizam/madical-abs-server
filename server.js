const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
const app = require("./app");
const { patch } = require("./app");

// Database connection
mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
  console.log("Database connection successfully".red.bold);
});
// Server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Application running on port ${port}`.yellow.bold);
});
