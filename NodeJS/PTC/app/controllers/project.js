var Project = require('../models/project');
var app = require('../../app')
var _ = require('underscore')
var moment = require('moment')
var fs = require('fs')
var configObj = JSON.parse(fs.readFileSync(__dirname + '/../../config/config.json', 'utf8'))
var host = configObj.targetMachine.host

exports.addProject = function(req,res){
		var _project= req.body.project;
		_project.owner= req.session.user._id;

		var project= new Project(_project)
		
		project.save(function(err,project){
			if(err){
				console.log(err)
			}
			var node=[project.name, project.desc, project.owner, moment(project.meta.createAt).format('YYYY/MM/DD')]
		    res.redirect(req.get('referer'))
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
		var _projects=[];
		for(var i in projects){
			var subProject=[{name:projects[i].name,id:projects[i]._id}, projects[i].desc, projects[i].owner.userName, moment(projects[i].meta.createAt).format('YYYY/MM/DD')]
			_projects.push(subProject)
		}
		res.send(_projects)
	})
}