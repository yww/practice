//Task control. Start/Monitor/Kill JMeter, update database status
var fs = require('fs')
var SSH = require('simple-ssh')
var Task = require('../models/task')

var moment = require('moment')


//Read confirguration from config.json
var configObj = JSON.parse(fs.readFileSync(__dirname + '/../../config/config.json', 'utf8'))

//new SSH connection
var SSHObj = {
    host: configObj.targetMachine.host,
    user: configObj.targetMachine.user,
    pass: configObj.targetMachine.pass
}
function startTask(doc){
	var ssh = new SSH(SSHObj)
	ssh.exec('nohup sleep 300 & echo $!',{out: function(pId){
		
		doc.pId = parseInt(pId)
		doc.save(function(err, doc){
			if (err){
				console.log(err)
			} 
		})
		}}).start()
	}

function killTask(doc){
	ssh
	.exec('kill -9 '+doc.pId,{
		exit: function(code){
			if(code ===1){
				console.log('no such task')
			}
		},
		out:function(result){
		console.log(result)
	}}).start()
}

function copyFile(pid){
	//copy file from target machine
}


// Below functions will be invoked in interval loop 

// if there are pending tasks, execute it accordingly Status: 1 pending, 2 running, 3 finished, 4 killed, 5 unknown
exports.execTask = function(){

	var runningTasks 
	Task.find({status:2}).count(function(err,count){
		if(err){
			console.log(err)
		}else{
			console.log(count);
			runningTasks=count
				var maxConTasks = configObj.maxConTasks;
			if(runningTasks<maxConTasks){
				console.log('execTask...')
				Task
				.find({status:1})
				.sort({'meta.recordAt':'desc'})
				.limit(1)
				.exec(function(err, tasks){
					var _task = tasks[0]
					_task.status=2
					_task.save(function(err,task){
						if(err){console.log(err)}
						startTask(_task)
					})
				})
			}else{
				return
			}
		}
	})
}

//Finish task
exports.FinishTask = function(){
	Task
	.find({status:2})
	.exec(
		function(err, tasks){
			if(err){
				console.log(err)
			}
			tasks.forEach(function(t) {
				var ssh = new SSH(SSHObj)
				ssh
				.exec('ps -p '+t.pId+' -o s=',{exit: function(code) {
					if (code === 1) {
						t.status = 3
						t.save()
					}
				}}).start()
			})
		}
	)
}

//kill expired tasks
exports.killExpired = function(){
	//read maximum duration (min *60*1000-> s) time from config file
	var maxDurTime = configObj.maxDurTime*60*1000
	Task
	.find({status:2})
	.exec(
		function(err,tasks){
			if(err){
				console.log(err)
			}
			tasks.forEach(function(t){
				var duration = Date.now()-t.meta.startAt.getTime()
				console.log(duration)

				if(duration>=maxDurTime){
					t.status = 4
					t.save(function(err){
						if(err){
							console.log(err)
						}
						killTask(t)
					})
				}
			})
	})
}

//copy logs. To copy logs from target machine to localhost
exports.parseLog = function(){
	Task
	.find({status:3, logFile: false})
	.exec(function(err, tasks){
		if(err){
			return console.log(err)
		}else{
			for(i in tasks){
				copyFile(tasks[i].pid)
			}
		}
	})
}

