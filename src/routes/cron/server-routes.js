var express = require('express');
var config = require('../../config');
var log = require('../../util/log-util');
var request = require('request-json');
var router = express.Router();

// 跳转列表页面
router.get('/', function(req, res, next) {
	try {

		var client = request.newClient(config.httpPath);
		client.post('cronServer/getServerStatus', {}, function(err, response, body) {
			log.httpLog('cronServer/getServerStatus', body);

			if (body.flag === '0') {
				res.render('cron/server_list', {
					prop : req.properties,
					data : body.data
				});
			}
		});

	} catch (e) {
		next(e);
	}
});

module.exports = router;