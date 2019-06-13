// 冒泡排序

function bubbling(arr) {
    var str = '';
    for (let i = arr.length - 1; i >= 0; i--) {
        str = '\n';
        for (let j = 0; j <= i; j++) {
            str += arr[i] + ' 和 ' + arr[j] + '比较---------------------------------- \n'
            if (arr[i] < arr[j]) {
                str += arr[i] + ' < ' + arr[j] + '交换位置  ######\n';
                [arr[i], arr[j]] = [arr[j], arr[i]];
                console.log(arr);
            } else {
                str += arr[i] + ' >= ' + arr[j] + '位置不变 \n';
            }
        }
        console.log(str);
    }
    console.log(arr);
}

function bubbling2(arr) {
    console.log('冒泡 排序 写法2 ============================================nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
    var str = '';
    for (let i = 0; i < arr.length; i++) {
        str = '下一次 ==============================\n';
        for (let j = 1; j < arr.length - i; j++) {
            str += arr[j] + '  和   ' + arr[j - 1] + '  比较  ----------------------------------------------\n'
            if (arr[j] < arr[j - 1]) {
                str += arr[j] + '       <       ' + arr[j - 1] + '     交换位置 *******\n';
                [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
                console.log(arr);
            } else {
                str += arr[j] + '       >=       ' + arr[j - 1] + '     BU交换位置 \n';
            }
        }
        console.log(str);

    }
    console.log(arr);
}

var arrs = createArray();
var arrs2 = createArray();
function createArray() {
    var arrs = [];
    for (let i = 0; i < 10; i++) {
        arrs[i] = i + Math.floor(Math.random() * 120);
    }
    return arrs;

}

console.log("当前随机数组 arrs==  " + arrs);
bubbling(arrs);
console.log("当前随机数组 arrs2==  " + arrs2);
bubbling2(arrs2);
console.log("当前随机数组 ==  " + arrs2);

console.log('\n选择排序 ************************************************************************************');

// 选择排序
var arrs3 = createArray();
console.log(arrs3);
function selectSort(arr) {
    var minIndex = -1;
    for (let i = 0; i < arr.length; i++) {
        minIndex = i;
        for (let j = i; j < arr.length; j++) {
            if (arr[minIndex] > arr[j]) {
                minIndex = j;
            }
        }
        if (minIndex != i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    console.log(arr);
}
selectSort(arrs3);

// 插入排序 : 适合小型排序 为什么呢??
console.log('\n插入排序 ************************************************************************************');

// 分析 ：  循环中使用的是  前面都是排列好的数组， 当前元素 插入的位置，如果过小 会和前面排序完成的大部分数据进行比较
// 而冒泡和选择排序都是将 每个数组的最大或者最小的一些数排列好了 是不需要比较这部分数据的 ， 所以在大的数据量面前 插入排序就不适合了
// 为什么在小数据量时使用插入比冒泡选择好呢?
// 由于数据量小， 所以每次和前面的数据比较次数不会增加太多， 而且当后面的数据比前一个数据大时（升序排列)，就不用和前面的排好数组比较了
// 但是冒泡和选择， 是会将剩余的数据都进行比较的
function insertSort(arr) {
    var index = -1;
    var temp = 0;
    var str = '';
    for (let i = 1; i < arr.length; i++) {
        index = i;
        temp = arr[index];
        str = '\n'
        str += arr[i] + '       和      ' + arr[index - 1] + '比较开始 >>>>>>>> \n';
        while (temp < arr[index - 1] && index > 0) {
            str += arr[i] + '       <      ' + arr[index - 1] + '比较\n';
            arr[index] = arr[index - 1];
            index--;
        }
        console.log(str);
        arr[index] = temp;
        console.log(arr);
    }
    console.log(arr);
    return arr;
}
var arrs4 = createArray();
console.log(arrs4);
insertSort(arrs4);


console.log('\n归并排序 ************************************************************************************');

// 归并排序
function merger(arr) {
    console.log(arr);
    if (arr.length > 1) {
        let midle = Math.floor(arr.length / 2);
        let left = merger(arr.slice(0, midle));
        let right = merger(arr.slice(midle, arr.length));
        let i = j = 0;
        const result = [];
        while (i < left.length && j < right.length) {
            if (left[i] > right[j]) { // compare 的callback 来完成具体的逻辑判断
                result.push(right[j++]);
            } else {
                result.push(left[i++]);
            }
        }
        // 由于先前的数组left 和 right都是从小到大排序好的， 所以在while中比较的时候， 就会将越小的值越先插入到新数组
        // 而且当一个数组被循环完了 ， 才会跳出while 所以剩下的都是最大的值,直接放在数组末尾就可以了
        // if(i < left.length){ 
        //     result.push(...left.slice(i, left.length));
        // }else if(j < right.length){
        //     result.push(...right.slice(j, right.length));
        // }
        // console.log('排序结果 ' + result);
        // return result;
        return result.concat(i < left.length ? left.slice(i) : right.slice(j)); //concat不会改变当前调用数组的值， 会返回一个新的数组
    }
    return arr;
}
var arrs5 = createArray();
console.log(merger(arrs5));

console.log('\n快速排序 ************************************************************************************');

var countCompare = 0;
function quickSort(arr) {
    countCompare++;
    if (arr.length <= 1) { return arr };
    console.log("第" + countCompare + "次     " + arr);
    var midle = Math.floor(arr.length / 2);
    var midleNum = arr.splice(midle, 1),
        left = [],
        right = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > midleNum) {
            right.push(arr[i]);
        } else {
            left.push(arr[i]);
        }
    }

    return quickSort(left).concat(midleNum, quickSort(right));

}

// var arr3 = quickSort(arrs);
// console.log(arr3);


function sort(arr, low, hei) {
    var midle = Math.floor((low + hei) / 2);
    var value = arr[midle];
    console.log('主元 : ' + value, "下标 : " + midle);
    while (low <= hei) {
        while (arr[low] < value && low <= hei) {
            low++;
        }
        while (arr[hei] > value && low <= hei) {
            hei--;
        }
        if (low <= hei) {
            console.log('交换的下标  low = ' + low + ', hei =' + hei + '  交换的值 ' + arr[low] + ' , ' + arr[hei]);
            [arr[low], arr[hei]] = [arr[hei], arr[low]];
            low++;
            hei--;
        }
    }
    console.log(arr, '当前的返回中立下标 ' + (low));
    console.log('进行下一次交换 \n');
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
var arrs6 = createArray();
console.log(arrs6);
console.log(quick(arrs6, 0, arrs.length - 1));

console.log('\n计数排序 ************************************************************************************');

function countingSort(array) {
    if (array.length < 2) { // {1}
        return array;
    }
    const maxValue = findMaxValue(array); // {2}
    const counts = new Array(maxValue + 1); // {3}
    array.forEach(element => {
        if (!counts[element]) { // {4}
            counts[element] = 0;
        }
        counts[element]++; // {5}
    });
    let sortedIndex = 0;
    counts.forEach((count, i) => {
        while (count > 0) { // {6}
            array[sortedIndex++] = i; // {7}
            count--; // {8}
        }
    });
    return array;
}

function findMaxValue(array) {
    let max = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i] > max) {
            max = array[i];
        }
    }
    return max;
}
// console.log(countingSort(arrs2));

