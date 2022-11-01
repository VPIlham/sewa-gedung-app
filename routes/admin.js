const route = require("express").Router();

const AdminController = require("../controllers/AdminController");
const multerMiddleware = require("../helpers/mutler");

route.get("/", AdminController.home);

// ROUTES USER
route.get("/users/", AdminController.listUser);
route.get("/users/tambah", AdminController.tambahUserView);
route.get("/users/edit/:id", AdminController.editUserView);
route.get("/users/hapus/:id", AdminController.hapusGedung);

//ROUTES GEDUNG
route.get("/gedung/", AdminController.listGedung);
route.get("/gedung/tambah", AdminController.tambahGedungView);
route.get("/gedung/edit/:id", AdminController.editGedungView);
route.get("/gedung/hapus/:id", AdminController.hapusGedung);

route.post(
  "/gedung/edit-gedung/:id",
  multerMiddleware,
  AdminController.editGedung
);
route.post(
  "/gedung/tambah-gedung",
  multerMiddleware,
  AdminController.tambahGedung
);

module.exports = route;
