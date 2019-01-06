var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");

//mongodb://<dbuser>:<dbpassword>@ds257752.mlab.com:57752/kusani
var db = mongojs("mongodb://Droidbot:Indiza__2018@ds257752.mlab.com:57752/kusani", ["lines"]);

//Get AllLines by city and emit track by user
router.get("/linesDisplay/:cityID", function(req, res, next){
	var io = req.app.io;   
    db.lines.find({city: req.params.cityID},function(err, liners){
        if (err){
            res.send(err);
        }
        res.send(liners);
        io.emit("trackLine", liners);
    });
});
router.get("/lines", function(req,res, next){
	db.lines.find(function(err,lines){
		if(err){
			res.send(err);
		}
		res.json(lines);
	})
});
//Get a Ligne whith his datas
router.get("/line/:id", function(req, res, next){
	var io = req.app.io;
	console.log(req.params)
	db.lines.findOne({lineId: req.params.id}, function(err, liner){
		if(err){
			res.send(err);
		}
		res.send(liner);
	})
});


// Ajouter une nouvelle ligne et definir sa route
router.get("/lines/", function(req, res, next){
console.log(req.params)
	var line = {
    "lineId": "55E",
    "lineName": "ligne 5",
    "distance": "40500",
    "city": "5c2f1453fb6fc02c41a58ce2",
    "startpoint": {
        "type": "Point",
        "coordinates": [
            11.5394185,
            3.8448469
        ]
    },
    "endpoint": {
        "type": "Point",
        "coordinates": [
            11.5394185,
            3.8448469
        ]
    },
    "estimated": "35",
    "fare": "250"
}
	var io = req.app.io;
	
	if(!line.libelle){
		res.status(400);
		res.json({
			error:"Bad data"
		});	
	}else {
	db.line.save(line, function(err, savedLine){
		if(err){
			res.send(err)
		}
		res.json(savedLine);
	});

	}
});

module.exports = router;