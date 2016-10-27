var Test = require('../models/test');
var app = require('../../app')
var _ = require('underscore');
var moment = require('moment')

exports.addTest = function(req,res){
		var _test=req.body;
		_test.owner=req.session.user._id;
		var test= new Test({
			_test
		})

		test.save(function(err,test){
			if(err){
				console.log(err)
			}
		    res.send(test)
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
	.findById(function(err,test){
		if(err){console.log(err)}
			res.send(test)
	})
}
//upload a new case
exports.uploadCase= function(){

}


