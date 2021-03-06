/** a simple class-based web server in Node.js and ES6 classes
 * you start this with:
 * node runAlpha.js
*/

var alphaServer = require('./AlphaServer.js');
var alphaPageRequest = require('./AlphaPageRequest.js');
var alphaRestRequest = require('./AlphaRestRequest.js');

const server = new alphaServer(8080);
server.addHandler(new alphaPageRequest('GET', '/', 'zMainPage.html', 'text/html; charset=utf-8', true));
server.addHandler(new alphaPageRequest('GET', '/style', 'zStyle.css', 'text/css', true));
server.addHandler(new alphaPageRequest('GET', '/questionMark', 'question_mark.svg', 'image/svg+xml', true));
server.addHandler(new alphaPageRequest('GET', '/favicon.ico', 'favicon.ico', 'image/x-icon', false));
server.addHandler(new alphaPageRequest('GET', '/appCode', 'zAppCode.js', 'text/javascript', true));
server.addHandler(new alphaRestRequest());
// this should always be the last page request handler:
server.addHandler(new alphaPageRequest('*', '*', 'z404.html', 'text/html; charset=utf-8', true));
server.startServer();

