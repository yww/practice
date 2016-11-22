$(document).ready(function(){
	$.ajax({
		type: 'GET',
		url: '/task/'+document.location.search
	}).done(function(_tasks){

		$('#tabelWrap').html('<table id="datatable4" class="table table-striped dataTable no-footer no-header" role="grid" aria-describedby="datatable_info"></table>')
		$('#datatable4').dataTable({
			"aaData": _tasks,
			"aoColumns": [
			{"sTitle": "Test Name",
				"render": function(task){
					return '<a class="blue" href="http://'+ document.location.host+'/report.html?taskId='+ task.id + '">' + task.name +'</a>'
				//	return '<a class="blue" href="http://'+project.id+'">'+project.name+'</a>'
				}
			},
			{"sTitle": "Users"},
			{"sTitle": "Created At"}
			]
		})
	})

	$('#exc1').click(excuteTest)
	$('#delete').click(deleteTest)
	$('#update').click(function(e){
		checkNewParams(e)
		updateTest(e)
	})

	getTestDetail()
})

//re-excute a test, means to add a task base on current test's setting
function excuteTest(){
	var obj={}
	var testId = document.location.search.split('=')[1]
	obj.testId = testId
		$.ajax({
			contentType: 'application/json',
			type: 'POST',
			url: '/reExcTest',
			data:JSON.stringify(obj)
		}).done(function(task){
			//console.log(task)
			//$('#datatable2').dataTable().fnAddData(task)
			window.location.pathname="/test.html"
	})
}

function getTestDetail(){
	$.ajax({
		type: 'GET',
		url: '/test/'+document.location.search.split('=')[1],
	}).done(function(test){
		//console.log(task)
		//$('#datatable2').dataTable().fnAddData(task)
		$('#testName').text(test[0].testName)
		$("input[name='testName']").val(test[0].testName)
		$("select[name='project']").append( "<option id=" + test[0].project._id + ">" + test[0].project.name + "</option>" )

		getConfigDetail(test[0].configId)
	})
}

function getConfigDetail(id){
	$.ajax({
		type: 'GET',
		url: '/config/'+id
	}).done(function(config){
		console.log(config)

		$("input[name='host']").val(config.host)
		$("input[name='users']").val(config.users)
		$("input[name='rampup']").val(config.rampup)
		$("input[name='duration']").val(config.duration)
		$("input[name='iteration']").val(config.iteration)
		$("input[name='configId']").val(config._id)
	})
}


function checkNewParams(e){
	var caseName=$("input[name='caseName']").val();
	var name=$("input[name='testName']").val();
	var project=$("select[name='project'] option:selected" ).attr("id");

	if(name){
		return
	}else{
		alert('Test name can not be empty')
		e.stopPropagation()
	}
}

//submit a test to server
function updateTest(e){
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
	var test= ["testName"]
	testObj._id = window.location.search.split('=')[1]
	test.forEach(function(c){
		var inputVal=$("input[name="+c+"]").val()
		if(inputVal){
		testObj[c]=inputVal			
		}
	})

	var dataObj={"config":configObj,"test":testObj}

	//send ajax to server
	$.ajax({
		contentType: 'application/json',
		type: 'POST',
		url: '/updateTest',
		data:JSON.stringify({"test":testObj,"config":configObj})
	}).done(function(result){
		alert('Test case updated '+result.message)
		window.location.pathname='/test.html'
	})
}

function deleteTest(){
	var testId = document.location.search.split('=')[1]
	if (confirm('If you delete the test, all the execution history will be deleted too. Are you sure you want to delete the test, ?')){
		$.ajax({
			type: 'DELETE',
			url:'/test/'+testId
		}).done(function(result){
			alert(result.message)
			window.location.pathname='/test.html'
		})
	}else{
		return
	}
}