'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var parser = require('ua-parser-js');




var getClientAddress = function (req) {
        return (req.headers['x-forwarded-for'] || '').split(',')[0] 
        || req.connection.remoteAddress;
};

module.exports = function (app, passport) {

	var clickHandler = new ClickHandler();


	app.route('/').get(function (req, res) {
		console.log(process.platform);
	    var ua = parser(req.headers['user-agent']);
		 res.json({ 
		 	ip: getClientAddress(req),
			lang: req.headers["accept-language"].split(',')[0],
			operation_system: ua.os.name + " " + ua.os.version  }); 
	});

};
