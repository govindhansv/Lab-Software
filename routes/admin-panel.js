var express = require('express');
var router = express.Router();
const admin = require("../controllers/admin-panel");
/* GET home page. */

router.get("/", admin.getAdminPage);
// router.get('/add/', reports.getAdd);
// router.get("/all/", reports.getAllReports);
// router.get('/edit/:id',reports.getEdit);
// router.get("/delete/:id", reports.deleteOne);
// router.get('/:id', reports.getReportById);

module.exports = router;