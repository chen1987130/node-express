var path = require('path');

var settings = {
	tokenKey : 'jiami',
	password : '123456',
	basePath : 'http://127.0.0.1:3000/',
	httpPath : 'http://127.0.0.1:8089/',
	database : {
		protocol : "mysql", // or "mysql"
		query : {
			pool : true,
			debug : true
		},
		port : '3306',
		host : "127.0.0.1",
		database : "node",
		user : "root",
		password : "123456"
	}
};

module.exports = settings;
