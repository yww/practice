$(document).ready(function(){
		$.ajax({
			type: 'GET',
			url: '/project',
		}).done(function(projects){		
			$('#project').dataTable({
			"responsive": true,
			"data": projects,
			"columns": [
				{"sTitle":"_Id"},
				{"sTitle": "Name"},
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