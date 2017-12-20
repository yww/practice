var fs=require('fs');
var _readStream = fs.readFileSync('logo.png');
var _writeSteam=fs.writeFileSync('logo_sync.png', _readStream);