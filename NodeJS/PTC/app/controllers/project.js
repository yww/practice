var Project = require('../models/project')
var Test = require('../models/test')
var app = require('../../app')
var _ = require('underscore')
var moment = require('moment')
var fs = require('fs')
var configObj = JSON.parse(fs.readFileSync(__dirname + '/../../config/config.json', 'utf8'))
var host = configObj.targetMachine.host

//Add a new project or update a existing project
exports.addProject = function(req,res){
	var id = req.body.project._id
	var projectObj = req.body.project
	var _project

	if(id){
		Project.findById(id,function(err,project){
			if(err){
				console.log(err)
			}else{
				_project = _.extend(project,projectObj)
				_project.save(function(err,project){
					res.redirect(req.get('referer'))
				})
			}
		})
	}else{
		projectObj.owner = req.session.user._id
		_project = new Project(projectObj)

		_project.save(function(err, project){
			if(err){
				console.log(err)
			}
			var node=[project.name, project.desc, project.owner, moment(project.meta.createAt).format('YYYY/MM/DD')]
			res.redirect(req.get('referer'))
		})
	}
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

exports.delProject = function(req,res){
	var id = req.params.id;
	if(id){
		Test
		.find({project:id})
		.exec(function(err,tests){
			if(tests.length>0){
				res.send({status:200, message:"Bad request, can not delete non-empty project"})
			}else{
				Project.remove({_id:id},function(err,project){
					res.send({status:200, message:"Deleted successfully"})
				})	
			}
		})
	}else{
		res.end();
	}
}