function countingSort1(arr) {
    if (arr.length > 1) {

        var max = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        var countArr = new Array(max + 1); // 创建最大数值的数组
        for (let i = 0; i < arr.length; i++) {
            if (!countArr[arr[i]]) {
                countArr[arr[i]] = 0;
            }
            countArr[arr[i]]++; // 记录当前数字出现的次数， 下标记录数组的元素， 元素记录个数
        }
        console.log('当前计数数组的大小 : ' + max + ', 计数数组 ==' + countArr);
        var index = 0;
        for (let i = 0; i < countArr.length; i++) {
            while (countArr[i]-- > 0) { // 拿出数据
                arr[index++] = i;
            }
        }
    }

    return arr;
}
var arrs7 = createArray();
console.log(arrs7);
console.log(countingSort1(arrs7));

//桶排序
console.log('\n 桶排序 *****************************************************************');
var arrs8 = createArray();
console.log(arrs8);

function bucketSort(arr, bucketSize = 5) {
    var result = [];
    var bucket = createBucket(arr, bucketSize);
    for (let index = 0; index < bucket.length; index++) {
        const element = bucket[index];
        let ar = insertSort(element);
        console.log(element);
        result.push(...ar);
    }
    return result;
}

function createBucket(arr, bucketSize) {
    if (arr.length > 1) {
        let max = arr[0];
        let min = arr[0];
        for (let i = 0; i < arr.length; i++) {
            if (max < arr[i]) {
                max = arr[i];
            } else if (min > arr[i]) {
                min = arr[i];
            }
        }
        // 根据数组的差值 和桶的数组长度， 计算出桶的个数， 然后创建桶
        let bucketCount = Math.floor((max - min) / bucketSize) + 1;
        let bucket = [];
        for (let i = 0; i < bucketCount; i++) {
            bucket[i] = [];
        }

        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            const bucketIndex = Math.floor((element - min) / bucketSize);// 根据区间的值划分桶的位置
            bucket[bucketIndex].push(element); // 将同一个区间的数值 装到一个桶中
            console.log('index === ' + element + ' - ' + min + ' / ' + bucketSize);
            console.log("区间桶 " + bucketIndex + ' = ' + bucket[bucketIndex]);
        }
        return bucket;
    }
    return [arr];
}

