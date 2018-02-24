var express = require('express');
var eventproxy = require('eventproxy');
var _ = require('lodash');
var crypto = require('crypto');
var cookieParser = require('cookie-parser');

var config = require('../../config');
var dict = require('../../dict');
var cryptoUtil = require('../../util/crypto-util');

var router = express.Router();

// 跳转列表页面
router.get('/list', function(req, res, next) {
	try {
		res.render('base/user_list', {
			prop : req.properties,
			userStatusDic : dict.getDic('userStatus')
		});
	} catch (e) {
		next(e);
	}
});

// 跳转新增、修改、查看页面
router.get('/toAddOrUpdate', function(req, res, next) {

	try {
		var id = req.param('ID') || '';
		if (id !== '') {
			req.models.base_user.get(id, function(err, results) {
				if (err) {
					return next(err);
				}

				res.render('base/user_edit', {
					prop : req.properties,
					userStatusDic : dict.getDic('userStatus'),
					entity : results.serialize()
				});
			});
		} else {
			res.render('base/user_edit', {
				userStatusDic : dict.getDic('userStatus'),
				prop : req.properties,
				entity : {
					id : '',
					username : '',
					account : '',
					status : 1
				}
			});
		}
	} catch (e) {
		next(e);
	}
});

// 查询列表数据
router.get('/getTableList', function(req, res, next) {

	try {
		var o = req.param('iDisplayStart') || 0;
		var l = req.param('iDisplayLength') || 10;

		var statusQuery = req.param('statusQuery') || '';
		var userQuery = req.param('userQuery') || '';
		var baseQuery = req.param('baseQuery') || '';

		o = parseInt(o, 10);
		l = parseInt(l, 10);
		var ep = new eventproxy();

		var query = req.models.base_user.find();

		var condition = {
			query : '',
			value : []
		};

		if (statusQuery !== '') {
			if (condition.query !== '') {
				condition.query += ' and ';
			}
			condition.query += 'status = ?';
			condition.value.push(statusQuery);
		}
		if (userQuery !== '') {
			if (condition.query !== '') {
				condition.query += ' and ';
			}
			condition.query += '(username = ? or account = ?)';
			condition.value.push(userQuery);
			condition.value.push(userQuery);
		}
		if (baseQuery !== '') {
			if (condition.query !== '') {
				condition.query += ' and ';
			}
			condition.query += '(username = ? or account = ?)';
			condition.value.push(baseQuery);
			condition.value.push(baseQuery);
		}

		if (condition.query !== '') {
			query = query.where(condition.query, condition.value);
		}

		query.limit(l).offset(o).all(function(err, results) {
			if (err) {
				return next(err);
			}

			var items = results.map(function(m) {
				return m.serialize();
			});
			ep.emit('event_data', items);
		});

		query.count(function(err, results) {
			if (err) {
				return next(err);
			}

			ep.emit('event_count', results);
		});

		ep.all('event_data', 'event_count', function(data, total) {
			res.json({
				aaData : data,
				iTotalRecords : total,
				iTotalDisplayRecords : total
			});
		});
	} catch (e) {
		next(e);
	}

});

// 用户删除
router.get('/delete', function(req, res, next) {
	try {
		var id = req.param('ID');

		req.models.base_user.get(id, function(err, results) {
			if (err) {
				res.json({
					msg : '操作失败',
					status : 1
				});
			} else {
				results.remove(function(err) {
					if (err) {
						res.json({
							msg : '操作失败',
							status : 1
						});
					} else {
						res.json({
							status : 0
						});
					}
				});
			}
		});
	} catch (e) {
		console.log(e.stack);
		res.json({
			msg : '系统异常',
			status : 1
		});
	}
});

// 用户新增修改
router.all('/addOrUpdate', function(req, res, next) {

	try {
		var id = req.body.id || '';
		var repass = req.body.repass || '';

		// 修改
		if (id !== '') {

			var account = req.body.account;
			var username = req.body.username;
			var status = req.body.status;

			req.models.base_user.get(id, function(err, user) {
				if (err) {
					res.json({
						msg : '操作失败',
						status : 1
					});
				}

				if (repass === '1') {
					user.password = crypto.createHash('md5').update(config.password).digest('hex');
				}

				user.username = username;
				user.account = account;
				user.status = status;
				user.save(function(err) {
					if (err) {
						res.json({
							msg : '操作失败',
							status : 1
						});
					} else {
						res.json({
							status : 0
						});
					}
				});
			});
		} else {

			// 新增
			var params = _.pick(req.body, 'username', 'account', 'status');

			var password = crypto.createHash('md5').update(config.password).digest('hex');

			params.password = password;

			var query = req.models.base_user.find({
				'account' : params.account
			});

			query.all(function(err, results) {
				if (err) {
					return next(err);
				}

				if (results.length === 0) {
					req.models.base_user.create(params, function(err, message) {
						if (err) {
							res.json({
								msg : '操作失败',
								status : 1
							});
						} else {
							res.json({
								status : 0
							});
						}
					});
				} else {
					res.json({
						msg : '账户已存在',
						status : 1
					});
				}
			});

		}
	} catch (e) {
		console.log(e.stack);
		res.json({
			msg : '系统异常',
			status : 1
		});
	}

});

// 登陆
router.get('/login', function(req, res, next) {
	try {
		var username = req.param('username') || '';
		var password = req.param('password') || '';
		var remember = req.param('remember') || '';
		if (username !== null && password !== null) {

			password = crypto.createHash('md5').update(password).digest('hex');

			var query = req.models.base_user.find({
				'account' : username,
				'password' : password
			});

			query.all(function(err, results) {
				if (err) {
					return next(err);
				}

				if (results.length > 0) {
					var user = results[0].serialize();
					var token = {};
					token.username = user.username;
					token.account = user.account;

					var key = cryptoUtil.encrypt(JSON.stringify(token), config.tokenKey);
					if (remember === "1") {
						res.cookie('token', key, {
							path : '/',
							expires : new Date(Date.now() + 7 * 24 * 3600 * 1000)
						});
					} else {
						res.cookie('token', key, {
							path : '/'
						});
					}

					res.json({
						status : 0
					});

				} else {
					res.json({
						msg : '用户名或密码错误',
						status : 1
					});
				}
			});

		} else {
			res.json({
				msg : '用户名密码不能为空',
				status : 1
			});
		}
	} catch (e) {
		console.log(e.stack);
		res.json({
			msg : '系统异常',
			status : 1
		});
	}

});

module.exports = router;
