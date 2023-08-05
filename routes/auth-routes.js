const express = require("express");
const router = express.Router();
const authsController = require("../controllers/auths-controller");

// const {
//     requiredadmin
// } = require("../authentication");

// const hide = (req, res, next) => {
//     if (req.session.admin) {
//         res.redirect('/auths/admin/dashboard/')
//     } else {
//         next()
//     }
// }

// user


router.get('/signup', authsController.getSignup);
router.post("/signup", authsController.postSignup);
router.get('/signin', authsController.getSignin);
router.post("/signin", authsController.postSignin);
router.get("/logout", authsController.logOut);


module.exports = router;