console.log(bucketSort(arrs8));

console.log('\n 基数排序 *****************************************************************');
var arrs9 = createArray();
console.log(arrs9);

//基数排序
// 根据数组中元素的进制排序， 数组中每一位的大小
function radixSort(arr, radixBase = 10) {
    if (arr.length < 2) return arr;
    let value = findMinMaxValue(arr);
    let min = value[0];
    let max = value[1];
    let base = 1;
    while ((max) / (base) >= 1) {
        arr = rSort(arr, radixBase, base, min);
        base *= radixBase;
    }

    return arr;
}

function rSort(arr, radixBase, ss, min) {
    var duckets = [],
        index = 0;
    for (let i = 0; i < radixBase; i++) {
        duckets[i] = [];
    }

    for (let i = 0; i < arr.length; i++) {
        index = Math.floor(arr[i] / ss) % radixBase;
        duckets[index].push(arr[i]);
    }
    console.log("桶中的数据 : " + duckets);
    var result = [];
    for (let i = 0; i < duckets.length; i++) {
        while (duckets[i].length > 0) {
            result.push(duckets[i].shift());
        }
    }
    return result;
}

function findMinMaxValue(arr) {
    let min = arr[0];
    let max = arr[0];
    for (let i = 0; i < arr.length; i++) {
        if (max < arr[i]) {
            max = arr[i];
        } else if (min > arr[i]) {
            min = arr[i];
        }
    }
    return [min, max];
}

console.log(radixSort(arrs9));


console.log('\n 书上demo基数排序 *****************************************************************');
var arrs10 = createArray();
console.log(arrs10);
function radixSortPlus(array, radixBase = 10) {
    if (array.length < 2) {
        return array;
    }
    const values = findMinMaxValue(array);
    const minValue = values[0];
    const maxValue = values[1];
    let significantDigit = 1; // {1}
    while ((maxValue - minValue) / significantDigit >= 1) { // {2}
        array = countingSortForRadix(array, radixBase, significantDigit, minValue); // {3}
        significantDigit *= radixBase; // {4}
        console.log("排序更新 " + array);
    }
    return array;
}

function countingSortForRadix(array, radixBase, significantDigit, minValue) {
    let bucketsIndex;
    const buckets = [];
    const aux = [];
    for (let i = 0; i < radixBase; i++) { // {5}
        buckets[i] = 0;
    }
    for (let i = 0; i < array.length; i++) { // {6}
        bucketsIndex = Math.floor(((array[i] - minValue) / significantDigit) %
            radixBase); // {7}
        buckets[bucketsIndex]++; // {8} 记录当前位数字出现的次数
    }
    console.log("桶中的记录次数 " + buckets);
    for (let i = 1; i < radixBase; i++) { // {9}
        buckets[i] += buckets[i - 1];
    }
    console.log("改变后桶中数据 " + buckets);
    for (let i = array.length - 1; i >= 0; i--) { // {10}
        bucketsIndex = Math.floor(((array[i] - minValue) / significantDigit) %
            radixBase); // {11}
        console.log('当前桶的下标 ： ' +  bucketsIndex + '  value : ' + buckets[bucketsIndex]);
        aux[--buckets[bucketsIndex]] = array[i]; // {12}
    }
    for (let i = 0; i < array.length; i++) { // {13}
        array[i] = aux[i];
    }
    return array;
}

console.log(radixSortPlus(arrs10, 10));