const route = require("express").Router();

const landingRoutes = require("./landing");
const adminRoutes = require("./admin");

route.use("/", landingRoutes);
route.use("/admin", adminRoutes);

module.exports = route;
