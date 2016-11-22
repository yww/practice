//used by tests page
$(document).ready(function(){
	getCurrentTests();
	getCurrentProject();
	$('#delProject').click(delCurrentProject);
})

function getCurrentTests(){
	$.ajax({
		type: 'GET',
		url: '/test/'+document.location.search
	}).done(function(_tests){
		$('#tabelWrap').html('<table id="datatable3" class="table table-striped dataTable no-footer" role="grid" aria-describedby="datatable_info"></table>')
		$('#datatable3').dataTable({
			"aaData": _tests,
			"aoColumns": [
			{"sTitle": "Test name",
				"render": function(test){
						return '<a class="blue" href="http://'+ document.location.host+'/test.html?testId='+ test.id + '">' + test.name +'</a>'
					}
				},
			{"sTitle": "Owner"},
			//{"sTitle": "Type"},
			{"sTitle": "Users"},
			{"sTitle": "Created At"}
			]
		})
	})	
}

function getCurrentProject(){
		$.ajax({
			type: 'GET',
			url: '/project/'+document.location.search.split('=')[1],
		}).done(function(project){		
			$('#projectId').val(document.location.search.split('=')[1]);
			$('#project-name').val(project.name);
			$('#project-desc').val(project.desc);
			$('#project-created').text(project.meta.createAt)
		})
}

function delCurrentProject(){
		$.ajax({
			type: 'DELETE',
			url: '/project/'+document.location.search.split('=')[1],
		}).done(function(result){		
			alert(result.message)
			window.location.pathname='/'
		})	
}