const db = require('../connection');
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");


cloudinary.config({
  cloud_name: 'gbrozdev',
  api_key: '844918411198732',
  api_secret: '-Tyjb9TAHur7ZYQeALhAhn5JBY4'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "DEV",
  },
});

// const upload = multer({ storage: storage });


// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET
// });

const getReportPage = async function (req, res) {
  res.render('reports/index');
}

const getAdd = async function (req, res) {
  res.render('reports/add');
}

const postAdd = async function (req, res, next) {
  console.log(' Called ');

  // const file = req.files;
  // if (!file) {
  //   const error = new Error('Please attach a file');
  //   error.statusCode = 400;
  //   return next(error);
  // }
}


exports.getReportPage = getReportPage;
exports.getAdd = getAdd;
exports.postAdd = postAdd;

