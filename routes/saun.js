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
var fs = require('fs');

exports.home = function(req, res) {
	res.render('saun/index', {
		title : "Гоо сайхан",
	});
};


exports.beauty = function(req, res) {
	var obj;
	fs.readFile('./config/saun/beauty.json', 'utf8', function (err, data) {
		if (err) throw err;
		obj = JSON.parse(data);
		console.log(JSON.stringify(obj.path));
		if(req.session.language == "Mn") {
			res.render('saun/beauty', {
				title : obj.title_mn,
				texts : obj.text_mn,
				datas : obj.path
			});
		} else {
			res.render('saun/beauty', {
				title : obj.title_en,
				texts : obj.text_en,
				datas : obj.path
			});
		}
	});
};

exports.massage = function(req, res) {
	var obj;
	fs.readFile('./config/saun/massage.json', 'utf8', function (err, data) {
		if (err) throw err;
		obj = JSON.parse(data);
		console.log(JSON.stringify(obj.path));
		if(req.session.language == "Mn") {
			res.render('saun/massage', {
				title : obj.title_mn,
				texts : obj.text_mn,
				datas : obj.path
			});
		} else {
			res.render('saun/massage', {
				title : obj.title_en,
				texts : obj.text_en,
				datas : obj.path
			});
		}
	});
}

exports.jakus = function(req, res) {
	var obj;
	fs.readFile('./config/saun/jakus.json', 'utf8', function (err, data) {
		if (err) throw err;
		obj = JSON.parse(data);
		console.log(JSON.stringify(obj.path));
		if(req.session.language == "Mn") {
			res.render('saun/jakus', {
				title : obj.title_mn,
				texts : obj.text_mn,
				datas : obj.path
			});
		} else {
			res.render('saun/jakus', {
				title : obj.title_en,
				texts : obj.text_en,
				datas : obj.path
			});
		}
	});
}

module.exports = exports