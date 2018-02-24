var crypto = require('crypto');

// 加密
exports.encrypt = function(key, secret) {
	var cipher = crypto.createCipher('aes192', secret);
	var enc = cipher.update(key, 'utf8', 'hex');
	enc += cipher.final('hex');
	return enc;
};

// 解密
exports.decrypt = function(key, secret) {
	var decipher = crypto.createDecipher('aes192', secret);
	var dec = decipher.update(key, 'hex', 'utf8');
	dec += decipher.final('utf8');
	return dec;
};
