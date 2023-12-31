const { ObjectId } = require('mongodb');
const db = require('../connection');
// const errorhandler = require('../errorhandler');
// const targetUrl = 'https://example.com';

const getReportPage = async function (req, res) {
  // errorhandler.captureScreenshotAndUpload('https://pptr.dev/');
  let users = await db.get.collection('users').find({}).toArray();
  console.log(users);
  res.render('reports/index',{users});
}

const getAdd = async function (req, res) {
  res.render('reports/add');
}

const getEdit = async function (req, res) {
  let id = req.params.id;
  let data = await db.get.collection('labreports').findOne({ _id: new ObjectId(id )  });

  if (data.paymentstatus== 'done'  ) {
    data.paymentstatus = true;
  } else {
    data.paymentstatus = false;
  }
  
  res.render('reports/edit', { data });
}

const getReportById = async function (req, res, next) {
  let id = req.params.id;
  let data = await db.get.collection('labreports').findOne({ _id: new ObjectId(id )  })
  res.render('reports/single', { data });
}

const getAllReports = async function (req, res, next) {
  let data = await db.get.collection('labreports').find({}).toArray();
  res.render('reports/all', { data });
}

const deleteOne = async function (req, res, next) {
  try {
     db.get.collection('labreports').deleteOne({ _id:new ObjectId(req.params.id ) });
    res.redirect('/reports/all/')
  } catch (error) {
    console.log(error);
  }
}

exports.getReportPage = getReportPage;
exports.getAdd = getAdd;
exports.getEdit = getEdit;
exports.deleteOne = deleteOne;
exports.getReportById = getReportById;
exports.getAllReports = getAllReports;

