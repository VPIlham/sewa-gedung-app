"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class pemesanan_gedung extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      pemesanan_gedung.belongsTo(models.gedung, {
        foreignKey: "gedungId",
      });
      pemesanan_gedung.belongsTo(models.pemesanan, {
        foreignKey: "pemesananId",
      });
    }
  }
  pemesanan_gedung.init(
    {
      gedungId: DataTypes.INTEGER,
      pemesananId: DataTypes.INTEGER,
      kode_transaksi: DataTypes.STRING,
      usersId: DataTypes.STRING,
      nama_pemesan: DataTypes.STRING,
      nama_gedung: DataTypes.STRING,
      nomor_hp: DataTypes.STRING,
      sewaTgl: DataTypes.DATEONLY,
      sewaJam: DataTypes.STRING,
      sewaWaktu: DataTypes.STRING,
      no_ktp: DataTypes.STRING,
      total_harga: DataTypes.INTEGER,
      status: DataTypes.STRING,
      typeBayar: DataTypes.STRING,
      img: DataTypes.STRING,
      bank: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "pemesanan_gedung",
    }
  );
  return pemesanan_gedung;
};
