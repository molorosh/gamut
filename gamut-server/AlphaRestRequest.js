/**
 * this is a simple REST request handler for games 'objects'
 * GET /game/ would return all the game records
 * GET /game/123 would return the single game record
 * DELETE /game/123 would delete a single record
 * POST /game/123456 would create a new game
 * PUT /game/123456 would update an existing game
 */

class AlphaRestRequest{

    constructor(){
        
    }

    getRestParts(method, url){
        let retVal = { isValid: false, verb: method, noun: null, key: null };
        let first = url.indexOf('/');
        let second = -1;
        let third = -1;
        // there should be two '/' one at zero and the other at > 1
        if(first === 0){
            second = url.indexOf('/', 1);
            if(second > 1){
                third = url.indexOf('/', second + 1);
            }
            if(third === -1 && first === 0 && second > 1){
                retVal.noun = url.substring(first + 1, second);
                retVal.key = url.substring(second + 1);
                retVal.isValid = true;
            }
        }
        return retVal;
    }

    canHandleRequest(method, url){
        let retVal = this.getRestParts(method, url);
        if(retVal.isValid && retVal.noun === 'game'){
            return true;
        }else{
            return false;
        }
    }

    handleRequest(req, res){
        console.log('handleRequest(req, res)');
        let retVal = this.getRestParts(req.method, req.url);
        console.log('retVal:');
        console.log(retVal);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ parts: retVal }), '\n');
    }
}

module.exports = AlphaRestRequest;