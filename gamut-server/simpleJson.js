/**
 * Let's create a simple JSON server
 */

var http = require('http');
var fs = require('fs');
var port = 8080;

function handle_incoming_request(req, res){
     console.log('INCOMING REQUEST: ' + req.method + ' ' + req.url);
     res.writeHead(200, {'Content-Type': 'application/json'});
     var content = {error: null};
     switch (req.url) {
        case '/':
             content.data = 'just a typical request...';
             break;
        case '/file':
            /* we will try to open a file */
            fs.open(
                'info.txt', 'r',
                function(err, handle){
                    if(err){
                        console.log('error in fs.open(...):' + err.code + ' ' + err.message);
                        return;
                    }
                    var buf = new Buffer(1000000);
                    fs.read(
                        handle, buf, 0, 1000000, null,
                        function(err, listen){
                            if(err){
                                console.log('error in fs.read(...):' + err.code + ' ' + err.message);
                                return;
                            }
                            console.log(buf.toString('utf8', 0, length));
                            fs.close(
                                handle, 
                                function(){
                                    /* does not need an implementation */
                                }
                            );
                        }
                    )
                }
            )
            break;
        default:
            content.error = {
                code: 1,
                message: 'I was not expecting that! ( ' + req.url + ' )'
            };
            break;
     }
     res.end(JSON.stringify(content), '\n');
}

var s = http.createServer(handle_incoming_request);
s.listen(port);
console.log('listening on http://localhost:' + port + '/');
