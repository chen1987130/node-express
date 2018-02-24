var express = require('express');

var router = express.Router();

//跳转列表页面
router.get('/', function(req, res, next) {
	try {

		res.render('cron/task_list', {
			prop : req.properties
		});

	} catch (e) {
		next(e);
	}
});

module.exports = router;