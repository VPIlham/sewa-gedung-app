const route = require("express").Router();

const AdminController = require("../controllers/AdminController");

route.get("/", AdminController.home);

module.exports = route;
