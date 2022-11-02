"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class pemesanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      pemesanan.belongsTo(models.users, { foreignKey: "usersId" });
      pemesanan.belongsToMany(models.gedung, {
        through: models.pemesanan_gedung,
      });
    }
  }
  pemesanan.init(
    {
      gedungId: DataTypes.INTEGER,
      usersId: DataTypes.INTEGER,
      kode_transaksi: DataTypes.STRING,
      typeBayar: DataTypes.STRING,
      harga: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "pemesanan",
    }
  );
  return pemesanan;
};
