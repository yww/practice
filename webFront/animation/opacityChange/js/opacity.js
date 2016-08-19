window.onload=function(){
	var oDiv=document.getElementById('div1');
	oDiv.onmouseover=function(){
		oChange(100);
	}
	oDiv.onmouseout=function(){
		oChange(20);
	}
}

timer=null;
function oChange(opa){
	clearInterval(timer);
	var oDiv=document.getElementById('div1');
	timer=setInterval(function(){
		var alpha=0;
		var currentOpa=getComputedStyle(oDiv)['opacity'];
		if(currentOpa*100>opa){
			alpha=-10;
		}else{
			alpha=10;
		}
			if(currentOpa*100==opa){
				clearInterval(timer);
			}else{
				oDiv.style.opacity=(currentOpa*100+alpha)/100;
			}
			
	},30);

}