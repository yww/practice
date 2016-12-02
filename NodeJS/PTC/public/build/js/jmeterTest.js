//used by JMeter test page (pressTesting.html)
$(document).ready(function(){
	$('#launchTest').click(commitTest);
	$('#saveTest').click(checkParams);
	
	showTasks();
	showProjects();
})


//check if all mandantory params are provided before submit test
function checkParams(e){
	var caseName=$("input[name='caseName']").val();
	var name=$("input[name='testName']").val();
	var project=$("select[name='project'] option:selected" ).attr("id");

	if(caseName&&name&&project){
		return
	}else{
		alert('please input mandantory value')
		e.stopPropagation()
	}
}

//submit a test to server
function commitTest(){
	//construct config object
	var configObj={}
	var config=["host","users","rampup","duration","iteration"]

	config.forEach(function(c){
		var inputVal=$("input[name="+c+"]").val()
		if(inputVal){
			configObj[c]=inputVal			
		}
	})

	//constuct test object
	var testObj={}
	var test= ["caseName","testName"]
	test.forEach(function(c){
		var inputVal=$("input[name="+c+"]").val()
		if(inputVal){
		testObj[c]=inputVal			
		}
	})
	testObj.project=$("select[name='project'] option:selected" ).attr("id")

	var dataObj={"config":configObj,"test":testObj}

	//send ajax to server
	$.ajax({
		contentType: 'application/json',
		type: 'POST',
		url: '/test',
		data:JSON.stringify({"test":testObj,"config":configObj})
	}).done(function(result){
         new PNotify({
          title: 'Success',
          text: 'Test has been added, you can track execution status in below',
          type: 'info',
          styling: 'bootstrap3',
          addclass: "stack-modal"
      })

		setTimeout(function(){addTask(result)},1500)

	})
}

//get available projects and show in dropdown list
function showProjects(){
	//to get all projects from server side
	$.ajax({
		type: 'GET',
		url: '/project',
	}).done(function(projects){
		projects.forEach(function(p){
			$("select[name='project']").append( "<option id=" + p[0].id + ">" + p[0].name + "</option>" )
		})
	})
}

//get all test execution records also known as tasks
function showTasks(){
	$.ajax({
		type: 'GET',
		url: '/task'
	}).done(function(_tasks){
		$('#tabelWrap').html('<table id="datatable2" class="table table-striped table-bordered dataTable no-footer" role="grid" aria-describedby="datatable_info"></table>')
		$('#datatable2').dataTable({
			"aaData": _tasks,
			"aoColumns": [
			{"sTitle": "test name"},
			{"sTitle": "Commit By"},
			{"sTitle": "StartTime",
				"render": function(startTime){
					if(startTime == "Invalid date"){
						return '---'
					}
				}
			},
			
			{"sTitle": "End Time",
				"render": function(endTime){
					if(endTime == "Invalid date"){
						return '---'
					}
				}
			},
			{"sTitle": "Status"},
			{"sTitle": "Report",
				"render": function(Id){
					return '<a class="blue" href="http://'+Id+'/dashboard">log</a>'
					}
				}
			]
		})
	})
}

//Add a task, means test is executed for once
function addTask(obj){
		$.ajax({
			contentType: 'application/json',
			type: 'POST',
			url: '/task',
			data:JSON.stringify(obj)
		}).done(function(task){
			//console.log(task)
			//$('#datatable2').dataTable().fnAddData(task)
			window.location.pathname="/pressTesting.html"
		})
	}