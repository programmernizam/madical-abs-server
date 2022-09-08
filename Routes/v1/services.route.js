const express = require("express");

const router = express.Router();

/**
 * @api {get} /services all service
 * @description get all services
 * @apiPermission admin, users
 */

router.get("/", async (req, res) => {
  // const query = {};
  // const cursor = serviceCollection.find(query);
  // const services = await cursor.toArray();
  // res.send(services);
  res.send("Service page")
});

module.exports = router;
