 // 1 , 7, 6, 8, 2, 4, 9 , 11 , 3 , 10, 5 12
console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() { // 分配到微任务的Event Queue中
        console.log('3');
    })
    new Promise(function(resolve) { // new Promise() 会直接执行
        console.log('4');
        resolve();
    }).then(function() { // then函数会分配到微任务的Event Queue中 
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})


setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})


// var END = Math.pow(2, 53);
// console.log(END);
// var START = END - 100;
// var count = 0;
// for (var i = START; i <= END; i++) {
//     count++;
// }
