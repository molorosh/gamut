/** the javascript app logic */

let preDebug = null;

function appCodeReady() {
    console.log('function appCodeReady() { ... }');
    let startMsg = 'app code ready at ' + new Date().toJSON();
    console.log(startMsg);
    preDebug = $('#idDebugPre');
    appendDebug(startMsg);
    $('#idBtnClear').click(function(){ 
        clearDebug(); 
    });
    $('#idBtnGet').click(function(){ 
        doRequest('GET'); 
    });
    $('#idBtnPut').click(function(){ 
        doRequest('PUT'); 
    });
    $('#idBtnPost').click(function(){ 
        doRequest('POST'); 
    });
    $('#idBtnDelete').click(function(){ 
        doRequest('DELETE'); 
    });
    $('#idBtnKeyClear').click(function(){ 
        $('#idKeyText').val("");
    });
    $('#idBtnKeyNew').click(function(){ 
        $('#idKeyText').val(newGuid());
    });
}

function newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  

function clearDebug(){
    preDebug.text("");
}

function appendDebug(txt){
    let msg = new Date().toJSON() + ' ' + txt + '<br>';
    preDebug.prepend(msg);
}

function doRequest(method){
    appendDebug(method);
    let parameters = getFields();
    appendDebug(JSON.stringify(parameters));
}

function getFields(){
    return {
        username: $('#idUsernameText').val(),
        password: $('#idPasswordText').val(),
        key: $('#idKeyText').val()
    };
}