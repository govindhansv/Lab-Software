var express = require('express');
var router = express.Router();
const users = require("../controllers/users");

/* GET home page. */

router.get("/", users.getHomePage);

module.exports = router;


