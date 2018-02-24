module.exports = function(orm, db) {
	var User = db.define('tools_http_alias', {
		id : {
			type : 'serial',
			key : true
		},
		alias : {
			type : 'text'
		},
		beta : {
			type : 'text'
		},
		preview : {
			type : 'text'
		},
		online : {
			type : 'text'
		}
	}, {
		methods : {
			serialize : function() {
				return {
					id : this.id,
					alias : this.alias,
					beta : this.beta,
					preview : this.preview,
					online : this.online
				};
			}
		}
	});
};
