"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("pemesanan_gedungs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      gedungId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pemesananId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      kode_transaksi: {
        type: Sequelize.STRING,
      },
      nama_pemesan: {
        type: Sequelize.STRING,
      },
      nama_gedung: {
        type: Sequelize.STRING,
      },
      nomor_hp: {
        type: Sequelize.STRING,
      },
      sewaTgl: {
        type: Sequelize.DATEONLY,
      },
      sewaJam: {
        type: Sequelize.STRING,
      },
      sewaWaktu: {
        type: Sequelize.STRING,
      },
      no_ktp: {
        type: Sequelize.STRING,
      },
      total_harga: {
        type: Sequelize.INTEGER,
      },
      typeBayar: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      img: {
        type: Sequelize.STRING,
      },
      bank: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("pemesanan_gedungs");
  },
};
