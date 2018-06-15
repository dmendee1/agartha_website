const express = require('express');
const multer = require('multer');
const path = require('path');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var assert = require('assert');
var http = require('http');
let date = require('date-and-time');
var session = require('express-session');
var profile = require('./routes/profile');
var logger = require('morgan');
var dateFormat = require('dateformat');
var adminRouter = require('./routes/admin');
var saunRouter = require('./routes/saun');
var loungeRouter = require('./routes/lounge');
var travelRouter = require('./routes/travel');
var locationRouter = require('./routes/location');
var contactRouter = require('./routes/contact');
var memoRouter = require('./routes/memo');
var additional_serviceRouter = require('./routes/additional_service');
var index = require('./routes/index');
var nodemailer = require('nodemailer');
// var resources = require('./routes/resources');

// const storage = multer.diskStorage({
// 	destination: './public/workersImage',
// 	filename: function(req, file, cb) {
// 		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
// 	}
// });

// const upload = multer({
// 	storage: storage
// }).single('file');

// var url = 'mongodb://localhost:27017/altainkhuder';

var app = express();

app.set('port', process.env.PORT || 8888);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: false
})); 
app.use(session({secret:"ui2hf893hf232ofn3023fp", resave: false, saveUninitialized: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});

app.use('/profile', profile);

// mongoose.connect('mongodb://localhost:27017/altainkhuder');

app.get('/', index.home);

app.get('/accommodation', index.accommodation);

app.get('/saun', saunRouter.home);

app.get('/saun/beauty', saunRouter.beauty);

app.get('/saun/massage', saunRouter.massage);

app.get('/saun/jakus', saunRouter.jakus);

app.get('/lounge', loungeRouter.home);

app.get('/lounge/ger_restaurant', loungeRouter.ger_restaurant);

app.get('/lounge/terrace', loungeRouter.terrace);

app.get('/lounge/delivery', loungeRouter.delivery);

app.get('/travel', travelRouter.home);

app.get('/travel/boat', travelRouter.boat);

app.get('/travel/moto', travelRouter.moto);

app.get('/travel/trip', travelRouter.trip);

app.get('/memo', memoRouter.home);

app.get('/contact', contactRouter.home);

app.get('/additional_service', additional_serviceRouter.home)

app.get('/additional_service/tennis', additional_serviceRouter.tennis);

app.get('/additional_service/sand_beach', additional_serviceRouter.sand_beach);

app.get('/additional_service/concert', additional_serviceRouter.concert);

app.get('/additional_service/kinder', additional_serviceRouter.kinder);

app.get('/additional_service/laundry', additional_serviceRouter.laundry);

app.get('/location', index.notFound);

app.get('/location/air', index.notFound);

app.get('/location/car', index.notFound);

app.get('/location/boat', index.notFound);

app.get('/language/:id', function(req, res) {
	var id = req.params.id;
	if(id == 0) {
		req.session.language = "Mn";
	} else {
		req.session.language = "En";
	}
	res.redirect(req.get('referer'));
});

app.post('/tosent', function(req, res) {
	var transporter = nodemailer.createTransport({
	  service: 'Gmail',
	  auth: {
	    user: 'mendeeshdee27@gmail.com',
	    pass: 'mendeeshdee27'
	  }
	});

	var mailOptions = {
	  from: 'mendeeshdee27@gmail.com',
	  to: 'mendeemendee9@gmail.com',
	  subject: "Агарта амралтын газарт санал хүсэлт ирсэн байна.",
	  text: req.body["name"] +'-ээс "'+ req.body['text'] + '" санал хүсэлт ирсэн байна.' + '\nХариу илгээх мэйл: ' + req.body['mail']
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
	    res.render('contact/index', {msg: "Амжилттай илгээгдлээ"});
	  }
	});
})

app.get('*', index.notFound);

var server = http.createServer(app).listen(app.get('port'), function(){
	console.log("Express Server listening on port " + app.get('port'));
});