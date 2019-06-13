console.log("map----------------------------------------------------------");
function Dictionary(){
    var Node = {
        key : null,
        value : null,
    }

    var items = {};

    this.add = function (key, value){
        if(! items[key]){
            items[key] = value;
            return true;
        }
        return false;
    }

    this.remove = function (key){
        if(this.has(key)){
            delete items[key];
            return true;
        }
        return false;
    }

    this.clear = function (){
        items = {};
    }

    this.values = function(){
        var values = [];
        for (const key in items) {
            if (this.has(key)) {
                const element = items[key];
                values.push(element);
            }
        }
        return values;
    }

    this.keys = function (){
        var keys = [];
        for (const key in items) {
            if (this.has(key)) {
                keys.push(key);
            }
        }
        return keys;
    }

    this.get = function(key){
        return items[key];
    }

    this.has = function (key){
        return items.hasOwnProperty(key);
    }
}

var dic = new Dictionary();
dic.add('zhangsan', {name : "张三", age : 18});
dic.add('1', {name : "张三1", age : 18});
dic.add('2', {name : "张三2", age : 18});
dic.add('3', {name : "张三3", age : 18});
dic.add('4', {name : "张三4", age : 18});
dic.add('5', {name : "张三5", age : 18});
console.log(dic.get('zhangsan'));
console.log(dic.values());
console.log(dic.keys());
dic.remove("5");
console.log(dic.keys());
dic.clear();
console.log(dic.keys());
