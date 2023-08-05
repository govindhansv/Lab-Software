const { ObjectId } = require('mongodb');
const db = require('../connection');

const getHomePage = async function (req, res) {
    let user = req.session.user;
    res.render('users/index', { user: user.user });

    // console.log(user);
    // if (req.session.loginstatus == true) {
    //     console.log('called');
    //     res.render('users/index', { user: user.user });

    // } else {
    //     console.log('fsiled');
    //     res.redirect('/auths/signup')
    // }
}


exports.getHomePage = getHomePage;


