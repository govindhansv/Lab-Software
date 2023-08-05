var express = require('express');
var router = express.Router();
const users = require("../controllers/users");

/* GET home page. */

router.get("/", users.getHomePage);
router.get("/reports/", users.getAllReports);

module.exports = router;


