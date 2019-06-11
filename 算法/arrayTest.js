var arr = [];
for (let i = 0; i < 20; i++) {
    arr.push(i);
}

var result = arr.every(function(value, index, arr){
    return value % 2 == 0;
});
var result1 = arr.every(function(value, index, arr){
    return typeof value === 'number';
});

console.log(result); // false
console.log(result1); // true

// fill  填充数组， 通过 
var arr1 = arr.fill(55, 0, 1); 
console.log(arr);
console.log(arr1);
 // 保留成功通过函数过滤的元素， 并且保存在一个新的数组中， 该操作不会影响原来的数组
var arr2 = arr.filter(function (value, index , array){
    return value % 2 == 0;
});
console.log(arr2);
console.log(arr);


//find 提供满足函数的第一个元素
var find = arr.find(function(value){
    return value == 2;
});
console.log(find);

//findIndex 提供满足函数的第一个元素的下标
var findIndex = arr.findIndex(function (value){
    return value == 2;
});
console.log(findIndex);

// 按照升序 每一个元素都执行该函数, 并且最终返回一个结果
var result2 = arr.reduce(function (previousVlue, currentValue, currentIndex, array){
    return previousVlue += currentValue;
});

console.log(result2);

var zhangsan = {
    name : '张三',
    age : 18
}

var lisi = {
    name : '李四',
    age : 18
}

var changeAge = function(obj){ 
    // #### 值 传递 指向同一个引用，的两个值， 可以修改值， 但是修改引用也就是切断了和传递参数的对象的引用， 所以修改引用是无用的
    // #### java中的参数传递和js的参数传递是一样的, 参数传递的是引用地址的值
    if(obj.age){
        // obj.address = '张家界'
        // obj = lisi;  不能改变参数的引用， 可以改变值
    }
    return obj;
}

changeAge(zhangsan);
console.log(zhangsan);


console.log('arrayTest --------------------------------------------------------------');

