(function (){
    var output = document.getElementById("output");

    var ws = new WebSocket("ws://echo.websocket.org/echo");
    ws.onopen = function(){
        log("connnect success ,,,,,,,,,,,,,,,,,,,,,,");
        sendMsg.call(ws,"  老铁我连接上你了  ————————————————————————————————");

    }

    ws.onclose = function(e){
        log("连接已经关闭了......................." + e.reason);
    }

    ws.onmessage = function(ev){
        if(typeof ev.data === 'string'){
            output.innerHTML = "接受到消息" + ev.data;
        }else{
            output.innerHTML = "消息类型怪异： " + ev.data.toString();
        }
        ws.close();
    }

    ws.onerror = function(ev){
        log(e);s
    }

})();

function log(msg){
    var p = document.createElement("p");
    p.innerHTML = msg;
    document.body.appendChild(p);
    console.log(msg);
}

function sendMsg(msg){
    this.send(msg);
    log("发送消息了 " + msg);
}