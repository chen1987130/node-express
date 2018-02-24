var dict = require('../../dict');

module.exports = function(orm, db) {
	var User = db.define('base_user', {
		id : {
			type : 'serial',
			key : true
		},
		account : {
			type : 'text'
		},
		password : {
			type : 'text'
		},
		username : {
			type : 'text'
		},
		status : {
			type : 'integer'
		}
	}, {
		methods : {
			serialize : function() {
				return {
					id : this.id,
					account : this.account,
					password : this.password,
					username : this.username,
					status : this.status,
					statusView : dict.getValueByKey('userStatus', this.status)
				};
			}
		}
	});
};
