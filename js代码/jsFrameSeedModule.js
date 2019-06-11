function IEContentLoaded(w , fn){
    var d = w.document,
        done = false,
        init = function(){
            if(!done){
                fn();
                done = true;
            }
        };
    
    // (function(){  // 在页面中没有iframe的时候 可以省略
    //     try{

    //         d.documentElement.doScroll('left'); // IE浏览器适用
    //     }catch(e){
    //         console.log('dom 加载未完成');
    //         setTimeout(arguments.callee, 50);
    //         return;
    //     }

    //     init();
    // })();

    d.onreadystatechange = function(){
        if(d.readyState == 'complete'){

            d.onreadystatechange = null;
            init();
        }

    };
}
/**
 * IE浏览器里最早的解决方案是绑定document.onreadystatechange事件，判断readyState是否为complete，
 * 但是当页面有iframe时就无法及时触发了（等到iframe加载完毕readyState的值才会变为complete） 而之
 * 后有了一种利用 doScroll() 方法来模拟 addDOMLoadEvent 事件的方案，且现在主流的 JavaScript 框架
 * （JQuery、YUI，kissy等）基本都采用的这一解决方案。doScroll判断页面是否可以滚动，如果可以滚动，
 * 那么就意味着文档加载完毕了。
 */
IEContentLoaded(window , function(){
    alert('加载完成');
})


/**
 * async HTML5
 *   该布尔属性指示浏览器是否在允许的情况下异步执行该脚本。该属性对于内联脚本无作用 (即没有src属性的脚本）。
 *
 * defer
    这个布尔属性被设定用来通知浏览器该脚本将在文档完成解析后，触发 DOMContentLoaded 事件前执行。如果缺少
     src 属性（即内嵌脚本），该属性不应被使用，因为这种情况下它不起作用。对动态嵌入的脚本使用 `async=false` 
     来达到类似的效果。
 *所以可以通过defer来完成 ，domReady    
 */

 document.write("<script defer src = \.\/case.js id = _ie_load> <\/script>");
 var script = document.getElementById("_ie_load");
script.onreadystatechange = function(){      // ### 为啥只在ie中有用
    if(this.readyState == 'complete'){
        init();
    }
}

var init = function(){
    console.log('添加 开启触发事件等  dom 加载完成.........');
}

/**
 * Firefox/Safari/Chrome/Opera中不支持onreadystatechage事件，也没有readyState属性，所以 
 * !this.readyState 是针对这些浏览器。readyState是针对IE浏览器，载入完毕的情况是loaded，
 * 缓存的情况下可能会出现readyState为complete。所以两个不能少。但由于IE9/10也已经支持onload事件了，
 * 会造成callback执行2次。
 */

script.onload = script.onreadystatechange = function(){
    if(!this.readyState || this.readyState == "loaded" || this.readyState == "complete"){
        callback();
    }
}