var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");

var db = mongojs("mongodb://Droidbot:Indiza__2018@ds257752.mlab.com:57752/kusani", ["checkpoints"]);

//Tous les checkOints d'une ligne
router.get("/checkpoints/:lineID", function(req, res, next){
	var io = req.app.io;   
    db.checkpoints.find({line: req.params.lineID},function(err, checkers){
        if (err){
            res.send(err);
        }
        res.send(checkers);
        io.emit("trackLine", checkers);
    });
});
//Tous les checkpoints de la Base de données
router.get("/checkpoints/", function(req,res, next){
	db.checkpoints.find(function(err,checkpoints){
		if(err){
			res.send(err);
		}
		res.json(checkpoints);
	})
});
//Un checkpoints en particulier
router.get("/checkpoint/:id", function(req, res, next){
	var io = req.app.io;
	console.log(req.params)
	db.checkpoints.findOne({checkID: req.params.id}, function(err, checker){
		if(err){
			res.send(err);
		}
		res.send(checker);
	})
});

module.exports = router;