var dict = {};

dict.userStatus = [ {
	key : 1,
	value : '启用'
}, {
	key : 0,
	value : '禁用'
} ];

exports.getValueByKey = function(name, key) {
	var result = '';
	if (name !== '' && key !== '') {
		var d = dict[name];
		if (typeof (d) !== 'undefined' && d !== '') {
			d.forEach(function(item) {
				if (item.key === key) {
					result = item.value;
					return false;
				}
			});
		}
	}
	return result;
};

exports.getDic = function(name) {
	name = name || '';
	if (name !== '') {
		return dict[name];
	}
	return null;
};