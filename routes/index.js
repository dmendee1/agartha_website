const express = require('express');
const multer = require('multer');
const path = require('path');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var assert = require('assert');
var http = require('http');
var dateFormat = require('dateformat');
var moment = require('moment-timezone');
var fs = require('fs');

const now = dateFormat(moment(), "yyyy-mm-dd HH:MM:ss");

var url = 'mongodb://localhost:27017/altainkhuder';

var todayDate = dateFormat(Date.now(), "yyyy-mm-dd");

var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'public/uploads/')
	},
	filename: function(req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now)
	}
});

var upload = multer({storage: storage}).single('avatar');

exports.home = function(req, res) {
	if(!req.session.language) {
		req.session.language = "En";
	}
	console.log(dateFormat(moment(), "yyyy-mm-dd HH:MM:ss"));
	console.log(now);
	console.log(dateFormat(Date.now(), "yyyy-mm-dd"));
	res.render('index', {
		title: "Агарта цогцолбор"
	});
};

exports.accommodation = function(req, res) {
	var obj;
	fs.readFile('./config/accommodation/index.json', 'utf8', function (err, data) {
		if (err) throw err;
		obj = JSON.parse(data);
		console.log(JSON.stringify(obj.path));
		if(req.session.language == "Mn") {
			res.render('accommodation/index', {
				title : obj.title_mn,
				texts : obj.text_mn,
				datas : obj.path
			});
		} else {
			res.render('accommodation/index', {
				title : obj.title_en,
				texts : obj.text_en,
				datas : obj.path
			});
		}
	});
}

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
	      			console.log(todayDate);
	      			if(doc != null) {
	      				res.render('index', {
	      					title: "Хоолны тасалбар хэвлэх хуудас",
	      					msg: "Та хоолоо авсан байна."
	      				});
	      			} else {
	      				var obj = { cardnumber: req.body.cardnumber, firstname: item.firstname, lastname: item.lastname, major: item.major, department: item.department, date: now}
			      		db.collection('ticketlogs').insertOne(obj, function(err, result) {
							console.log(JSON.stringify(obj));
							db.close();
						});
						
						db.collection('companies').findOne({companyname: item.department}, function(err, department) {
							res.render('worker', {
								title : "Хоолны тасалбар хэвлэх хуудас",
								firstname: "Овог: "+item.firstname,
								lastname: "Нэр: "+item.lastname,
								major: "Албан тушаал: "+item.major,
								path: department.file
					      	});
						});
	      			}
	      			console.log(item);
	      		});
	      	}
    	});
	});
};

//not Found
exports.notFound = function(req, res) {
	res.render('layout/notFound');
};

module.exports = exports