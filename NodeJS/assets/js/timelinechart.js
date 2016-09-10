function run_python()
{
	$('#test').attr('disabled','disabled');
    var modal_url = $("#modal-input").val();
    var modal_browser = $("#modal-select").val();
	$.ajax({ url: 'call_local_python',
        type: 'post',
        data: {"modal_url":modal_url,"modal_browser":modal_browser},
        success: function(output) {
        			$('#test').removeAttr('disabled');
                     alert(output);
                 }
	});	
}

function run_occ_python()
{
	$('#test').attr('disabled','disabled');
	$.ajax({ url: 'call_occ_local_python',
        type: 'post',
        success: function(output) {
        			$('#test').removeAttr('disabled');
                     alert(output);
                 }
	});	
}

function draw_backend_detail_chart(base_url,result_id,machine_name)
{
	var url=base_url+"/pages/get_backend_detail_json?result_id="+result_id+"&machine_name="+machine_name;	

	var series_arr=[];
	
 	$.getJSON(url, function(data) {   
 		var series = { data: []};
        $.each(data, function(key,value) {      	
            if (key == 'name') {
            	series.name = value;
            }
            else
            {
              	 $.each(value, function(key1,val1) {
                		 var obj={};
                		 $.each(val1, function(key2,val2) {
								if(key2 == 'x')
								{									
									obj.x= val2;									
								}
								if(key2 == 'y')
								{								
									obj.y=parseFloat(val2);								
								}
								
		                     });
                		 series.data.push(obj);	
                     });
             }
	   });  
        series_arr.push(series);
        draw_chart_with_data2("AVG HPS",series_arr,'draw_backend_detail_chart','s');
 	});
 	

}



function draw_backend_chart(json_url)
{
	var user_number=$("[name='user_number']").val();
	var metrics=$("[name='metrics']").val();
	var time=$("[name='time']").val();
	var url=json_url+"/pages/get_backend_json?user_number="+user_number+"&metrics="+metrics+"&time="+time;	

	var series_arr=[];								
 	$.getJSON(url, function(data) {          
        $.each(data, function(key,value) {
        	var series = { data: []};
        	 $.each(value, function(key,val) {
                 if (key == 'name') {
                	 series.name = val;
                 }
                 else
                 {
	                
                	 $.each(val, function(key1,val1) {
                		 var obj={};
                		 $.each(val1, function(key2,val2) {
								if(key2 == 'x')
								{
									var d=val2.split("-");
									obj.x= Date.UTC(d[0],d[1]-1,d[2]);											
								}
								if(key2 == 'y')
								{								
									obj.y=parseFloat(val2);								
								}
								if(key2== 'url')
								{
									obj.url=val2;
								}
		                     });
                		 series.data.push(obj);	
                     });
                 }
        	 });
        	 series_arr.push(series);		        	
	   });
       metrics=$("[name='metrics']").find("option:selected").text();
         draw_chart_with_data(metrics,series_arr,'draw_backend_chart','s');
 	});
}


function draw_cb_chart(json_url)
{
	var test_url=$("[name='cb_test_url']").val();
	var browser_type=$("[name='cb_browser_type']").val();
	var mime=$("[name='cb_mime']").val();
	var mime_measurement=$("[name='cb_mime_measurement']").val();
	var time=$("[name='cb_time']").val();
	var url=json_url+"/pages/get_contents_json?cb_test_url="+test_url+"&cb_browser_type="+browser_type+"&cb_mime="+mime+"&cb_mime_measurement="+mime_measurement+"&cb_time="+time;	
	
	mime=$("[name='cb_mime']").find("option:selected").text();
	var series_arr=[];								
 	$.getJSON(url, function(data) {          
        $.each(data, function(key,value) {
        	var series = { data: []};
        	 $.each(value, function(key,val) {
                 if (key == 'name') {
                	 series.name = val;
                 }
                 else
                 {
	                
                	 $.each(val, function(key1,val1) {
                		 var obj={};
                		 $.each(val1, function(key2,val2) {
								if(key2 == 'x')
								{
									var d=val2.split("-");
									obj.x= Date.UTC(d[0],d[1]-1,d[2]);											
								}
								if(key2 == 'y')
								{								
									if(mime_measurement == 'requests')
										obj.y=parseInt(val2);
									else
										obj.y=parseInt(val2)/1000;
								}
								if(key2== 'url')
								{
									obj.url=val2;
								}
		                     });
                		 series.data.push(obj);	
                     });
                 }
        	 });
        	 series_arr.push(series);		        	
	   });
       if(mime_measurement=="requests") 
    	   draw_chart_with_data(mime,series_arr,'content_chart','');
       else
    	   draw_chart_with_data(mime,series_arr,'content_chart','KB');
 	});
}



