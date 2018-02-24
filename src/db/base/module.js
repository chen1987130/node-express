module.exports = function(orm, db) {
	var User = db.define('base_module', {
		id : {
			type : 'serial',
			key : true
		},
		moduleName : {
			mapsTo : 'module_name',
			type : 'text',
		},
		moduleCode : {
			mapsTo : 'module_code',
			type : 'text'
		},
		moduleUrl : {
			mapsTo : 'module_url',
			type : 'text'
		},
		moduleDesc : {
			mapsTo : 'module_desc',
			type : 'text'
		},
		modulePid : {
			mapsTo : 'module_pid',
			type : 'integer'
		},
		moduleSort : {
			mapsTo : 'module_sort',
			type : 'integer'
		}
	}, {
		methods : {
			serialize : function() {
				return {
					id : this.id,
					moduleName : this.moduleName,
					moduleCode : this.moduleCode,
					moduleUrl : this.moduleUrl,
					moduleDesc : this.moduleDesc,
					modulePid : this.modulePid,
					moduleSort : this.moduleSort
				};
			}
		}
	});
};
