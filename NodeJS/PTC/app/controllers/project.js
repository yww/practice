var Project = require('../models/project');
var app = require('../../app')
var _ = require('underscore');
var moment = require('moment')

exports.addProject = function(req,res){
		var _project= req.body.project;
		_project.owner= req.session.user._id;

		var project= new Project(_project)
		
		project.save(function(err,project){
			if(err){
				console.log(err)
			}
		    res.send(project)
		})
}

exports.getProject = function(req,res){
	var _id=req.params.id
	Project
	.findById(_id, function(err, project){
		if(err){
			console.log(err)
		}
		res.send(project)
	})
}

exports.getAllProject = function(req, res){
	Project
	.find({})
	.populate('owner','userName')
	.exec(function(err, projects){
		if(err){console.log(err)}
			res.send(projects)
	})
}


