/** a simple class-based web server in Node.js and ES6 classes
 * you start this with:
 * node runAlpha.js
*/

var alphaServer = require('./AlphaServer.js');
var alphaPageRequest = require('./AlphaPageRequest.js');

const server = new alphaServer(8080);
server.addHandler(new alphaPageRequest('GET', '/', 'zMainPage.html', 'text/html; charset=utf-8'));
server.addHandler(new alphaPageRequest('GET', '/style', 'zStyle.css', 'text/css'));
server.addHandler(new alphaPageRequest('GET', '/questionMark', 'question_mark.svg', 'image/svg+xml'));
// this should always be the last page request handler:
server.addHandler(new alphaPageRequest('*', '*', 'z404.html', 'text/html; charset=utf-8'));
server.startServer();

