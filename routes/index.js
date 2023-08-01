var express = require('express');
var router = express.Router();

//For error handling 
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Aswini Lab' });
});


module.exports = router;


