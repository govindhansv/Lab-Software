var express = require('express');
var router = express.Router();
const reports = require("../controllers/reports");

/* GET home page. */

router.get("/", reports.getReportPage);
router.get('/add/', reports.getAdd);
router.post("/add", reports.postAdd);
// router.get('/edit/:id',cartsController.getCartEditform);
// router.post("/edit", cartsController.editCart);
// router.get('/:id', cartsController.getCartById);
// router.get("/delete/:id", cartsController.deleteCart);

module.exports = router;