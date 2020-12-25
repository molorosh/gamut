/**
 * Let's create a simple JSON server
 */

var http = require('http');
var fs = require('fs');
var port = 8080;

function read_file_content(req, res, content, filename){
    fs.open(
        filename, 'r',
        function(err, handle){
            if(err){
                var msg = 'error in fs.open(...):' + err.code + ' ' + err.message
                    content.error = {
                        code: 3,
                        message: msg
                    };
                res.end(JSON.stringify(content), '\n');
                return;
            }
            var buf = new Buffer(1000000);
            fs.read(
                handle, buf, 0, 1000000, null,
                function(err, length){
                    if(err){
                        var msg = 'error in fs.read(...):' + err.code + ' ' + err.message
                        content.error = {
                            code: 3,
                            message: msg
                        };
                        res.end(JSON.stringify(content), '\n');
                        return;
                    }
                    fs.close(
                        handle, 
                        function(){
                            /* does not need an implementation */
                        }
                    );
                    content.message = buf.toString('utf8', 0, length);
                    res.end(JSON.stringify(content), '\n');
                }
            )
        }
    )
}

function handle_incoming_request(req, res){
     console.log('INCOMING REQUEST: ' + req.method + ' ' + req.url);
     res.writeHead(200, {'Content-Type': 'application/json'});
     var content = {error: null};
     var isSync = true;
     switch (req.url) {
        case '/':
             content.data = 'just a typical request...';
             break;
        case '/file':
            isSync = false;
            read_file_content(req, res, content, 'info.txt');        
            break;
        case '/nofile':
            isSync = false;
            read_file_content(req, res, content, 'no_info.txt');        
            break;
        default:
            content.error = {
                code: 1,
                message: 'I was not expecting that! ( ' + req.url + ' )'
            };
            break;
     }
     if(isSync){
        res.end(JSON.stringify(content), '\n');
     }
}

var s = http.createServer(handle_incoming_request);
s.listen(port);
console.log('listening on http://localhost:' + port + '/');
