window.onload=function(){
			var oDiv=document.getElementById('div1');
			oDiv.onmouseover=function(){
				startMove('width',500,function(){startMove('height',300)});
			}
			oDiv.onmouseout=function(){
			startMove('height',90,function(){startMove('width',190)})
			}
		}
timer=null;
function startMove(attr,target,fn){
	var oDiv=document.getElementById('div1');
		clearInterval(timer);
		
		timer=setInterval(function(){
			var icurr=parseInt(getComputedStyle(oDiv)[attr]);
			var speed=0;
			if(icurr>target){
				speed=-10;
			}else{
				speed=10;
			}
		
		if(icurr==target){
			clearInterval();
		if(fn){
			fn();
		}
		else{
			return
		}
		}else{
			oDiv.style[attr]=icurr+speed+'px'
		}
		
	},50)

}
