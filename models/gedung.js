"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class gedung extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      gedung.belongsToMany(models.pemesanan, {
        through: models.pemesanan_gedung,
      });
    }
  }
  gedung.init(
    {
      name: DataTypes.STRING,
      harga: DataTypes.INTEGER,
      img: DataTypes.STRING,
      fasilitas: DataTypes.STRING,
      alamat: DataTypes.STRING,
      kota: DataTypes.STRING,
      status: DataTypes.STRING,
      jam_siang: DataTypes.STRING,
      jam_siang_akhir: DataTypes.STRING,
      jam_malam: DataTypes.STRING,
      jam_malam_akhir: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "gedung",
    }
  );
  return gedung;
};
