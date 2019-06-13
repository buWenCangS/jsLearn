console.log('queue ---------------------------------------------------');
function Queue (){
    var items = [];

    this.enqueue = function(item){
        items.push(item);
    }

    this.dequeue = function(){
        return items.shift();
    }

    this.size = function(){
        return items.length;
    }

    this.clear = function(){
        items = [];
    }

    this.get = function (){
        return items[this.size() -1];
    }

    this.isEmpty = function(){
        return items.length == 0;
    }

    this.toString = function(){
        console.log(items);
    }
}

var queue = new Queue();
for (let i = 0; i < 10; i++) {
    queue.enqueue(i);
}
queue.toString();
queue.dequeue();
queue.toString();
queue.clear();
queue.toString();
