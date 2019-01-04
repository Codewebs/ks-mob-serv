var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");

//mongodb://<dbuser>:<dbpassword>@ds257752.mlab.com:57752/kusani
var db = mongojs("mongodb://Droidbot:Indiza__2018@ds257752.mlab.com:57752/kusani", ["lines"]);

//Get AllLines by city and emit track by user
router.get("/linesDisplay/:cityID", function(req, res, next){
	var io = req.app.io;
    console.log(req);
    db.commercesLocation.find({city: req.params.city},function(err, liners){
        if (err){
            res.send(err);
        }
        res.send(liners);
        io.emit("trackLine", liners);
    });
});

//Get a Ligne whith his datas
router.get("/line/:id", function(rea, res, next){
	var io = req.app.io;
	db.lines.findOne({lineId:req.params.id}, function(err, liner){
		if(err){
			res.send(err);
		}
		res.send(liner);

	})
})


// Ajouter une nouvelle ligne et definir sa route
router.post("/addline/", function(req, res, next){
	var line = req.body.data;
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