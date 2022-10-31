const bcrypt = require("bcrypt");
const saltRound = 5;

const encryptPass = (data) => {
  return bcrypt.hashSync(String(data), saltRound);
};

const decryptPass = (data, hashPass) => {
  return bcrypt.compareSync(String(data), String(hashPass));
};

module.exports = {
  encryptPass,
  decryptPass,
};
