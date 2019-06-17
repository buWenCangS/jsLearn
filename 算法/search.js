// 简单的线性查找就不写了 
function createArr() {
    let arr = [];
    for (let index = 0; index < 20; index++) {
        arr[index] = Math.floor(Math.random() * 20);
    }
    return arr;
}
function sort(arr, low, hei) {
    var midle = Math.floor((low + hei) / 2);
    var value = arr[midle];
    // console.log('主元 : ' + value, "下标 : " + midle);
    while (low <= hei) {
        while (arr[low] < value && low <= hei) {
            low++;
        }
        while (arr[hei] > value && low <= hei) {
            hei--;
        }
        if (low <= hei) {
            // console.log('交换的下标  low = ' + low + ', hei =' + hei + '  交换的值 ' + arr[low] + ' , ' + arr[hei]);
            [arr[low], arr[hei]] = [arr[hei], arr[low]];
            low++;
            hei--;
        }
    }
    // console.log(arr, '当前的返回中立下标 ' + (low));
    // console.log('进行下一次交换 \n');
    return low;
}

function quick(arr, low, hei) {
    if (arr.length > 1) {
        var index = sort(arr, low, hei);
        // console.log("当前中立下标" + index);
        if (low < index - 1) {
            quick(arr, low, index - 1);
        }
        if (index < hei) {
            quick(arr, index, hei);
        }
    }
    return arr;
}
// 二分搜索
function binarySearch(arr, value) {
    arr = quick(arr, 0, arr.length - 1);
    console.log(arr);
    let midle = Math.floor(arr.length / 2),
        left = 0,
        right = arr.length - 1;
    if (value == arr[midle]) {
        return midle;
    }
    while (value != arr[midle] && left <= right) {
        midle = Math.floor((right + left) / 2);
        if (arr[midle] < value) {
            left = midle + 1;
        } else if (arr[midle] > value) {
            right = midle - 1;
        } else {
            return midle;
        }
    }
    return -1;
}
// 递归二分
function mergerBinarySearch(arr, value, low, hei) {
    var index = -1;
    if (low <= hei) {
        let midle = Math.floor((low + hei) / 2);
        console.log("当前的中立元素 的value " + arr[midle]);
        if (arr[midle] < value) {
            index = mergerBinarySearch(arr, value, midle + 1, hei);
        } else if (arr[midle] > value) {
            index = mergerBinarySearch(arr, value, low, midle - 1);
        } else {
            return midle;
        }
    }
    // console.log("结束" );
    return index;

}
var arrs1 = createArr();
console.log(arrs1);
console.log(binarySearch(arrs1, 5));
arrs1 = quick(arrs1, 0, arrs1.length - 1);
var findIndex = mergerBinarySearch(arrs1, 5, 0, arrs1.length - 1);
console.log('我来找你了  5' + findIndex);


// 内插搜索
function insertValue(arr, value) {
    let hei = arr.length - 1;
    let low = 0;
    let pos;
    while (low <= hei) {
        // 有的情况不适用 ， 特别是不存在相同元素的情况
        pos = Math.floor((value - arr[low]) / (arr[hei] - arr[low]) * (hei - low) + low);
        if(hei - low == 0){
            pos = low;
        }
        if (arr[pos] == value) {
            return pos;
        }

        if (arr[pos] > value) {
            if(hei >= pos){
                hei = pos - 1;

            }else{
                hei --;
            }
        } else {
            low = pos + 1;
        }
    }
    return -1;
}

console.log(arrs1);
// console.log("为5的索引  ============== " + insertValue(arrs1, 5));

// 洗牌算法    洗牌次数越多洗牌效果越差
// function shuffle(arr) {
//     for (let index = arr.length - 1; index >= 0; index--) {
//         let change = Math.floor(Math.random() * (index + 1));
//         [arr[change], arr[index]] = [arr[index], arr[change]];
//     }
// }
// shuffle(arrs1);
// console.log(arrs1);

function minCoinChange(coins) {
    const cache = []; // {1}
    const makeChange = (value) => { // {2}
        if (!value) { // {3}  // 判断是否为空 如果value的值为0 那么返回空的数组
            return [];
        }
        if (cache[value]) { // {4}  缓存数据
            return cache[value];
        }


        let min = []; // 记录最小找零数组
        let newMin; // 记录当当前金币最小的数量金币组合数组
        let newAmount; // 更新剩余找零数量
        for (let i = 0; i < coins.length; i++) { // {5}
            const coin = coins[i];   // 当前金币面值
            newAmount = value - coin; // {6}
            if (newAmount >= 0) {
                newMin = makeChange(newAmount); // {7}
            }
           
            if (
                newAmount >= 0 && // {8}
                (newMin.length < min.length - 1 || !min.length) //&& // {9}
                // (newMin.length || !newAmount) // {10}
            ) {
                min = [coin].concat(newMin); // {11}
                console.log('new Min ' + min + ' for ' + value);
                cache[value] = min;
            }
        };
        return (cache[value] = min); // {12}
    }
    return makeChange; // {13}
    // return makeChange;
}

var cacheChangeMoney = minCoinChange([1,2,5,10,15,20]);
console.log(cacheChangeMoney(116));
console.log('find  93 === > ' );
console.log(cacheChangeMoney(93));


function changeMoney(totalMoney , moneys, arr){ // 假设moneys是排序好了的数组
    for(let i = moneys.length - 1; i >= 0; i --){
        if(totalMoney == moneys[i]){
            arr.push(i);
            return arr;
        }else if(totalMoney > moneys[i]){
            arr.push(i);
            return changeMoney(totalMoney - moneys[i], moneys.slice(0 , i + 1), arr);
        }
    }
}
console.log(changeMoney(116,[1,2,5,10,15,20], []));

function changeMoney2 (moneys){
    const cache = [];

    const changeMoney = function(value){
        if(!value){
            return [];
        }
        if(cache[value]){
            return cache[value];
        }

        let money = value;
        let min = [];
        let newMin;
        for (let i = 0; i < moneys.length; i++) {
            const element = moneys[i];
            money = value - element;
            if(money >= 0){
                newMin = changeMoney(money);
            }

            if(money >= 0 && (newMin.length < min.length - 1 || !min.length)){
                min = [element].concat(newMin);
                cache[value] = min;
                console.log('找零  ' + value + '  需要最小的硬币数 : ' + min.length + '  硬币的值 : ', min);
            }
        }

        return cache[value];
    }

    return changeMoney;
}

var func = changeMoney2([1,2,5,10,15,20]);
console.log(func(63));
console.log(func(53));
