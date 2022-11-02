const route = require("express").Router();

const LandingController = require("../controllers/LandingController");

route.get("/home", LandingController.home);
route.get("/register", LandingController.register);
route.get("/login", LandingController.loginView);

//pemesanan
route.post("/pemesanan/create", LandingController.addPesanan);

//GEDUNG
route.get("/gedung/:id", LandingController.detailGedung);

route.post("/cek-login", LandingController.login);
route.post("/create", LandingController.create);

module.exports = route;
