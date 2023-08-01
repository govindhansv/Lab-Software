var express = require('express');
var router = express.Router();
const reports = require("../controllers/reports");
/* GET home page. */

router.get("/", reports.getReportPage);
router.get('/add/', reports.getAdd);
router.get('/edit/:id',reports.getEdit);
router.get('/:id', reports.getReportById);
router.get("/delete/:id", reports.deleteOne);
router.get("/all/", reports.getAllReports);

module.exports = router;