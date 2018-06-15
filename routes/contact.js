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
	var obj;
	fs.readFile('./config/contact/contact.json', 'utf8', function (err, data) {
		if (err) throw err;
		obj = JSON.parse(data);
		console.log(JSON.stringify(obj.path));
		if(req.session.language == "Mn") {
			res.render('contact/index', {
				title : obj.title_mn,
				texts : obj.text_mn
			});
		} else {
			res.render('contact/index', {
				title : obj.title_en,
				texts : obj.text_en
			});
		}
	});
};

module.exports = exports