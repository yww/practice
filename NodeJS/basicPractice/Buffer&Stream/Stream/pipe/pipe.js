var fs=require('fs');

fs.createReadStream('logo.png').pipe(fs.createWriteStream('logo_copied.png'));