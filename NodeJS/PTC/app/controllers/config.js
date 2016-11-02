var Config = require('../models/config');
var app = require('../../app')
var _ = require('underscore');
var moment = require('moment');
var fs  = require('fs');
var path = require('path');


exports.addConfig = function(req,res,next){
		var _config=req.body.config;
		var config= new Config(_config)

		config.save(function(err,config){
			if(err){
				console.log(err)
				next()
			}
		    req.body.test.configId=config._id;
		    next()
	})
}

exports.getConfig = function(req, res){
	var _id=req.params.id
	Config
	.findById(_id,function(err,config){
		if(err){console.log(err)}
			res.send(config)
	})
}



