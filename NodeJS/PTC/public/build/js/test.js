$(document).ready(function(){
	$('#launchTest').click(commitTest);
	showProjects();
})

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
	var test= ["caseName","name"]
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
	}).done(function(){
		console.log("Add config and test successfully")
	})
}

function showProjects(){
	//to get all projects from server side
	$.ajax({
		type: 'GET',
		url: '/project',
	}).done(function(projects){
		projects.forEach(function(p){
			$("select[name='project']").append( "<option id=" + p[0] + ">" + p[1] + "</option>" )
		})
	})
}