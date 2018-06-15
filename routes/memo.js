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
	if(req.session.language == "En") {
		res.render('memo/index', {
			title : "Remark"
		});
	} else {
		res.render('memo/index', {
			title : "Санамж"
		});
	}
};

module.exports = exports