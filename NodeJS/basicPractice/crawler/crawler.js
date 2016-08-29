
//Import modules
var http = require('http');
var url = 'http://www.imooc.com/learn/348';
var globalTunnel = require('global-tunnel');
var cheerio = require('cheerio');

//set proxy for http request
	// globalTunnel.initialize({
	// 	host:'proxy.pvgl.sap.corp',
	// 	port:8080
	// })

/* parse html; Structure of couseData
	[
		{charpterTitle:chapterTitle,
		 videos:[
			{title:title,
			 id:id},
			{{title:title,
			 id:id}} ]},{...}}
	]

*/

//test

function filterChapters(html){

	var $ = cheerio.load(html);

	var chapters = $('.mod-chapters');

	var courseData=[];
	chapters.each(function(item){
		var chapter = $(this),
			chapterTitle=chapter.find('strong').text(),
			videos=chapter.find('.video').children('li'),
			chapterData = {
				chapterTitle:chapterTitle,
				videos:[]
			}
		videos.each(function(item){
			var video =  $(this).find('.J-media-item');
			var videoTitle = video.text();
			var id = video.attr('href').split('video/')[1];

			chapterData.videos.push({
				title:videoTitle,
				id:id
			})
		})

		courseData.push(chapterData)
	})

	return courseData;
}

//print couse info to console 
function printCouseInfo(courseData){
	courseData.forEach(function(item){
		var chapterTitle = item.chapterTitle;
		console.log(chapterTitle+'\n');

		item.videos.forEach(function(video){
			console.log(' ['+video.id+']'+video.title+'\n')
		});

	})
}

http.get(url, function(res){
	var html = '';

	res.on('data',function(data){
		html += data;
	})

	res.on('end', function(){
		var courseData=filterChapters(html);
		printCouseInfo(courseData)
	})

	res.on('error', function(){
		console.log('error')
	})
})

