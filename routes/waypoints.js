var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");

var db = mongojs("mongodb://Droidbot:Indiza__2018@ds257752.mlab.com:57752/kusani", ["waypoints"]);

//Tous les checkOints d'une ligne
router.get("/waypoints/:lineID", function(req, res, next){
	var io = req.app.io;   
    db.waypoints.find({line: req.params.lineID},function(err, points){
        if (err){
            res.send(err);
        }
        res.send(points);
        io.emit("trackLine", points);
    });
});
//Tous les checkpoints de la Base de données
router.get("/waypoints/", function(req,res, next){
	db.waypoints.find(function(err,waypoints){
		if(err){
			res.send(err);
		}
		res.json(waypoints);
	})
});
//Tous les checkpoints de la Base de données contenant le text ?
router.get("/waypointname/:text", function(req,res, next){
	db.waypoints.find({wayp_name: {$regex: ".*" + req.params.text + ".*"} }, function(err,waypoints){
		if(err){
			res.send(err);
		}
		res.json(waypoints);
	})
});
//Un checkpoints en particulier
router.get("/waypoint/:id", function(req, res, next){
	var io = req.app.io;
	console.log(req.params)
	db.waypoints.findOne({checkID: req.params.id}, function(err, waypoint){
		if(err){
			res.send(err);
		}
		res.send(waypoint);
	})
});

module.exports = router;