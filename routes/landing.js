const route = require("express").Router();

const LandingController = require("../controllers/LandingController");
const multerMiddleware = require("../helpers/mutler");

route.get("/home", LandingController.home);
route.get("/register", LandingController.register);
route.get("/login", LandingController.loginView);

//pemesanan
route.post("/pemesanan/create", LandingController.addPesanan);
route.get("/pemesanan/", LandingController.listPesanan);
route.get("/pemesanan/:id", LandingController.DetailPesanan);
route.post(
  "/pemesanan/:id/bayar",
  multerMiddleware,
  LandingController.updatePesanan
);

//GEDUNG
route.get("/gedung/:id", LandingController.detailGedung);

route.post("/cek-login", LandingController.login);
route.post("/create", LandingController.create);

module.exports = route;
