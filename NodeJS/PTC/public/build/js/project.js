$(document).ready(function(){
		$.ajax({
			type: 'GET',
			url: '/project',
		}).done(function(projects){		
			$('#project').dataTable({
			"responsive": true,
			"data": projects,
			"columns": [
				{"sTitle": "Name",
					"render": function(project){
						return '<a class="blue" href="http://'+ document.location.host+'/tests.html?projectId='+project.id + '">' +project.name +'</a>'
						return '<a class="blue" href="http://'+project.id+'">'+project.name+'</a>'
					}
				},
				{"sTitle": "Description"},
				{"sTitle": "Owner"},
				{"sTitle": "Created At"}				
				]
			})
		})
})



function getProject(id){
	//...
}

function deleteProject(){
	//
}