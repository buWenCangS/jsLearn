// -------------------------------根据关注的点不同， 只在乎has-a的话就 只需要确定是否存在类似的东西就ok了
// alert('ie浏览器......1 ');
var Duck = {
    sound: function () {
        console.log('鸭子 嘎嘎叫');
    }
}

var Chicken = {
    sound: function () {
        console.log('小鸡 也会嘎嘎嘎');
    }
}

function animalSound() {
    this.sound();
}

animalSound.call(Chicken);
animalSound.call(Duck);
console.log(typeof Chicken);
console.log(Chicken instanceof Object); // true
// alert('ie浏览器......2 ');

function animalCall(animl) {
    if (typeof animl.sound == 'function') { // 通过基本类型判断 ， 是否存在该函数
        animl.sound();
    }
}

animalCall(Chicken)
animalCall(Duck)

// ---------------------------------关于多态, 函数提前， 声明的函数会被提前声明到最顶部， 变量会提前声明，但是不会赋值
function Chicken1() {
    this.makeSound = function () {
        console.log('鸡叫')
    }
}

function Duck1() {
    this.makeSound = function () {
        console.log('鸭叫')
    }

}

function Dog1() {
    this.makeSound = function () {
        console.log('狗叫')
    }
}

function animalMakeSound(animal) {
    animal.makeSound();
}
console.log(Chicken);
animalMakeSound(new Chicken1())
animalMakeSound(new Duck1())
animalMakeSound(new Dog1())
// alert('ie浏览器......3 ');

// -------------------------------------------- java script 继承
// 通过构造函数继承  Chicken1.call(this)
// 通过原型链继承   BigChicken.prototype = new Chicken1()
// 组合式继承  Chicken1.call(this);  BigChicken.prototype = new Chicken1();
//------------ BigChicken.prototype.constructor = Chicken; // 更改构造函数的值， 但是组合模式会执行两次构造函数

//--------------------------------------------原型链复制对象
function objectFactory() {
    var obj = {},
        Constructor = Array.prototype.shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    var ret = Constructor.apply(obj, arguments);

    return typeof ret == 'object' ? ret : obj;
}

var chicken = new Chicken1();
var chicken2 = objectFactory(Chicken1); // 传入构造方法
console.log(chicken === chicken2);
console.log(chicken2 instanceof Chicken1);
chicken.makeSound();
chicken2.makeSound();


// ------------------------------------------------this
window.id = 'window has id'
// alert('ie浏览器......4 ');

var ob = {
    id: 'ob has id'
}

ob.ss = function () {
    console.log(this.id)

    var jj = function () {
        console.log(this.id)
    }

    jj()
}

ob.ss()

var Tom = {
    names: 'TOM',
    getName: function () {
        return this.names
    }
}

var getName = Tom.getName  // 改变了当前方法的对象  在window的环境中声明， 其对应的调用对象为window
console.log(Tom.getName())
console.log(getName())

// alert('ie浏览器......5 ');

// ----------------------------bind
Function.prototype.bind = function () {
    var self = this; // 保存函数
    var obj = [].shift.call(arguments);
    var args = [].slice.call(arguments);

    return function () {
        return self.apply(obj, [].concat.call(args, [].slice.call(arguments)))
    }
}

var Tom1 = {
    names: '僵尸',
    getNames: function () { /// 不管是函数内 还是对象内 不使用this就是window对象的属性 
        return this.names
    }
}

console.log('bind函数', Tom1.getNames.bind(Tom)())

    ; (function () {
        jiuer = 'JIUER'; // window对象 不使用var let const声明
        var lianglaing = '凉凉';
        console.log(this);
    }.bind(Tom))()

console.log(jiuer)
// console.log(lianglaing) // not defined

const ss = '不变的音乐';
// ss  = '江山';  报错不能改变
console.log(ss);

const chicken1 = new Chicken1();
chicken1.makeSound = function () {
    console.log('我改变了 鸡的叫声');
}
chicken1.makeSound(); // 可以改变对象不是用const声明的属性
// chicken1 = new Chicken1();/ 不能改变对象的指针

// ----------------------------------- 变量的生存周期
var cache = {};
function countNum() {
    var a = 1;
    return function () {
        a++;
        alert(a);
    } // 内部函数掌握了外部函数的变量的生存周期
}

var count = countNum();

var mult0 = (function () {
    var cache = {};  // 并不会对cache 进行修改， 所以cache在闭包内

    return function () {
        var calculate = function () {
            var a = 1;
            for (var i = 0, l = arguments.length; i < l; i++) {
                a = a * arguments[i];
            }
            return a;
        }
        var arg = Array.prototype.join.call(arguments, ',');
        if (arg in cache) {
            console.log('存在缓存 == ' + cache[arg]);
            return cache[arg];
        }
        cache[arg] = calculate.apply(null, arguments);
        console.log('不存在缓存 == ' + cache[arg], cache);
        return cache[arg];
    }
})();

