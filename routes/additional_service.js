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
	res.render('additional_service/index', {
		title : "Нэмэлт үйлчилгээ",
	});
};

exports.tennis = function(req, res) {
	var obj;
	fs.readFile('./config/additional_service/tennis.json', 'utf8', function (err, data) {
		if (err) throw err;
		obj = JSON.parse(data);
		console.log(JSON.stringify(obj.path));
		if(req.session.language == "Mn") {
			res.render('additional_service/tennis', {
				title : obj.title_mn,
				texts : obj.text_mn,
				datas : obj.path
			});
		} else {
			res.render('additional_service/tennis', {
				title : obj.title_en,
				texts : obj.text_en,
				datas : obj.path
			});
		}
	});
};

exports.sand_beach = function(req, res) {
	var obj;
	fs.readFile('./config/additional_service/sand_beach.json', 'utf8', function (err, data) {
		if (err) throw err;
		obj = JSON.parse(data);
		console.log(JSON.stringify(obj.path));
		if(req.session.language == "Mn") {
			res.render('additional_service/tennis', {
				title : obj.title_mn,
				texts : obj.text_mn,
				datas : obj.path
			});
		} else {
			res.render('additional_service/tennis', {
				title : obj.title_en,
				texts : obj.text_en,
				datas : obj.path
			});
		}
	});
}

exports.concert = function(req, res) {
	var obj;
	fs.readFile('./config/additional_service/concert.json', 'utf8', function (err, data) {
		if (err) throw err;
		obj = JSON.parse(data);
		console.log(JSON.stringify(obj.path));
		if(req.session.language == "Mn") {
			res.render('additional_service/concert', {
				title : obj.title_mn,
				texts : obj.text_mn,
				datas : obj.path
			});
		} else {
			res.render('additional_service/concert', {
				title : obj.title_en,
				texts : obj.text_en,
				datas : obj.path
			});
		}
	});
}

exports.kinder = function(req, res) {
	var obj;
	fs.readFile('./config/additional_service/kinder.json', 'utf8', function (err, data) {
		if (err) throw err;
		obj = JSON.parse(data);
		console.log(JSON.stringify(obj.path));
		if(req.session.language == "Mn") {
			res.render('additional_service/kinder', {
				title : obj.title_mn,
				texts : obj.text_mn,
				datas : obj.path
			});
		} else {
			res.render('additional_service/kinder', {
				title : obj.title_en,
				texts : obj.text_en,
				datas : obj.path
			});
		}
	});
}

exports.laundry = function(req, res) {
	var obj;
	fs.readFile('./config/additional_service/laundry.json', 'utf8', function (err, data) {
		if (err) throw err;
		obj = JSON.parse(data);
		console.log(JSON.stringify(obj.path));
		if(req.session.language == "Mn") {
			res.render('additional_service/laundry', {
				title : obj.title_mn,
				texts : obj.text_mn,
				datas : obj.path
			});
		} else {
			res.render('additional_service/laundry', {
				title : obj.title_en,
				texts : obj.text_en,
				datas : obj.path
			});
		}
	});
}

module.exports = exports