function draw_chart(json_url)
{
	var test_url=$("[name='test_url']").val();
	var browser_type=$("[name='browser_type']").val();
	var metrics=$("[name='metrics']").val();
	var time=$("[name='time']").val();
	var url=json_url+"/pages/get_front_json?test_url="+test_url+"&browser_type="+browser_type+"&metrics="+metrics+"&time="+time;	
	
	metrics=$("[name='metrics']").find("option:selected").text();
	var series_arr=[];								
 	$.getJSON(url, function(data) {          
        $.each(data, function(key,value) {
        	var series = { data: []};
        	 $.each(value, function(key,val) {
                 if (key == 'name') {
                	 series.name = val;
                 }
                 else
                 {
	                
                	 $.each(val, function(key1,val1) {
                		 var obj={};
                		 $.each(val1, function(key2,val2) {
								if(key2 == 'x')
								{
									var d=val2.split("-");
									obj.x= Date.UTC(d[0],d[1]-1,d[2]);											
								}
								if(key2 == 'y')
								{
									obj.y=parseInt(val2)/1000;
								}
								if(key2== 'url')
								{
									obj.url=val2;
								}
		                     });
                		 series.data.push(obj);	
                     });
                 }
        	 });
        	 series_arr.push(series);		        	
	   });
       draw_chart_with_data(metrics,series_arr,'metrics_chart','s');
 	});
}

function draw_occ_chart(json_url)
{
	var page=$("[name='page']").val();
	var browser_type=$("[name='browser_type']").val();
	var time=$("[name='time']").val();
	var url=json_url+"/pages/get_occ_front_json?page="+page+"&browser_type="+browser_type+"&time="+time;	
	
	var series_arr=[];								
 	$.getJSON(url, function(data) {          
        $.each(data, function(key,value) {
        	var series = { data: []};
        	 $.each(value, function(key,val) {
                 if (key == 'name') {
                	 series.name = val;
                 }
                 else
                 {
	                
                	 $.each(val, function(key1,val1) {
                		 var obj={};
                		 $.each(val1, function(key2,val2) {
								if(key2 == 'x')
								{
									var d=val2.split("-");
									obj.x= Date.UTC(d[0],d[1]-1,d[2]);											
								}
								if(key2 == 'y')
								{
									obj.y=parseInt(val2)/1000;
								}
								if(key2== 'url')
								{
									obj.url=val2;
								}
		                     });
                		 series.data.push(obj);	
                     });
                 }
        	 });
        	 series_arr.push(series);		        	
	   });
       draw_chart_with_data("OCC Performance",series_arr,'occ_chart','s');
 	});
}

function draw_chart_with_data(yAxis_data,series_data,chart_name,unit)
{
	new $('#'+chart_name).highcharts({
         chart: {
             type: 'spline'
         },
         title: {
             text: yAxis_data
         },
         xAxis: {
             type: 'datetime',
             dateTimeLabelFormats: { // don't display the dummy year
                 month: '%e. %b',
                 year: '%b'
             },
             title: {
                 text: 'Date'
             }
         },
         yAxis: {
             title: {
                 text: yAxis_data
             },
             min: 0
         },
         tooltip: {
             headerFormat: '<b>{series.name}</b><br>',
             pointFormat: '{point.x:%e. %b}: {point.y}'+unit
         },
         plotOptions: {
             series: {
                 cursor: 'pointer',
                 point: {
                     events: {
                         click: function () {
 							window.open(this.url);
                         }
                     }
                 }
             }
         },
         series: series_data
     }); 


}

//This function is for x axis is non-date format
function draw_chart_with_data2(yAxis_data,series_data,chart_name,unit)
{
	new $('#'+chart_name).highcharts({
		chart: {
            type: 'spline'
        },
         title: {
             text: yAxis_data
         },
         xAxis: {
             title: {
                 text: 'User Number'
             },
         	min: 0,
         	max:420
         },
         yAxis: {
             title: {
                 text: yAxis_data
             },
             min: 0
         },
         tooltip: {
             headerFormat: '<b>{series.name}</b><br>',
             pointFormat: '{point.x}: {point.y}'+unit
         },
         
         series: series_data
     }); 


}