// ------------------- 闭包  需要考虑一个问题， 就是 cache对象是一直存在的， 在不使用的时候应该考虑消除引用
var mult = (function () {
    var cache = {};
    var calculate = function () {
        var a = 1;
        for (var i = 0, l = arguments.length; i < l; i++) {
            a = a * arguments[i];
        }
        return a;
    }

    return function () {
        var arg = Array.prototype.join.call(arguments, ',');
        if (arg in cache) {
            console.log('存在缓存 == ' + cache[arg]);
            return cache[arg];
        }
        cache[arg] = calculate.apply(null, arguments);
        console.log('不存在缓存 == ' + cache[arg], cache);
        return cache[arg];

    }
})();

mult(1, 2, 3);
mult(1, 2, 3);
mult0(1, 2, 3);
mult0(1, 2, 3);
console.log(cache);
// 电视机开关功能         ----------------- 命令模式
var TV = {
    openTV: function () {
        console.log('打开电视， 心情美美哒');
    },

    closeTV: function () {
        console.log('关闭电视,  ...');
    }
}

// 创建命令管理
var createCommand = function (excutor) {

    var openCommand = function () {
        return excutor.openTV();
    }

    var closeCommmand = function () {
        return excutor.closeTV();
    }

    return {
        open: openCommand,
        close: closeCommmand
    }

}


var setCommand = function (command) {
    document.getElementById('open').onclick = function () {
        command.open()
    }
    document.getElementById('close').onclick = function () {
        command.close()
    }
}

setCommand(createCommand(TV));


// ----------------- 单例
var getSingle = function (fn) {
    var ret;
    return function () { // 使用闭包 完成ret保存， 在再次创建的时候就能直接返回创建过的对象
        return ret || (ret = fn.apply(this, arguments));
    }
}

var getScript = getSingle(
    function () {
        document.createElement('script')
    });


var script1 = getScript();
var script2 = getScript();
console.log(script1 === script2);

function Chicken2() {


}

Chicken2.prototype.instance = (function () {
    var ret;
    return function () {
        return ret || (ret = new Chicken2());
    }
})();



Function.prototype.befor = function (beforfn) {
    var self = this; // 保存原函数
    return function () {
        beforfn.apply(this, arguments);
        return self.apply(this, arguments);
    }
}

Function.prototype.after = function (afterfn) {
    var self = this; // 保存原函数
    return function () {
        let ret = self.apply(this, arguments);
        afterfn.apply(this, arguments);
        return ret;
    }
}



var zhixing = function () {
    console.log(2);
}

var result = zhixing.
    befor(
        function () {
            console.log(1);
        }
    ) // return 了一个function对象  return function () { beforfn.apply(this, arguments);return self.apply(this, arguments);
    // 变成了after中传入的afterfn函数
    .after(
        function () {
            console.log(3);
        }
    )()

console.log(result);
// ------------------------------------------ 节流
var callback = function () {
    console.log('window大小改变n ' + window.innerWidth)
}
window.onresize = throttle(callback, 1000);
function throttle(func, interval) {
    var timer, firstTimer = true, self = this;

    return function () {
        if (firstTimer) {
            firstTimer = false;
            return func.apply(self, arguments);
        }

        // if(timer){  ---------- 节流
        //     return false;
        // }
        clearTimeout(timer); // ---------- 防抖  将每次没到时间的函数取消掉， 只在最后一次时间到是 执行一次
        timer = setTimeout(function () {
            clearTimeout(timer);
            timer = null;
            func.apply(this, arguments);
        }, interval || 500);
    }
}
// 防抖和节流的区别 是  防抖只执行一次， 在最后一次操作触发时调用， 节流是在一定的时间内输出

// -------------------------------------------分时加载
function timeLimitLoad(func, array, mic) {

    var id;
    var start = function () {
        for (let i = 0; i < Math.min(mic || 1, array.length); i++) {
            let obj = array.shift();
            func(obj)
        }
    }

    return function () {
        id = setInterval(function () {
            if (array.length == 0) clearInterval(id);
            start();
        }, 800)
    }
}

function createDiv(text) {
    var div = document.createElement('div');
    div.innerHTML = text;
    document.body.appendChild(div);
}

var array = (function () {
    var arr = [];
    for (let i = 0; i < 1000; i++) {
        arr.push(i);
    }
    return arr;
})();

