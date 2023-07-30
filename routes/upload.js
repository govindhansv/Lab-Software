var express = require('express');
var router = express.Router();

var db = require('../connection');

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
    cloud_name: 'gbrozdev',
    api_key: '844918411198732',
    api_secret: '-Tyjb9TAHur7ZYQeALhAhn5JBY4'
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "LAB",
    },
});

const upload = multer({ storage: storage });


// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET
// });

router.get("/", function (req, res) {
    console.log(' Called ');
});

router.post("/report", upload.single("file"), async function (req, res, next) {
    try {
        // Check if a file was uploaded successfully
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        // Access the link to the uploaded file
        const fileUrl = req.file.path;
        console.log(fileUrl);
        let data = req.body;
        data.report = fileUrl;
        res.render('reports/single', { data })
        console.log(data);
        await db.get().collection('reports').insertOne(data);
        // You can now use the fileUrl or send it back in the response as needed
    } catch (err) {
        console.error("Error uploading file:", err);
        res.status(500).json({ error: "Image upload failed" });
    }
});


module.exports = router;
