const express = require('express');
const multer = require('multer');
const path = require('path');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var assert = require('assert');
var http = require('http');
let date = require('date-and-time');
var session = require('express-session');
var logger = require('morgan');
var dateFormat = require('dateformat');
var moment = require('moment-timezone');

moment().tz("America/Toronto").format();

const now = new Date().toISOString().
  replace(/T/, ' ').
  replace(/\..+/, '')

var url = 'mongodb://localhost:27017/altainkhuder';

var todayDate = dateFormat(Date.now(), "yyyy-mm-dd");

const storage = multer.diskStorage({
	destination: './public/workersImage',
	filename: function(req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

const upload = multer({
	storage: storage
}).single('file');

exports.home = function(req, res) {
	console.log(moment);
	if(!req.session.user) {
		res.status(200).send();
		res.redirect('/login');
	}
	res.render('admin/index', {
		title : "Хоолны тасалбар хэвлэх хуудас",
		department_count : 12,
		add_count: 10,
		user_count: 20,
		ticket_count: 78
	});
};

exports.homePost =  function(req, res) {
	mongodb.connect(url, function(err, db) {
		db.collection('users').findOne({cardnumber:req.body.cardnumber}, function(err, item) {
	      	if(err || item == null) {
	      		res.render('index', {
					title : "Хоолны тасалбар хэвлэх хуудас",
					msg: "Алдаа гарлаа."
		      	});
	      		return console.error(err);
	      	} else {
	      		db.collection('ticketlogs').findOne({cardnumber:req.body.cardnumber, date:{$gte:todayDate}}, function(err, doc) {
	      			if(doc != null) {
	      				res.render('index', {
	      					title: "Хоолны тасалбар хэвлэх хуудас",
	      					msg: "Та хоолоо авсан байна."
	      				});
	      			} else {
	      				var obj = { cardnumber: req.body.cardnumber, date: now}
			      		db.collection('ticketlogs').insertOne(obj, function(err, result) {
							console.log(JSON.stringify(obj));
							db.close();
						});
						
						res.render('worker', {
							title : "Хоолны тасалбар хэвлэх хуудас",
							lastname: "Ажилтаны нэр: "+item.lastname,
							department: "Компани: " + item.department,
							path: item.file
				      	});
	      			}
	      			console.log(item);
	      		});
	      	}
    	});
	});
};

exports.login = function(req, res) {
	res.render('admin/login', {
		title: "Нэвтрэх"
	});
};

exports.loginPost = function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	mongodb.connect(url, function(err, db) {
		db.collection('admin').findOne({username: username, password: password}, function(err, user) {
			if(err) {
				console.log(err);
				return res.status(500).send();
			}
			if(!user) {
				return res.status(404).send();
			}
			req.session.user = user;
			console.log(req.session.user.department);
			res.redirect('/admin');
			return res.status(200).send();
		});
	});
};

exports.register = function(req, res) {
	if(!req.session.user) {
		res.status(200).send();
		res.redirect('/login');
	}

	var resultArray = [];
	mongodb.connect(url, function(err, db) {
		assert.equal(null, err);
		var cursor = db.collection('companies').find();
		cursor.forEach(function(doc, err) {
			assert.equal(null, err);
			resultArray.push(doc);
		}, function() {
			db.close();
			res.render('admin/register', {
				title : "Хоолны тасалбар хэвлэх хуудас",
				companies: resultArray
			});
		});
	});
};

exports.registerPost = function(req, res) {
	mongodb.connect(url, function(err, db) {
		upload(req, res, (err) => {
			if(err) {
				res.render('admin/register', {
					msg: err
				});
			} else {
				console.log('Success');
				// res.send(req.file);
				console.log(req.body.major);
				var obj = {firstname: req.body.firstname, lastname: req.body.lastname, department: req.body.department, major: req.body.major, date: req.body.date, cardnumber: req.body.cardnumber, user_count: req.body.user_count, registerDate: now, status: '1'}
				db.collection('users').insertOne(obj, function(err, result) {
					if(err) throw err;
					console.log('Item Inserted');
					db.close();
					res.render('admin/index', {msg: 'Амжилттай бүртгэгдлээ'});
					res.status(200).send();
				});
			}
		});
	});
};

exports.registerResource = function(req, res) {
	if(req.session.user.authentication != 0) {
		res.render('admin/index', {msg: 'Та хандах эрхгүй байна.'});
	}
	var resultArray = [];
	mongodb.connect(url, function(err, db) {
		assert.equal(null, err);
		var cursor = db.collection('companies').find();
		cursor.forEach(function(doc, err) {
			assert.equal(null, err);
			resultArray.push(doc);
		}, function() {
			db.close();
			res.render('admin/resources/add_resource', {
				title : "Хоолны тасалбар хэвлэх хуудас",
				companies: resultArray
			});
		});
	});
};

exports.registerResourcePost = function(req, res) {
	mongodb.connect(url, function(err, db) {
		upload(req, res, (err) => {
			if(err) {
				res.render('admin/register', {
					msg: err
				});
			} else {
				console.log('Success');
				var obj = {username: req.body.username, password: req.body.password, department: req.body.department, authentication: req.body.authentication, cardnumber: req.body.cardnumber, registeredDate: now};
				db.collection('admin').insertOne(obj, function(err, result) {
					if(err) throw err;
					console.log('Item Inserted');
					db.close();
					res.render('admin/index', {msg: 'Амжилттай бүртгэгдлээ'});
					res.status(200).send();
				});
			}
		});
	});
};

exports.getResources = function(req, res) {
	if(req.session.user.authentication != 0) {
		res.render('admin/index', {msg: 'Та хандах эрхгүй байна.'});
	}
	var resultArray = [];
	mongodb.connect(url, function(err, db) {
		assert.equal(null, err);
		db.collection('admin').aggregate([
		    {$lookup:
		       {	
		         from: 'companies',
		         localField: 'companyname',
		         foreignField: 'department',
		         as: 'company'
		       }
		     }
		    ]).toArray(function(err, cursor) {
			    if (err) throw err;

		    	// console.log(JSON.stringify(cursor[0].user));
				// var model = mongoXlsx.buildDynamicModel(cursor);
				// mongoXlsx.mongoData2Xlsx(cursor, model, function(err, cursor) {
				// 	console.log('File saved at:', cursor.fullPath);
				// });
				res.render('admin/resources/resources', {items: cursor});
				db.close();
			});
		// var cursor = db.collection('admin').find({});
		// cursor.forEach(function(doc, err) {
		// 	assert.equal(null, err);
		// 	resultArray.push(doc);
		// }, function() {
		// 	db.close();
		// 	res.render('admin/resources', {items: resultArray});
		// });
	});
};

exports.workers = function(req, res) {
	var id = req.params.id;
	if(!req.session.user) {
		res.status(200).send();
		res.redirect('/login');
	}

	var resultArray = [];
	mongodb.connect(url, function(err, db) {
		assert.equal(null, err);
		if(req.session.user.authentication == 0) {
			var cursor = db.collection('users').find({status: id});
		} else {
			console.log("Human Resources");
			var cursor = db.collection('users').find({department: req.session.user.department});
		}
		cursor.forEach(function(doc, err) {
			assert.equal(null, err);
			resultArray.push(doc);
		}, function() {
			db.close();
			res.render('admin/worker/workers', {items: resultArray});
		});
	});
};

exports.companies = function(req, res) {
	if(!req.session.user) {
		res.status(200).send();
		res.redirect('/login');
	};
	if(req.session.user.authentication != 0) {
		res.render('admin/index', {msg: 'Та хандах эрхгүй байна.'});
	};

	var resultArray = [];
	mongodb.connect(url, function(err, db) {
		assert.equal(null, err);
		var cursor = db.collection('companies').find();
		cursor.forEach(function(doc, err) {
			assert.equal(null, err);
			resultArray.push(doc);
		}, function() {
			db.close();
			res.render('admin/companies/companies', {items: resultArray});
		});
	});
};

exports.getCompanies = function(req, res) {
	if(!req.session.user) {
		res.status(200).send();
		res.redirect('/login');
	};
	if(req.session.user.authentication != 0) {
		res.status(200).send();
		res.render('admin/index', {msg: 'Та хандах эрхгүй байна.'});
	};
	
	res.render('admin/companies/add_companies');
};

exports.postCompanies = function(req, res) {
	mongodb.connect(url, function(err, db) {
		upload(req, res, (err) => {
			if(err) {
				res.render('admin/companies/add_companies', {
					msg: err
				});
			} else {
				console.log('Success');
				// res.send(req.file);
				var obj = {companyname: req.body.companyname, file: req.file.filename, date: now}
				db.collection('companies').insertOne(obj, function(err, result) {
					if(err) throw err;
					console.log('Item Inserted');
					db.close();
					res.render('admin/index', {msg: 'Амжилттай бүртгэгдлээ'});
					res.status(200).send();
				});
			}
		});
	});
};

exports.updateWorker = function(req, res) {
	mongodb.connect(url, function(err, db) {
		result = [];
		assert.equal(null, err);
		console.log(req.param('cardnumber'))
		var cursor = db.collection('users').find({cardnumber: req.param('cardnumber')});
		console.log(cursor);
		cursor.forEach(function(doc, err) {
			assert.equal(null, err);
			result.push(doc);
		}, function() {
			db.close();
			res.render('admin/worker/updateWorker', {items: result});
		});
	});
}

exports.postUpdateWorker = function(req, res) {
	mongodb.connect(url, function(err, db) {
		result = [];
		assert.equal(null, err);
		upload(req, res, (err) => {
			if(err) {
				res.render('admin/index', {
					msg: err
				});
			} else {
				console.log('Success');
				// res.send(req.file);
				var worker = {cardnumber: req.param('cardnumber')};
				var updatevalue = {$set: {firstname: req.body.firstname, lastname: req.body.lastname, major: req.body.major, status: req.body.status, user_count: req.body.user_count}};
				db.collection('users').updateOne(worker, updatevalue, function(err, result) {
				if(err) throw err;
					console.log("Updated");
					db.close();
					res.render('admin/index', {msg: 'Амжилттай засагдлаа'});
					res.status(200).send();
				});
			}
		});
	})
}

exports.postDeleteWorker = function(req, res) {
	var id = req.params.id;
	console.log(id);
	mongodb.connect(url, function(err, db) {
		db.collection('users').remove({cardnumber: id}, function(err) {
			if(err) throw error
			db.close();
			res.render('admin/index', {msg: 'Амжилттай устгагдлаа'});
			res.status(200).send();
		});
	});
}

exports.report = function(req, res) {
	if(!req.session.user) {
		res.status(200).send();
		res.redirect('/login');	
	};
	if(req.session.user.authentication != 0) {
		res.render('admin/index', {msg: 'Та хандах эрхгүй байна.'});
	};
	result = [];
	mongodb.connect(url, function(err, db) {
		assert.equal(null, err);
		var cursor = db.collection('ticketlogs').find();
		console.log(cursor);
		cursor.forEach(function(doc, err) {
			assert.equal(null, err);
			result.push(doc);
		}, function() {
			db.close();
			res.render('admin/report', {items: result});
		});
	});
};

//not Found
exports.notFound = function(req, res) {
	res.send("<h1>Ийм хуудас олдсонгүй</h1>")
};

module.exports = exports