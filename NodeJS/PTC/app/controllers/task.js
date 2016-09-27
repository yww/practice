var Task = require('../models/task');
var app = require('../../app')


exports.getAllTask = function(req, res){
	var tasks = Task.fetch
	tasks.populate('commitId', 'name')
	tasks.exec(function(err, tasks){
				if(err){
					console.log(err)
				}
				console.log(tasks)
	})
}

exports.addTask = function(req,res){
	//console.log(req)
	var _name = req.body.name;
	var _commitId=req.session.user._id;
	console.log(_name)
	console.log(_commitId)
	var task= new Task({
		name:_name,
		commitId:_commitId,
	})
	
	console.log('TASK')
	console.log(task)
	task.save(function(err,task){
		if(err){
			console.log(err)
		}
		//console.log('task')
		//console.log(task)
	    res.send({status: 'success'})
	})
}