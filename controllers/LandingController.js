const { json } = require("sequelize");
const { encryptPass, decryptPass } = require("../helpers/bcrypt");
const { users, gedung, pemesanan, pemesanan_gedung } = require("../models");
const moment = require("moment");
class LandingController {
  static async home(req, res) {
    try {
      let data = await gedung.findAll({
        order: [["id", "ASC"]],
      });

      // res.json(data);
      return res.render("user/home.ejs", { result: data });
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
          return res.json(result);
        } else {
          return res.status(403).json({
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
      return res.render("register.ejs");
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

      let data;

      await gedung
        .findByPk(id)
        .then((results) => {
          data = results.dataValues;
        })
        .catch((err) => console.log(err));

      return res.render("user/gedung/detail.ejs", { result: data });
    } catch (error) {
      res.json(error);
    }
  }

  static async printDetailPesanan(req, res) {
    try {
      const id = +req.params.id;

      let data = await pemesanan_gedung.findOne({
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
        order: [["id", "ASC"]],
        where: { id: id },
      });

      moment.locale("id");
      return res.render("user/pemesanan/print.ejs", {
        result: data,
        moment: moment,
      });
    } catch {}
  }

  static async listPesanan(req, res) {
    try {
      const id = +req.query.usersId;
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
          "typeBayar",
          "status",
        ],
        order: [["id", "ASC"]],
        where: { usersId: id },
      });
      return res.render("user/pemesanan/list_transaksi.ejs", {
        result: data,
      });
    } catch (error) {
      res.json(error);
    }
  }

  static async DetailPesanan(req, res) {
    try {
      const id = +req.params.id;

      let data = await pemesanan_gedung.findOne({
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
        order: [["id", "ASC"]],
        where: { id: id },
      });
      // return res.json(data);
      return res.render("user/pemesanan/detail.ejs", { result: data });
    } catch (error) {
      res.json(error);
    }
  }

  static async updatePesanan(req, res) {
    try {
      const id = +req.params.id;

      const { bank, usersId } = req.body;

      const img =
        req.file == undefined ? null : req.file.path.replace(/\\/g, "/");

      const myData = {
        bank,
        img,
        status: "diproses",
      };

      console.log(
        `MY DATA UPDATE = ${bank}, img = ${img}, ID = ${id}, usersId = ${usersId}`
      );

      await pemesanan_gedung
        .update(myData, { where: { id: id } })
        .then((_) => {
          return res.redirect(`/pemesanan?usersId=${+usersId}`);
        })
        .catch((err) => res.json(err));
    } catch (error) {
      res.json(error);
    }
  }

  static async addPesanan(req, res) {
    try {
      const {
        gedungId,
        usersId,
        nama_pemesan,
        nama_gedung,
        nomor_hp,
        typeBayar,
        harga,
        sewaTgl,
        sewaJam,
        sewaWaktu,
        status,
        no_ktp,
      } = req.body;

      console.log(
        `Nama Pemesan = ${nama_pemesan}, Gedung ID = ${gedungId}, nama gedung ${nama_gedung}, User Id = ${usersId}, Type Bayar = ${typeBayar}, Harga = ${harga}, Sewa Tgl = ${sewaTgl}, Sewa Jam = ${sewaJam}, status = ${status} `
      );

      const date = new Date();
      const components = [
        date.getYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds(),
      ];

      const randomUid = components.join("");
      const kode_transaksi = `TRX-${randomUid}`;

      return await pemesanan
        .create({
          kode_transaksi,
          gedungId,
          usersId,
          typeBayar,
          harga,
        })
        .then(async (result) => {
          const { id } = result.dataValues;
          await pemesanan_gedung
            .create({
              pemesananId: id,
              gedungId,
              usersId,
              kode_transaksi,
              nama_pemesan,
              nama_gedung,
              nomor_hp,
              no_ktp,
              total_harga: harga,
              typeBayar,
              status,
              sewaTgl,
              sewaJam,
              sewaWaktu,
            })
            .then((resultPG) => {
              return res.status(201).json(resultPG);
            })
            .catch((err) => res.json(err));
        });
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = LandingController;
