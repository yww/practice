var Task = require('../models/task');
var app = require('../../app')


exports.getAllTask = function(req, res){
	Task.fetch
		.populate('commitId', 'name')
		.exec(function(err, tasks){
				if(err){
					console.log(err)
				}
				console.log(tasks)
	})
}

exports.addTask = function(req,res){
	console.log(req)
	var _name = req;
	var _commitId=req.session.user._id;
	var task= new Task({
		name:_name,
		commitId:_commitId,
	})

	console.log(task)
	
	task.save(function(err,task){
		if(err){
			console.log(err)
		}
		console.log(task)
	})
}