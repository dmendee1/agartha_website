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
const config = require('config');

exports.home = function(req, res) {
	res.render('travel/index', {
		title : "Аялал",
	});
};

exports.boat = function(req, res) {
	var obj;
	fs.readFile('./config/travel/boat.json', 'utf8', function (err, data) {
		if (err) throw err;
		obj = JSON.parse(data);
		console.log(JSON.stringify(obj.path));
		if(req.session.language == "Mn") {
			res.render('travel/boat', {
				title : obj.title_mn,
				texts : obj.text_mn,
				datas : obj.path
			});
		} else {
			res.render('travel/boat', {
				title : obj.title_en,
				texts : obj.text_en,
				datas : obj.path
			});
		}
	});
};

exports.moto = function(req, res) {
	var obj;
	fs.readFile('./config/travel/moto.json', 'utf8', function (err, data) {
		if (err) throw err;
		obj = JSON.parse(data);
		console.log(JSON.stringify(obj.path));
		if(req.session.language == "Mn") {
			res.render('travel/moto', {
				title : obj.title_mn,
				texts : obj.text_mn,
				datas : obj.path
			});
		} else {
			res.render('travel/moto', {
				title : obj.title_en,
				texts : obj.text_en,
				datas : obj.path
			});
		}
	});
}

exports.trip = function(req, res) {
	var obj;
	fs.readFile('./config/travel/trip.json', 'utf8', function (err, data) {
		if (err) throw err;
		obj = JSON.parse(data);
		console.log(JSON.stringify(obj.path));
		if(req.session.language == "Mn") {
			res.render('travel/trip', {
				title : obj.title_mn,
				texts : obj.text_mn,
				datas : obj.path
			});
		} else {
			res.render('travel/trip', {
				title : obj.title_en,
				texts : obj.text_en,
				datas : obj.path
			});
		}
	});
}
module.exports = exports