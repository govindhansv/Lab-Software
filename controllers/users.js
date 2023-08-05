const { ObjectId } = require('mongodb');
const db = require('../connection');


const getHomePage = async function (req, res) {
    if (req.session.user) {
        let user = req.session.user;
    
        console.log(user);
        if (user.loggedIN == true) {
            console.log('called');
            res.render('users/index', { user: user.user });
    
        } else {
            console.log('fsiled');
            res.redirect('/auths/signup')
        }
    } else {
        console.log('fsilfdfd dfded');
        res.redirect('/auths/signup')
    }
  
}

const getAllReports = async function (req, res, next) {
    let user =req.session.user.user;
    console.log(user);
    let data = await db.get.collection('labreports').find({"phone":user.phone}).toArray();
    console.log(data);
    res.render('users/all', { data });
  }

exports.getAllReports = getAllReports;
exports.getHomePage = getHomePage;


