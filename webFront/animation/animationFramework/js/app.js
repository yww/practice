window.onload=function(){
			var oDiv=document.getElementsByClassName('move')[0];
				oDiv.onmouseover=function(event){
					var target=event.target;
					startMove(target,{'width':300,'height':300},function(){startMove(target,{'opacity':100})});
			}
			
			oDiv.onmouseout=function(event){
					var target=event.target;
					startMove(target,{'opacity':30},function(){startMove(target,{'height':90,'width':190})});
			}
		}
function startMove(obj,json,fn){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var flag=true;
		for(var attr in json){
		//get current value
		var iCur=0;
		if(attr=='opacity'){
			iCur=Math.round(parseFloat(getComputedStyle(obj)[attr])*100)
		}else{
			iCur=parseInt(getComputedStyle(obj)[attr]);
		}

		//caculate speed
		var iSpeed=(json[attr]-iCur)/8
		iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);

		//Verify if all the movement has reached to the end
		if(iCur!=json[attr]){
			flag=false;

			if(attr=='opacity'){
				obj.style.opacity=(iCur+iSpeed)/100;
			}else{
				obj.style[attr]=iCur+iSpeed+'px';
			}
		}

		 }
		 if(flag){
		 	clearInterval(obj.timer);
		 	if(fn){
		 		fn();
		 	}
		 }
		},30)
}
