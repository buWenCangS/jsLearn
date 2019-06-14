// 简单的线性查找就不写了 
function createArr(){
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
function binarySearch(arr, value){
    arr = quick(arr,0,arr.length - 1);
    console.log(arr);
    let midle = Math.floor(arr.length / 2),
        left = 0,
        right = arr.length - 1;
    if(value == arr[midle]){
        return midle;
    }
    while(value != arr[midle] && left <= right){
        midle = Math.floor((right + left) / 2);
        if(arr[midle] < value){
            left = midle + 1;
        }else if(arr[midle] > value){
            right = midle - 1;
        }else{
            return midle;
        }
    }
    return -1;
}
// 递归二分
function mergerBinarySearch(arr, value, low, hei){
    var index = -1;
    if(low <= hei){
        let midle = Math.floor((low + hei) / 2);
        console.log("当前的中立元素 的value " + arr[midle]);
        if(arr[midle] < value){
            index = mergerBinarySearch(arr, value, midle + 1, hei);
        }else if(arr[midle] > value){
            index = mergerBinarySearch(arr, value, low, midle - 1);
        }else {
            return midle;
        }
    }
    // console.log("结束" );
    return index;

}
var arrs1 = createArr();
console.log(arrs1);
console.log(binarySearch(arrs1, 5));
arrs1 = quick(arrs1,0,arrs1.length - 1);
var findIndex = mergerBinarySearch(arrs1,5,0,arrs1.length - 1);
console.log('我来找你了  5'  + findIndex );