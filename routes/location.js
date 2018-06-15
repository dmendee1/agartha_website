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

exports.home = function(req, res) {
	res.render('location/index', {
		title : "Аялах",
	});
};
exports.air = function(req, res) {
	res.render('location/air', {
		title : "Агаараар аялах",
	});
};

exports.car = function(req, res) {
	res.render('location/car', {
		title : "Машинаар аялах"
	})
}

exports.boat = function(req, res) {
	res.render('location/boat', {
		title : "Завиар аялах"
	})
}

module.exports = exports