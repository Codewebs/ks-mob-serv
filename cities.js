var express = require('express')

var router = express.Router();
var mongojs = require('mongojs');

var db = mongojs("mongodb://Droidbot:Indiza__2018@ds257752.mlab.com:57752/kusani", ["cities"]);

router.get('/cities/', function(req, res, next){
	var io = req.app.io;

	db.cities.find(function(err, cities){
		if(err){
			res.send(err);
		}
		res.json(cities);
	})

});

module.exports = router;