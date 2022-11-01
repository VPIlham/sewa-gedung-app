const { users, gedung } = require("../models");
const fs = require("fs");
class AdminController {
  static async home(req, res) {
    try {
      res.render("admin/home.ejs");
    } catch (error) {
      res.json(error);
    }
  }

  static async listUser(req, res) {
    try {
      let data = await users.findAll({
        order: [["id", "ASC"]],
      });
      res.render("admin/user/list.ejs", { result: data });
    } catch (error) {
      res.json(error);
    }
  }

  static async tambahUserView(req, res) {
    try {
      res.render("admin/user/create.ejs");
    } catch (error) {
      res.json(error);
    }
  }

  static async editUserView(req, res) {
    try {
      res.render("admin/user/edit.ejs");
    } catch (error) {
      res.json(error);
    }
  }

  static async tambahGedungView(req, res) {
    try {
      res.render("admin/gedung/create.ejs");
    } catch (error) {
      res.json(error);
    }
  }

  static async listGedung(req, res) {
    try {
      let data = await gedung.findAll({
        order: [["id", "ASC"]],
      });

      // res.json(data);
      return res.render("admin/gedung/list.ejs", { result: data });
    } catch (error) {
      res.json(error);
    }
  }

  static async editGedungView(req, res) {
    try {
      const id = Number(req.params.id);

      let data;

      await gedung
        .findByPk(id)
        .then((results) => {
          data = results.dataValues;
        })
        .catch((err) => console.log(err));

      return res.render("admin/gedung/edit.ejs", { result: data });
    } catch (error) {
      res.json(error);
    }
  }

  static async editGedung(req, res) {
    try {
      const id = Number(req.params.id);

      const {
        name,
        harga,
        fasilitas,
        alamat,
        kota,
        jam_siang,
        jam_siang_akhir,
        jam_malam,
        jam_malam_akhir,
        status,
      } = req.body;

      const img =
        req.file == undefined ? null : req.file.path.replace(/\\/g, "/");

      console.log(
        ` file = ${req.file}, img = ${img}, name = ${name}, alamat = ${alamat}, status = ${status}`
      );

      const myData = {
        name,
        harga,
        fasilitas,
        alamat,
        kota,
        jam_siang,
        jam_siang_akhir,
        jam_malam,
        jam_malam_akhir,
        status,
        img,
      };

      if (img == null) {
        delete myData["img"];
      }

      await gedung
        .update(myData, { where: { id } })
        .then((_) => {
          return res.redirect("/admin/gedung");
        })
        .catch((err) => res.json(err));
    } catch (error) {
      res.json(error);
    }
  }

  static async hapusGedung(req, res) {
    try {
      const id = Number(req.params.id);

      let data = await gedung.destroy({
        where: {
          id: id,
        },
      });

      return res.redirect("/admin/gedung");
    } catch (error) {
      res.json(error);
    }
  }

  static async tambahGedung(req, res) {
    try {
      const {
        name,
        harga,
        fasilitas,
        alamat,
        kota,
        jam_siang,
        jam_siang_akhir,
        jam_malam,
        jam_malam_akhir,
        status,
      } = req.body;

      const img = req.file.path.replace(/\\/g, "/");

      let result = await gedung.create({
        name,
        img,
        harga,
        fasilitas,
        alamat,
        kota,
        jam_malam,
        jam_malam_akhir,
        jam_siang,
        jam_siang_akhir,
        status,
      });

      // return res.status(201).json(result);
      return res.redirect("/admin/gedung");
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = AdminController;
