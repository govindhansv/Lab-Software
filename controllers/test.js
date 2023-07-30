const db = require('../connection');
const formidable = require('formidable');
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: 'gbrozdev',
  api_key: '844918411198732',
  api_secret: '-Tyjb9TAHur7ZYQeALhAhn5JBY4'
});

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
  // const form = new formidable.IncomingForm();

  console.log(req.files.file);
  await uploads(req);

  // form.parse(req, (err, fields, files) => {

  //   // Find Cloudinary documentation using the link below
  //   // https://cloudinary.com/documentation/upload_images
  //   cloudinary.uploader.upload(files.upload.path, result => {

  //     // This will return the output after the code is exercuted both in the terminal and web browser
  //     // When successful, the output will consist of the metadata of the uploaded file one after the other. These include the name, type, size and many more.
  //     console.log(result)
  //     // if (result.public_id) {

  //   });
  //   if (err) {
  //     console.log(err);
  //   }
  // });

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


async function uploads(req) {
  const data = new FormData();
  data.append("file", req.files.file);
  data.append("upload_preset", "e-commerce");
  data.append("cloud_name", "gbrozdev");

  try {
    const response = await fetch("https://api.cloudinary.com/v1_1/gbrozdev/image/upload", {
      method: "post",
      body: data,
    });

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    const result = await response.json();
    console.log('result');
    console.log(result);
    const url = `https://res.cloudinary.com/gbrozdev/${result.resource_type}/upload/v${result.version}/${result.public_id}.${result.format}`;
    console.log(url);
    return url;
  } catch (error) {
    console.error("Error uploading image:", error.message);
    throw error;
  }
}


async function upload(req) {

  const data = new FormData()
  data.append("file", req.files.filetest)
  data.append("upload_preset", "e-commerce")
  data.append("cloud_name", "gbrozdev")
  await fetch("https://api.cloudinary.com/v1_1/gbrozdev/upload", {
    method: "post",
    body: data
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      let url = `https://res.cloudinary.com/gbrozdev/${data.resource_type}/upload/v${data.version}/${data.public_id}.${data.format}`
      console.log(url)
      image = url;
    })

  return image;

}