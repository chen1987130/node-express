var express = require('express');

var router = express.Router();

function converModuleToMenu(items, pid) {
	var menus = [];
	pid = pid || 0;

	items.forEach(function(item, i) {
		if (item.modulePid === pid) {
			var m = {
				id : item.id,
				name : item.moduleName,
				code : item.moduleCode,
				url : item.moduleUrl
			};

			var child = converModuleToMenu(items, item.id);
			if (child !== null && child.length > 0) {
				m.children = child;
			}

			menus.push(m);
		}
	});
	return menus;
}

router.all('/getMenu', function(req, res, next) {

	try {
		req.models.base_module.find().order("moduleSort").all(function(err, results) {
			if (err) {
				res.json({
					status : 1
				});
			}

			var items = results.map(function(m) {
				return m.serialize();
			});

			var menus = converModuleToMenu(items);

			res.json({
				data : menus,
				status : 0
			});

		});
	} catch (err) {
		console.log(err.stack);
		res.json({
			status : 1
		});
	}

});

module.exports = router;
