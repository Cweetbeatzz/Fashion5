const multer = require("multer");

//#######################################################
//<-------------------IMAGE STORAGE--------------------->

//location
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname + "-" + uniqueSuffix);
    // cb(null, new Date().toISOString() + file.originalname);
  },
});

//file type fr uploads
function Acceptfiletype(req, file, cb) {
  //accept a file
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/gif"
  ) {
    cb(null, true);
  } else {
    //reject a file
    cb(new Error("Only 'jpeg,png,jpg,gif' images files are surpotted"), false);
  }
}

//########
const upload = multer({
  // dest: "uploads/",
  storage: storage,
  limits: { filesize: 1024 * 1024 * 5 },
  fileFilter: Acceptfiletype,
});

module.exports = { upload };
