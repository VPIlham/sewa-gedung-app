const route = require("express").Router();

route.get("/home", (req, res) => {
  res.render("index.ejs");
});

const landingRoutes = require("./landing");
const adminRoutes = require("./admin");

route.use("/", landingRoutes);
route.use("/admin", adminRoutes);

module.exports = route;
