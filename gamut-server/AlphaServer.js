
let http = require('http');

class AlphaServer{

    constructor(portNumber){
        this.port = portNumber;
        this.handlers = [];
        this.max = 0;
    }

    addHandler(requestHandler){
        this.handlers.push(requestHandler);
        this.max = this.handlers.length;
    }

    process_request(req, res){
        const m = req.method;
        const u = req.url;
        for (let i = 0; i < this.max; i++) {
            if(this.handlers[i].canHandleRequest(m, u)){
                this.handlers[i].handleRequest(req, res);
                break;
            }
        }
    }

    startServer(){
        console.log(`start server for ${this.max} handler(s)`);
        //const s = http.createServer(this.process_request);
        const s = http.createServer(function(req, res){ 
            this.process_request(req, res); 
        }.bind(this));
        s.listen(this.port);
        console.log(`listening on http://localhost:${this.port}/`);
    }
}

module.exports = AlphaServer;