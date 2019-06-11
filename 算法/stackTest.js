var Stack = (
    function(){
        const key = "jiu";
        class Stack{
            constructor(){
                this[key] = [];
            }

            pop(){
                return this[key].pop();
            }

            push(value){
                this[key].push(value);
            }

            size (){
                return this[key].length;
            }

            clear(){
                this[key] = [];
            }

            peek(){
                return this[key][this.size() - 1];
            }

            isEmpty(){
                return this.size() == 0;
            }
        }

        return Stack;
    }
)();

var arr = new Stack();
for (let i = 0; i < 10; i++) {
    arr.push(i + 1);
}
// console.log(arr);  测试完成

//十进制转二进制
function changeBinary(num){
    var binaryArr = new Stack();
    while(num > 0){
        let bin = num % 2;
        binaryArr.push(bin);
        num = Math.floor(num / 2);
    }
    var binstr = '';
    while(! binaryArr.isEmpty()){
        binstr += binaryArr.pop();
    }
    console.log(binstr);
}

changeBinary(5);
changeBinary(15);
changeBinary(16);
// 十进制 转换成任意进制
function converNumber(num, scale){
    var scaleStack = new Stack(),
        scaleStr = '',
        modNum,
        scaleKey = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];
    while(num > 0){
        modNum = num % scale;
        scaleStack.push(modNum);
        num = Math.floor(num / scale);
    }

    while(! scaleStack.isEmpty())
    {
        scaleStr += scaleKey[scaleStack.pop()];
    }

    console.log(scaleStr);
}

converNumber(16, 2);
converNumber(16, 8);
converNumber(16, 16);
converNumber(16, 10);

// 圆括号平衡
function parenthesisBalance(str){

    var pattern = /^(\(|\)*$)/;
    if(! pattern.test(str)){
        throw new Error('当前输入有误!!!!!!!!!!!!!!!!!!!!!!!!');
    }
    var i = 0;
    var stack = new Stack();
    while(str.length > i){
        if(str[i] == '('){
            stack.push(str[i]);
        }else{
            if(stack.isEmpty()){
                return false;
            }
            stack.pop();
        }
        i++;
    }
    return stack.isEmpty();
}
console.log(parenthesisBalance('()()()(()())()))'));
console.log(parenthesisBalance('()()()(()())()()()'));

//汉罗塔
// A  -----> B  -----> C
// A --- > B --- >C
// A --- > B 
// A --- > C
// B --- > C
// A --- > B
// C --- > A
// C --- > B
// A --- > B


function towerOfHanoi(){

}