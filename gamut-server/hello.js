/**
 * Let's create a simple web server
 * 
 */

 var http = require('http');
 var simpleClass = require('./SimpleClass.js');

 function process_request(req, res){
     const x = new simpleClass();
     const y = x.theUtcTimestampString();
     var body = '<!DOCTYPE html>\n';
     body += '<html lang="en">\n';
     body += '<head>\n';
     body += '<meta charset="utf-8">\n';
     body += '<title>Gamut Backend Server</title>\n';
     body += '</head>\n';
     body += '<body>\n';
     body += '<h1>Gamut Backend Server</h1>\n';
     body += `<p>${y}</p>`
     body += '</body>\n';
     body += '</html>\n';
     var content_length = body.length;
     res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Length': content_length,
     });
     res.end(body);
 }

 var a = http.createServer(process_request);
 a.listen(8080);
 console.log("Listening on http://localhost:8080/");
 