var express = require('express');
var router = express.Router();
const db = require('../connection');


/* GET home page. */
router.get('/', function (req, res) {
    db.get.collection('labreports').deleteMany({});
    db.get.collection('users').deleteMany({});
    res.send('Done');
});


module.exports = router;


