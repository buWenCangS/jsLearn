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
        if (hei - low == 0) {
            pos = low;
        }
        if (arr[pos] == value) {
            return pos;
        }

        if (arr[pos] > value) {
            if (hei >= pos) {
                hei = pos - 1;

            } else {
                hei--;
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

// ********************** 找零问题
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

var cacheChangeMoney = minCoinChange([1, 2, 5, 10, 15, 20]);
console.log(cacheChangeMoney(116));
console.log('find  93 === > ');
console.log(cacheChangeMoney(93));

// ******** 不用动态规划也能实现， 主要看应用场景
function changeMoney(totalMoney, moneys, arr) { // 假设moneys是排序好了的数组
    for (let i = moneys.length - 1; i >= 0; i--) {
        if (totalMoney == moneys[i]) {
            arr.push(i);
            return arr;
        } else if (totalMoney > moneys[i]) {
            arr.push(i);
            return changeMoney(totalMoney - moneys[i], moneys.slice(0, i + 1), arr);
        }
    }
}
console.log(changeMoney(116, [1, 2, 5, 10, 15, 20], []));

function changeMoney2(moneys) {
    const cache = [];

    const changeMoney = function (value) {
        if (!value) {
            return [];
        }
        if (cache[value]) {
            return cache[value];
        }

        let money = value;
        let min = [];
        let newMin;
        for (let i = 0; i < moneys.length; i++) {
            const element = moneys[i];
            money = value - element;
            if (money >= 0) {
                newMin = changeMoney(money);
            }

            if (money >= 0 && (newMin.length < min.length - 1 || !min.length)) {
                min = [element].concat(newMin);
                cache[value] = min;
                console.log('找零  ' + value + '  需要最小的硬币数 : ' + min.length + '  硬币的值 : ', min);
            }
        }

        return cache[value];
    }

    return changeMoney;
}

var func = changeMoney2([1, 2, 5, 10, 15, 20]);
console.log(func(63));
console.log(func(53));

// ********************** 背包问题 (下面这个是书上的解法)
function knapSack(capacity, weights, values, n) {
    const kS = []; // 
    for (let i = 0; i <= n; i++) { // {1}
        kS[i] = [];
    }
    for (let i = 0; i <= n; i++) { // 从n可以看出他是多初始化了一个物品0 即当没有物品时，
        for (let w = 0; w <= capacity; w++) {
            if (i === 0 || w === 0) { // {2} 所有的价值都是0
                kS[i][w] = 0;
            } else if (weights[i - 1] <= w) { // {3} // 走到这里其实i都是从1开始的， i-1就是 i物品对应的当前重量和价值的下标索引
                const a = values[i - 1] + kS[i - 1][w - weights[i - 1]];// 拿到该物品后所产生的最大价值
                const b = kS[i - 1][w]; // 当前容量的前一个物品 能够获得的最大价值
                kS[i][w] = a > b ? a : b; // {4} max(a,b)  // 获得是否拿当前物品的最大价值,即当前容量下， 存在当前物品和之前的物品，能够取得的最大价值
            } else {
                kS[i][w] = kS[i - 1][w]; // {5}
            }
        }
    }
    findValues(n, capacity, kS, weights, values); // {6} 增加的代码
    console.log(kS);
    return kS[n][capacity]; // {7}
}

function findValues(n, capacity, kS, weights, values) {
    let i = n;
    let k = capacity;
    console.log('构成解的物品： ');
    while (i > 0 && k > 0) {
        if (kS[i][k] !== kS[i - 1][k]) {
            console.log(`物品 ${i} 可以是解的一部分 w,v: ${weights[i - 1]}, ${values[i - 1]}`);
            i--;
            k -= kS[i][k];
        } else {
            i--;
        }
    }
}

const values = [3, 4, 5],
    weights = [2, 3, 4],
    capacity = 5,
    n = values.length;
console.log(knapSack(capacity, weights, values, n)); // 输出 7

// 背包 问题
/*
1. 物品重量
2. 物品价值


背包 ： 空间
// --- 用什么来记录
数组  ？？？ arr[]  需要记录的东西  重量， 价值, 让下标来记录物品id
id = 0; 的物品
1. 判断重量 ： w[id] < capa
        yes                     no
        capa -= w[id]            0
        value += values[id]     0
id = 1; 的物品
1. 判断重量 ： w[id] < capa
        yes                     no
        capa -= w[id]            w[id]
        value += values[id]      values[id]

当出现第一个物品的时候， 只要容量能够装下该物品那么就 拿，并且由于只有一个物品， 所以装下的价值就是物品当前的价值
第一个for循环就是初始化只有一个物品时，数组中元素的值

当物品的质量大于背包容量时就不拿，如果物体的质量小于背包的容量时，就对拿和不拿的价值进行比较
Math.max(arr[i - 1][j] , arr[i - 1][j - w[i] + v[i]]);

arr[i - 1][j] : 如果不拿， 那么就使用的是上一个物品拿不拿的价值啊 ， 而i是记录当前物品的id 
                -1 自然就是上一个物品的id， j表示容量，所以就是上一个物体当前容量所能获得的最大价值,就是arr[i-1][j]的值了

arr[i - 1][j - w[i]]: arr[i-1]表示的是上一个物品 [j - w[i]] 表示的是当前的容量装上当前的物品后剩余的容量， 该容量能够装下的最大的价值是
v[i] : 就是当前物品的价值了 

那么 arr[i - 1][j - w[i]] + v[1] 就是装上当前物品后最大的价值
max : 最大的价值就是存在当前物品和之前的其他物品时能够装入的最大价值


*/
function findMaxValues(capa, w, v) {
    let arr = [[]];
    for (let index = 0; index <= capa; index++) {
        if (index < w[0]) {
            arr[0][index] = 0;
        } else {
            arr[0][index] = v[0]; // 记录价值, 下标index记录的是物体不同的容量背包大小，在该容量下能够获得的最大价值就是这个二维数组元素的值， 【0】是物品
        }
    }

    for (let j = 0; j <= capa; j++) {
        for (let i = 1; i <= w.length - 1; i++) {
            if (!arr[i]) {
                arr[i] = [];
            }

            if (j < w[i]) {
                arr[i][j] = arr[i - 1][j];
            } else {
                arr[i][j] = Math.max(arr[i - 1][j], arr[i - 1][j - w[i]] + v[i]);
            }
        }
    }
    console.log(arr);
    return arr[w.length - 1][capa];
}

console.log(findMaxValues(capacity, weights, values));


// 最长公共子序列
function lcsPuls(wordX, wordY) {
    let x = wordX.length;
    let y = wordY.length,
        arr = [];
    for (let i = 0; i <= x; i++) {
        arr[i] = [];
        for (let j = 0; j <= y; j++) {
            arr[i][j] = 0;
        }
    }
    for (let i = 1; i <= x; i++) {
        for (let j = 1; j <= y; j++) {
            if (i == 0 || j == 0) {
                arr[i][j] = 0;
            } else if (wordX[i - 1] == wordY[j - 1]) {
                arr[i][j] = arr[i - 1][j - 1] + 1;
            } else {
                const a = arr[i - 1][j];
                const b = arr[i][j - 1];
                arr[i][j] = a > b ? a : b;
            }
        }
    }
    console.log(arr);
    return arr[x][y];


}
// function lcs(wordX, wordY) {
//     let m = wordX.length;
//     let n = wordY.length;
//     let arr = [];
//     let solution = [];
//     for (let i = 0; i <= n; i++) {
//         arr[i] = [];
//         solution[i] = [];
//         for (let j = 0; j <= m; j++) {
//             arr[i][j] = 0;
//             solution[i][j] = '0';
//         }
//     }

//     for (let i = 0; i <= n; i++) {
//         for (let j = 0; j <= m; j++) {
//             if (i === 0 || j === 0) {
//                 arr[i][j] = 0;
//             } else if (wordY[i - 1] === wordX[j - 1]) {
//                 arr[i][j] = arr[i - 1][j - 1] + 1;
//                 solution[i][j] = 'diagonal';
//             } else {
//                 const a = arr[i - 1][j];
//                 const b = arr[i][j - 1];
//                 arr[i][j] = a > b ? a : b;
//                 solution[i][j] = (arr[i][j] == arr[i - 1][j]) ? 'top' : 'left';
//             }
//         }

//     }
//     printSolution(solution, wordX, n, m);
//     console.log(arr);
//     return arr[n][m];
// }

// function printSolution(solution, wordX, m, n) {
//     let a = m;
//     let b = n;
//     let x = solution[a][b];
//     let answer = '';
//     while (x !== '0') {
//         if (solution[a][b] === 'diagonal') {
//             answer = wordX[a - 1] + answer;
//             a--;
//             b--;
//         } else if (solution[a][b] === 'left') {
//             b--;
//         } else if (solution[a][b] === 'top') {
//             a--;
//         }
//         x = solution[a][b];
//     }
//     console.log('lcs: ' + answer);
// }

console.log(lcsPuls('acbaed', 'abcadf'));
