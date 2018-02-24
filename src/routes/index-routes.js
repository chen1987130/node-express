var express = require('express');

var events = require('events');

var router = express.Router();

router.get('/', function(req, res, next) {
	try {
		res.render('index', {
			prop : req.properties
		});
	} catch (e) {
		next(e);
	}
});

router.get('/login', function(req, res, next) {
	try {
		res.render('login', {
			prop : req.properties
		});
	} catch (e) {
		next(e);
	}
});

// 注销
router.get('/logout', function(req, res, next) {
	try {
		res.clearCookie('token');
		res.redirect('/login');
		return;
	} catch (e) {
		next(e);
	}
});

module.exports = router;
