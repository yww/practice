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
		$('#testName').text(test.testName)
		console.log(test)
	})
}


