const route = require("express").Router();

const LandingController = require("../controllers/LandingController");

route.get("/home", LandingController.home);
route.get("/register", LandingController.register);
route.get("/login", LandingController.loginView);

route.post("/cek-login", LandingController.login);
route.post("/create", LandingController.create);

module.exports = route;
