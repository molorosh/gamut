let http = require('http');
var fs = require('fs');
const { ENGINE_METHOD_CIPHERS } = require('constants');

class AlphaPageRequest{

    constructor(method, url, filename, mimeType, isText){
        this.method = method;
        this.url = url;
        this.filename = filename;
        this.mimeType = mimeType;
        this.isText = isText;
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
        this.read_file_content(req, res, this.filename, this.isText);
    }

    read_file_content(req, res, filename, isText){
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
                        if(isText){
                            res.end(buf.toString('utf8', 0, length), '\n');
                        }else{
                            res.write(buf,'binary');
                            res.end(null, 'binary');
                        }
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