var arr=['兴庆红','十二味香锅','渝水情','面非面','麻辣e族串串香',
'锅谣原汁猪骨锅','珍面轩鱼汤米线','赛百味','邱家粉馆','越打星','星怡会',
'Meal Salad','丸龟制面','蓝蛙','米多冒菜','陈兴记生煎','品恬蟹肉煲','星期五餐厅',
'Chese & fizz','宴之丰','澳拜客','兴庆红','牛腩汁旅','蒸时代','青の樱屋','芙蓉树下',
'遵义虾子羊肉粉','Lotus Sushi house','彩云笕','鼎和汤包馆','菩提树素食','Hello Kitchen',
'泰北玫瑰','蒸自在蒸菜馆','川乐小镇','胖哥俩蟹肉煲','锅德台式小火锅','潼关肉夹馍',
'华越楼','一线烫捞','Slate']
var start=document.getElementById("start");
var stop=document.getElementById("stop");
var content=document.getElementsByClassName("content")[0];

start.onclick=_start;
stop.onclick=_stop;

document.onkeydown=function(e){
	if (e.keyCode!=13){
		return
	}else{
		var status=content.getAttribute("status");
		if(!status||status=="true"){
			document.onkeyup=_start;
		}else{
			document.onkeyup=_stop;
		}
	}
	
}
		
function _start(e){
	var status=content.getAttribute("status");
	if (status=="false") {
		return
	}else{
		start.style.background='#999';
		timer=setInterval("_move()",100)
		e.stopPropagation();
	}
}
function _move(){
	content.innerHTML='';
	content.setAttribute("status",false);
	for (var i=0; i<3;i++){
		content.innerHTML=content.innerHTML+arr[Math.floor(Math.random()*arr.length)]+'<br>'
	}
	//content.innerHTML=arr[seq];
}

function _stop(e){
	start.style.background="#3b73af";
	content.setAttribute("status",true);
	clearInterval(timer);
	e.stopPropagation();
}
