var Test = require('../models/test');
var app = require('../../app')
var _ = require('underscore');
var moment = require('moment');
var fs  = require('fs');
var path = require('path');


exports.addTest = function(req,res){
		var _test=req.body.test;
		_test.owner=req.session.user._id;

		var test= new Test(_test)

		test.save(function(err,test){
			if(err){
				console.log(err)
			}
			var id=test._doc._id;
			res.send({testId:test._doc._id,configId:test._doc.configId})
		    //res.redirect(req.get('referer'))
	})
}

exports.getAllTest = function(req, res){
	Test
	.find({})
	.populate('owner','userName')
	.populate('type','testType')
	.populate('project','name')
	.exec(function(err, tests){
		if(err){console.log(err)}
			res.send(tests)
	})
}

exports.getTest = function(req, res){
	var _id=req.params.id
	Test
	.findById(_id,function(err,test){
		if(err){console.log(err)}
			res.send(test)
	})
}
//upload a new case
exports.uploadCase= function(req,res,next){
	var caseData = req.files.uploadCase
	var filePath = caseData.path
	var originalFilename = caseData.originalFilename

	if(originalFilename){
		fs.readFile(filePath, function(err,data){
			var timestamp = Date.now();
			var type = caseData.type.split('/')[1];
			var newName = timestamp+'.'+'jmx';
			var newPath = path.join(__dirname,'../../','/public/upload/case/'+newName);

			fs.writeFile(newPath,data,function(err){
				console.log(err)
				res.send(newName)
				next()
			})
		})
	}else{next()}
}


