"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        notNull: {
          msg: "Email Wajib diisi!",
        },
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        notNull: {
          msg: "Password Wajib diisi!",
        },
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        notNull: {
          msg: "Nama Wajib diisi!",
        },
      },
      nomor_hp: {
        type: Sequelize.STRING,
        allowNull: false,
        notNull: {
          msg: "Nomor Hp Wajib diisi!",
        },
      },
      alamat: {
        type: Sequelize.STRING,
      },
      level: {
        type: Sequelize.STRING,
      },
      jk: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("users");
  },
};
