const { users, gedung, pemesanan_gedung } = require("../models");
const moment = require("moment");
moment.locale("id");
class AdminController {
  static async home(req, res) {
    try {
      let pemesanan = await pemesanan_gedung.findAll({
        order: [["id", "ASC"]],
      });
      let gedungs = await gedung.findAll({
        order: [["id", "ASC"]],
      });

      let user = await users.findAll({
        order: [["id", "ASC"]],
      });

      const data = {
        user: user.length,
        gedung: gedungs.length,
        pemesanan: pemesanan.length,
      };

      res.render("admin/home.ejs", { result: data });
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

  static async printUser(req, res) {
    try {
      let data = await users.findAll({
        order: [["id", "ASC"]],
      });
      res.render("admin/user/cetak.ejs", { result: data, moment: moment });
    } catch (error) {
      res.json(error);
    }
  }

  static async listPemesanan(req, res) {
    try {
      let data = await pemesanan_gedung.findAll({
        attributes: [
          "id",
          "kode_transaksi",
          "nama_gedung",
          "nomor_hp",
          "sewaTgl",
          "sewaJam",
          "sewaWaktu",
          "total_harga",
          "img",
          "nama_pemesan",
          "no_ktp",
          "typeBayar",
          "status",
        ],
        order: [["id", "ASC"]],
      });
      return res.render("admin/pemesanan/list.ejs", { result: data });
    } catch (error) {
      res.json(error);
    }
  }
  static async printPemesanan(req, res) {
    try {
      let data = await pemesanan_gedung.findAll({
        attributes: [
          "id",
          "kode_transaksi",
          "nama_gedung",
          "nomor_hp",
          "sewaTgl",
          "sewaJam",
          "sewaWaktu",
          "total_harga",
          "img",
          "nama_pemesan",
          "no_ktp",
          "typeBayar",
          "status",
        ],
        order: [["id", "ASC"]],
      });
      return res.render("admin/pemesanan/cetak.ejs", {
        result: data,
        moment: moment,
      });
    } catch (error) {
      res.json(error);
    }
  }
  static async printPemesananDetail(req, res) {
    try {
      const id = Number(req.params.id);
      let data = await pemesanan_gedung.findOne({
        attributes: [
          "id",
          "kode_transaksi",
          "nama_gedung",
          "nomor_hp",
          "sewaTgl",
          "sewaJam",
          "sewaWaktu",
          "total_harga",
          "img",
          "nama_pemesan",
          "no_ktp",
          "typeBayar",
          "status",
        ],
        order: [["id", "ASC"]],
        where: {
          id: id,
        },
      });
      return res.render("admin/pemesanan/cetak-detail.ejs", {
        result: data,
        moment: moment,
      });
    } catch (error) {
      res.json(error);
    }
  }

  static async editPemesananView(req, res) {
    try {
      const id = Number(req.params.id);

      console.log(`MY ID = ${id}`);

      let data = await pemesanan_gedung.findOne({
        where: { id: id },
        attributes: [
          "id",
          "usersId",
          "kode_transaksi",
          "nama_gedung",
          "sewaTgl",
          "sewaJam",
          "sewaWaktu",
          "total_harga",
          "typeBayar",
          "status",
          "img",
          "bank",
        ],
      });

      // return res.json(data);

      return res.render("admin/pemesanan/edit.ejs", {
        result: data,
        moment: moment,
      });
    } catch (error) {
      res.json(error);
    }
  }

  static async editPemesanan(req, res) {
    try {
      const id = Number(req.params.id);

      const { status } = req.body;

      const myData = {
        status,
      };

      await pemesanan_gedung
        .update(myData, { where: { id: id } })
        .then((_) => {
          return res.redirect(`/admin/pemesanan`);
        })
        .catch((err) => res.json(err));

      return res.render("admin/pemesanan/edit.ejs", { result: data });
    } catch (error) {}
  }

  static async hapusPesanan(req, res) {
    try {
      const id = Number(req.params.id);

      await pemesanan_gedung.destroy({
        where: {
          id: id,
        },
      });

      return res.redirect("/admin/pemesanan");
    } catch (error) {
      res.json(error);
    }
  }

  static async hapusUser(req, res) {
    try {
      const id = Number(req.params.id);

      await users.destroy({
        where: {
          id: id,
        },
      });

      return res.redirect("/admin/users");
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
  static async printGedung(req, res) {
    try {
      let data = await gedung.findAll({
        order: [["id", "ASC"]],
      });

      return res.render("admin/gedung/cetak.ejs", {
        result: data,
        moment: moment,
      });
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
