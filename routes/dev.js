var express = require('express');
var router = express.Router();
const db = require('../connection');


/* GET home page. */
router.get('/', function (req, res) {
    db.get.collection('labreports').deleteMany({});
    db.get.collection('users').deleteMany({});
    res.send('Done');
});
router.get('/products', function (req, res) {

    const dproducts = [
        {
            title: 'Iphone 1',
            image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-12-3.jpg',
            price: 19.99,
        },
        {
            title: 'Product 2',
            image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-12-3.jpg',
            price: 24.99,
        },
        {
            title: 'Android 2',
            image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-12-3.jpg',
            price: 24.99,
        },
        // Add more products here
    ];

    res.json(dproducts);
});


module.exports = router;


