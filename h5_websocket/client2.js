var ws = (function (){
    var ws = new WebSocket("ws://echo.websocket.org/echo");
    ws.onopen  = function(){
        console.log("连接建立...................................");
    }

    ws.onclose = function(){
        console.log("断开连接")
    }

    ws.onerror = function(){
        console.log('出现错误');
    }

    ws.onmessage = function(ev){
        var bold = ev.data;
        console.log("message : " + bold.size + " bytes");
        if(window.webkitURL){
            URL = window.webkitURL;
        }

        var url = URL.createObjectURL(bold);
        var img = document.createElement("img");
        img.src = url;
        document.body.appendChild(img);
    }

    return ws;
})();


function dropFile(file){
    var read = new FileReader();
    read.readAsArrayBuffer(file);
    read.onload = function(){
        console.log("file name  === " + file.name);
        ws.send(read.result);
    }
}

document.ondrop = function(e){
    document.body.style.backgroundColor = "#fff";
    try{
        e.preventDefault();
        dropFile(e.dataTransfer.files[0]);
        return false;
    }catch(e){
        console.log(e);
    }
}

document.ondragover = function(e){
    e.preventDefault(); // 阻止默认事件执行
    document.body.style.backgroundColor = "#6fff41";
}

document.ondragleave = function(){
    document.body.style.backgroundColor = "#fff";
}