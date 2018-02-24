var orm = require('orm');
var config = require('../config');

var connection = null;

function setup(db, cb) {

	require('./base/user')(orm, db);
	require('./base/module')(orm, db);

	return cb(null, db);
}

module.exports = function(cb) {
	if (connection)
		return cb(null, connection);

	orm.connect(config.database, function(err, db) {
		if (err)
			return cb(err);

		connection = db;
		db.settings.set('instance.returnAllErrors', true);
		setup(db, cb);
	});
}
