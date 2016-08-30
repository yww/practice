var fs=require('fs');

var read=fs.createReadStream('logo.png');
var write=fs.createWriteStream('logo_copied.png');

read.on('data',function(chunk){
	if(!write.write(chunk)){
		read.pause();
	 }
})

write.on('drain',function(){
	read.resume();
})
