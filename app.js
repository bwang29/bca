var express = require('express')
var http = require('http')
var path = require('path');
var fs = require('fs');
var knox = require('knox').createClient({
    key: 'AKIAIKHXW7I7755L5XGA'
    , secret: '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'
    , bucket: 'collectivity'
});
var app = express();

app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser()); // for save image
app.get('/null', function(req, res) {
  res.end("null");
});
app.get('/smoke_test',function(req,res) {
  dummy = {name:"Ethea",status:"OK"};
  res.json(dummy);
});
app.post('/save_image', function(req, res, next) {
  var img_name = req.files.file.path;
  console.log("uploading file: " + img_name);
  fs.readFile(img_name, function(awserr, buf){
    var awsreq = knox.put('/images/'+Math.random().toString(36).substring(2), {
        'Content-Length': buf.length
    });
    awsreq.on('response', function(awsres){
      if(200 == awsres.statusCode) {
        console.log('saved to ' + awsreq.url);
        res.json({filename: awsreq.url});
        fs.unlink(img_name, function() {});
      }else{
        console.log(awsres.statusCode);
        res.end('{error:"Remote server is busy or can not process the file name you provided, please make sure your file name does not contain non-aphanumerical characters and try again."}');
      }
    });
    awsreq.end(buf);
  });
});
app.get('/*', function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

app.listen(3000);

