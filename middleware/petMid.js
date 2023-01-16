const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "dohaqe6nc",
  api_key: "971525814567273",
  api_secret: "41o9DVpkyhLQmEyxFqiFzqvQmrw",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({storage: storage});

const valueModifier = (req, res, next) => {
  console.log("did i got here?",console.log(req.body))
 
  if (req.body.hypoallergenic === "true") {
    req.body.hypoallergenic = req.body.hypoallergenic === "true";
  } else {
    req.body.hypoallergenic = req.body.hypoallergenic === null;
  }
  req.body.height = Number(req.body.height);
  req.body.weight = Number(req.body.weight);
  next();
};

const picModifier = (req, res, next) => {
  if (req.file) {
    req.body.picture = req.file.path;
    next();
  } else {
    next();
  }
};


module.exports = {upload, valueModifier, picModifier};
