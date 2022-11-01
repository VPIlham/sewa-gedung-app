const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  console.log(file, "@FILEEEEE");
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/.jpg" ||
    file.mimetype === "image/.png" ||
    file.mimetype === "image/.jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const multerMiddleware = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
}).single("img");

module.exports = multerMiddleware;
