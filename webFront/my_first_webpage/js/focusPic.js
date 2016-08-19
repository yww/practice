window.onload=function(){
	startMove();
}

//speed is px/ms
function startMove(obj,target,speed){
	setInterval(move(obj,1000),100)
}

function move(obj,length){
	clearInterval(timer);
	var ocurrent=getComputedStyle(obj)['left'];

	if(ocurrent%length==0){
		clearInterval(timer);
	}else{
		var timer=setInterval(function(){
			obj.left-=(length-Math.abs(obj.left)%length)/20;
		});
	}
}