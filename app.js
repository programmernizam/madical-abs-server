const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from doctors portal");
});

// app.all("*", (req, res) => {
//   res.send(
//     `<h2 style="text-align:center;color:red;font-size:48px;">No Route Found!</h2>`
//   );
// });

// Routes
const serviceRoute = require("./Routes/v1/services.route");
// Route
app.use("/api/v1/services", serviceRoute);

module.exports = app;
