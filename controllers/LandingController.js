const { encryptPass, decryptPass } = require("../helpers/bcrypt");
const { users } = require("../models");

class LandingController {
  static async home(req, res) {
    try {
      //   const data = await brands.findAll({
      //     order: [["id", "ASC"]],
      //   });
      // return res.render("index.ejs", { result: data });

      return res.render("index.ejs");
    } catch (error) {
      res.json(error);
    }
  }

  static async loginView(req, res) {
    try {
      return res.render("login.ejs");
    } catch (error) {
      res.json(error);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      let result = await users.findOne({
        where: {
          email,
        },
      });

      if (result) {
        if (decryptPass(password, result.password)) {
          res.status(200).json(result);
          res.redirect("/");
        } else {
          res.status(403).json({
            message: "Email/Password Anda salah!",
          });
        }
      } else {
        res.status(404).json({
          message: "Pengguna tidak tersedia",
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async register(req, res) {
    try {
    } catch (error) {
      res.json(error);
    }
  }

  static async create(req, res) {
    try {
      const { email, password, name, nomor_hp, alamat, level, jk } = req.body;

      let result = await users.create({
        email,
        password: encryptPass(password),
        name,
        nomor_hp,
        alamat,
        level,
        jk,
      });

      return res.status(201).json(result);
    } catch (error) {
      res.json(error);
    }
  }

  static async detailGedung(req, res) {
    try {
      const id = Number(req.params.id);
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = LandingController;
