
function Set() {
    let item = {};

    this.add = function (value) {
        if (!this.has(value)) {
            item[value] = value;
            return true;
        }
        return false;
    }

    this.remove = function (value) {
        if (this.has(value)) {
            delete item[value];
            return true;
        }
        return false;
    }

    this.size = function () {
        let count = 0;
        for (const key in item) {
            if (item.hasOwnProperty(key)) {
                count++;
            }
        }
        return count;
    }

    this.values = function () {
        var values = [];
        for (const key in item) {
            if (item.hasOwnProperty(key)) {
                const element = item[key];
                values.push(element);
            }
        }
        return values;
    }

    this.clear = function () {
        item = {};
    }

    this.has = function (value) {
        return value in item;
    }

    this.union = function(otherSet){ // 并集 返回新的集合
        var set = new Set();
        var values = otherSet.values();
        values = Array.prototype.concat.call(values, this.values());
        values.forEach(element => {
            set.add(element);
        });
        return set;
    }

    //交集
    this.intersection = function(otherSet){
        var set = new Set();
        var values1 = otherSet.values();
        for (let i = 0; i < values1.length; i++) {
            const element = values1[i];
            if(this.has(element)){
                set.add(element);
            }
        }
        return set;
    }

    // 差集
    this.differenceSet = function (otherSet){
        var set = new Set();
        this.values().forEach(element => {
            if(! otherSet.has(element)){
                set.add(element);
            }
        });
        return set;
    }

    // 子集
    this.subSet = function(otherSet){
        var values = otherSet.values();
        if(this.size() < otherSet.size()){
            return false;
        }
        for (let i = 0; i < values.length; i++) {
            const element = values[i];
            if(!this.has(element)){
                return false;
            }
        }

        return true;
    }
}


var set = new Set();
for (let i = 0; i < 10; i++) {
    set.add(i);
}
console.log(set.values());
console.log(set);

var set1 = new Set();
for(let i = 0 ; i < 20; i ++){
    set1.add(i);
}

var set2 = set.union(set1);
console.log(set2.values());
console.log(set.intersection(set1).values());

var set3 = set1.differenceSet(set);
console.log(set3.values());

console.log(set1.subSet(set));
console.log(set.subSet(set1));





























console.log('-----------------------------------------------------------------------------------------');