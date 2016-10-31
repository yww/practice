$(document).ready(function(){
	$('#launchTest').click(commitTest)
})

function commitTest(){
	var test={}
	var config=["caseName","host","users","rampup","duration","iteration"]
	var caseName=$("input[name='caseName']").val()
	if(!caseName){
		alert('please upload a case first')
	}else{
		config.forEach(function(c){
			var inputVal=$("input[name="+c+"]").val()
			if(inputVal){
				test[c]=inputVal			
			}
		})
		console.log(test)
		$.ajax({
			contentType: 'application/json',
			type: 'POST',
			url: '/test',
			data:JSON.stringify(test)
		})
	}
}