var timeLimit = timeLimitLoad(createDiv, array, 2);

// ----------------------------------------------惰性加载
var addEvent = function (elem, type, func) {
    if (window.addEventListener) {
        console.log('当前的监听方法 ====>>>>>>> ' + window.addEventListener);
        addEvent = function (elem, type, func) { // 在函数的内部改变函数的指向, 并且仅当调用该函数时才会加载切换
            window.addEventListener(type, func, false);
        }
    } else if (window.attachEvent) {
        console.log('当前的监听方法 ====>>>>>>> ' + window.attachEvent);
        addEvent = function (elem, type, func) {
            window.attachEvent('on' + type, func);
        }
    }

    addEvent(elem, type, func);
}

var openbtn = document.getElementById('open');
addEvent(openbtn, 'pointermove', function () {
    alert('偷听到了.....................');
});

// 关于对象的拷贝, 最简单的实现
// 通过JSON。stringify将对象转换为 字符串 这样就会在栈内存中创建一个str存储内容
// 再通过JSON.parse将字符串转换为对象 ， 其主要原理是解决了地址值的传递 ， 而是
// 真正的创建了一个新的空间存储对象， 创建了一个新的地址访问对象 , 无法实现对象函数的克隆
function objClone(obj) { // 简单拷贝可以使用， （#####不建议使用)
    let info = JSON.stringify(obj.info);
    let copy_info = JSON.parse(info);
    console.log(info);
    console.log(copy_info);
    let str = JSON.stringify(obj);
    console.log('转换出来的数据 : ' + str);
    let copy_obj = JSON.parse(str);
    copy_obj.info = copy_info;
    return copy_obj;
}

function Info() {
    this._age = 0;
    this.address = ''; // 如果这里使用的是var 声明的私有变量  那么就不会被拷贝到属性中

    this.setAge = function (age) {
        this._age = age;
    }
    this.getAge = function () {
        return this._age;
    }

    this.setAddress = function (address) {
        this._address = address;
    }

    this.getAddress = function () {
        return this._address;
    }

}

function Man() {
    this.info = {};
    this.name = '';

    this.setName = function (name) { // 函数无法转换为string 缺陷严重
        this.name = name;
    }

}

function testObjClone(callback) {
    let m1 = new Man();
    let info = new Info();
    info.setAge(18);
    info.setAddress('张家界');
    m1.info = info;
    m1.name = '小二';

    let m2 = callback(m1);
    m1.info.setAddress('钩子');
    console.log(m1.info.getAddress());
    console.log(m2.info.getAddress());

}

// testObjClone(objClone);

console.log('浅拷贝测试 -----------------------------------------------');
//
// 浅拷贝
function shallowClone(obj) {
    var _obj = typeof obj.slice == 'function' ? [] : {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const element = obj[key];
            _obj[key] = element;
        }
    }

    return _obj;
}
testObjClone(shallowClone);
console.log('深拷贝测试 -----------------------------------------------');
// 深拷贝
function deepClone(obj, copy_obj) {

}

testObjClone(deepCopy1);

function deepCopy1(p, c) {
    var c = c || {};
    for (var i in p) {
        if (typeof p[i] === 'object') {
            c[i] = (p[i].constructor === Array) ? [] : {};
            deepCopy1(p[i], c[i]);
        } else {
            c[i] = p[i];
        }
    }
    return c;
}

function deepCopy2(obj1) {
    var obj2 = Array.isArray(obj1) ? [] : {};
    if (obj1 && typeof obj1 === "object") {
      for (var i in obj1) {
        if (obj1.hasOwnProperty(i)) {
          // 如果子属性为引用数据类型，递归复制
          if (obj1[i] && typeof obj1[i] === "object") {
            obj2[i] = deepCopy2(obj1[i]);
          } else {
            // 如果是基本数据类型，只是简单的复制
            obj2[i] = obj1[i];
          }
        }
      }
    }
    return obj2;
  }

// setTimeout(function(){
//     console.log('定时器开始啦')
//     new Promise(function(callback){
//         console.log('在setTimeout中设置的Promise函数 ');
//         callback();
//     }).then(function(){
//         console.log('内部的then函数');
//     });
// });

// new Promise(function(resolve){
//     console.log('马上执行for循环啦');
//     for(var i = 0; i < 10000; i++){
//         i == 999 && resolve();
//     }
//     setTimeout(function(){
//         console.log('暂停一段时间 ' + 1000);

//     }, 5000);
// }).then(function(){
//     console.log('执行then函数啦')
// });

// console.log('代码执行结束');

function foo(a) {
    var a;
    return a;
}
console.log(foo('b'));