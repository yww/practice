window.onload=function(){
			var div=document.getElementsByClassName('move');
			for(var i=0;i<div.length;i++){
				div[i].onmouseover=function(){startMove(this,0)}
				div[i].onmouseout=function(){startMove(this,-200)}
				this.timer=null;
			}
		}

function startMove(obj,target){
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			var speed=(target-obj.offsetLeft)/20;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			
		if(obj.offsetLeft==target){
			clearInterval(obj.timer)
		}else{
			obj.style.left=obj.offsetLeft+speed+'px'
		}
		
	},30)
}
