var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'public/uploads/')
	},
	filename: function(req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now)
	}
});

var upload = multer({storage: storage}).single('avatar');

router.post('/', function(req, res) {
	upload(req, res, function(err) {
		if(err) {
			console.log('Error register from profile');
			res.status(401).send();
		} else {
			res.status(200).send();
		}
	});
});

module.exports = router;