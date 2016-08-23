window.onload=function(){
			var oDivs=document.getElementsByClassName('oDiv');
			for (var i=0;i<oDivs.length;i++){
				oDivs[i].onmouseover=function(event){
					startMove(this,0);
				}

				oDivs[i].onmouseout=function(){
					var target=event.target;
					startMove(this,-200);;
				}
			}
		}

function startMove(obj,target){
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			var speed=0;
			if(obj.offsetLeft>target){
				speed=-5;
			}else{
				speed=5;
			}
		
		if(obj.offsetLeft==target){
			clearInterval()
		}else{
			obj.style.left=obj.offsetLeft+speed+'px'
		}
		
	},30)
}
