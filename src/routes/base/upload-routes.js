var express = require('express');
var fs = require('fs');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var router = express.Router();

router.all('/index', function(req, res, next) {

	try {
		res.render('base/upload', {});
	} catch (err) {
		console.log(err.stack);
	}

});

router.post('/file-upload', multipartMiddleware, function(req, res, next) {

	try {
		// 获得文件的临时路径
		var tmp_path = req.files.thumbnail.path;
		// 指定文件上传后的目录 - 示例为"images"目录。
		var target_path = 'C://image/' + req.files.thumbnail.name;
		// 移动文件
		fs.rename(tmp_path, target_path, function(err) {
			if (err)
				throw err;
			// 删除临时文件夹文件,
			fs.unlink(tmp_path, function() {
				if (err)
					throw err;
				res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
			});
		});
	} catch (err) {
		console.log(err.stack);
	}

});

module.exports = router;
