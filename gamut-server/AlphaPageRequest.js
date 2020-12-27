let http = require('http');
var fs = require('fs');
const { ENGINE_METHOD_CIPHERS } = require('constants');

class AlphaPageRequest{

    constructor(method, url, filename, mimeType){
        this.method = method;
        this.url = url;
        this.filename = filename;
        this.mimeType = mimeType;
        if(this.method === '*' && this.url === '*'){
            this.code = 404;
        }else{
            this.code = 200;
        }
    }

    canHandleRequest(method, url){
        if(this.method === '*' && this.url === '*'){
            return true;
        }else{
            return this.method === method && this.url === url;
        }
    }

    handleRequest(req, res){
        res.writeHead(this.code, {'Content-Type': this.mimeType});
        this.read_file_content(req, res, this.filename);
    }

    read_file_content(req, res, filename){
        fs.open(
            filename, 'r',
            function(err, handle){
                if(err){
                    console.log(`error with fs.open`);
                    return;
                }
                var buf = Buffer.alloc(1000000);
                fs.read(
                    handle, buf, 0, 1000000, null,
                    function(err, length){
                        if(err){
                            console.log(`error with fs.open`);
                            return;
                        }
                        res.end(buf.toString('utf8', 0, length), '\n');
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
    }
    
}

module.exports = AlphaPageRequest;