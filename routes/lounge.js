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
	res.render('lounge/index', {
		title : "Ресторан",
	});
};

exports.ger_restaurant = function(req, res) {
	var obj;
	fs.readFile('./config/lounge/ger_restaurant.json', 'utf8', function (err, data) {
		if (err) throw err;
		obj = JSON.parse(data);
		console.log(JSON.stringify(obj.path));
		if(req.session.language == "Mn") {
			res.render('lounge/ger_restaurant', {
				title : obj.title_mn,
				texts : obj.text_mn,
				datas : obj.path
			});
		} else {
			res.render('lounge/ger_restaurant', {
				title : obj.title_en,
				texts : obj.text_en,
				datas : obj.path
			});
		}
	});
};

exports.terrace = function(req, res) {
	var obj;
	fs.readFile('./config/lounge/terrace.json', 'utf8', function (err, data) {
		if (err) throw err;
		obj = JSON.parse(data);
		console.log(JSON.stringify(obj.path));
		if(req.session.language == "Mn") {
			res.render('lounge/terrace', {
				title : obj.title_mn,
				texts : obj.text_mn,
				datas : obj.path
			});
		} else {
			res.render('lounge/terrace', {
				title : obj.title_en,
				texts : obj.text_en,
				datas : obj.path
			});
		}
	});
}

exports.delivery = function(req, res) {
	var obj;
	fs.readFile('./config/lounge/delivery.json', 'utf8', function (err, data) {
		if (err) throw err;
		obj = JSON.parse(data);
		console.log(JSON.stringify(obj.path));
		if(req.session.language == "Mn") {
			res.render('lounge/delivery', {
				title : obj.title_mn,
				texts : obj.text_mn,
				datas : obj.path
			});
		} else {
			res.render('lounge/delivery', {
				title : obj.title_en,
				texts : obj.text_en,
				datas : obj.path
			});
		}
	});
}

module.exports = exports