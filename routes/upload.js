var express = require('express');
var router = express.Router();
const fun = require('../functions');

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const db = require('../connection');
const { ObjectId } = require('mongodb');

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
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
        console.log(data);
        db.get.collection('labreports').insertOne(data).then(response => {
            let msgobj = {
                msg: `Hey ${data.name} Your ${data.test} result is ready. \n Details : \n ${data.description} \n ${data.phone}  \n ${data.paymentstatus}  \n \n Here the Url \n \n ${fileUrl} `,
                phone: 'whatsapp:+91' + data.phone
            }
            fun.SendWhtspSMS(msgobj)
            res.render('reports/single', { data })
        })
            .catch(err => console.log(err));
    } catch (err) {
        console.error("Error uploading file:", err);
        res.status(500).json({ error: "Image upload failed" });
    }
});

router.post("/report/edit", upload.single("newfile"), async function (req, res, next) {

    let data = req.body;
    // Check if a file was uploaded successfully
    if (req.file) {

        // Access the link to the uploaded file
        const fileUrl = req.file.path;
        console.log(fileUrl);
        data.report = fileUrl;
        console.log(data);

    }
    console.log(data);


    db.get.collection('labreports').updateOne({ _id: new ObjectId(data.id) }, {
        $set: data
    }).then(response => {
        if (response.modifiedCount === 1) {
            console.log('Document updated successfully!');
            // Additional logic or rendering if needed
            res.render('reports/single', { data })

        } else {
            console.log('No matching document found for the given ID.');
        }
    })
        .catch(error => {
            console.error('Error updating document:', error);

        });

});


module.exports = router;
