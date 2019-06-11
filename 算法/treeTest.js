var Tree = (

    function () {
        var Node = function (node) {
            this.left = null;
            this.right = null;
            this.data = node;
        };

        var insertNode = function (root, node) {
            while(root !== null){
                if(root.data > node.data){
                    if(root.left === null){
                        root.left = node;
                        return;
                    }
                    root = root.left;
                }else{
                    if(root.right === null){
                        root.right = node;
                        return;
                    }
                    root = root.right;
                }
            }
        }

        var insert = function(root ,node){
            if(root.data < node.data){
                if(!root.right){
                    root.right = node;
                }else{
                    insert(root.right, node);
                }
            }else{
                if(! root.left){
                    root.left = node;
                }else{
                    insert(root.left, node);
                }
            }
        }

        var searchNode = function(root , node){
            if(! root){
                return undefined;
            }
            if(root.data == node.data){
                return root;
            }else{
                if(root.data > node.data){
                    searchNode(root.left, node);
                }else{
                    searchNode(root.right, node);
                }
            }
        }

        var removeNode = function (node, key){
            if(node === null){
                return null;
            }
            if(node.data > key){
                node.left = removeNode(node.left, key);
                return node;

            }else if(node.data < key){
                node.right = removeNode(node.right, key);
                return node;
            }else{ // 找到key值对应的node节点
                if(node.left === null && node.right === null){
                    node = null;
                    return node;
                }
                if(node.left === null && node.right !== null){
                    node = node.right;
                    node.right = null;
                    return node;
                }else if(node.left !== null && node.right === null){
                    node = node.left;
                    node.left = null;
                    return node;
                }

                var minNode = findMinNode(node.right);
                node.data = minNode.data;
                node.right = removeNode(node.right, key);
                return node;

            }
        }

        var findMinNode = function (node){
            while(node && node.left){
                node = node.left;
            }
            return node;
        }
        function Tree() {
            this.root = null;

            this.add = function (node) {
                if(!node.data){
                    node = new Node(node);
                }
                if (!this.root) {
                    this.root = node;
                } else {
                    insertNode(this.root, node);
                }
            };

            this.search = function (node) {
                if (! node.data) {
                    node = new Node(node);
                }
                let root = this.root;
                while (root.data >= node.data) {
                    if (root.data == node.data) {
                        return root;
                    }
                    root = root.left;
                }

                while (root.data <= node.data) {
                    if (root.data == node.data) {
                        return root;
                    }
                    root = root.right;
                }

            };

            this.recursionSearch = function (node){
                if(! node.data){
                    throw new Error('数据异常');
                }
                searchNode(root, node);
            };

            this.centerTraverse = function(){
                let node = this.root;
                this.tracerserse(node, this.print);
            }

            this.tracerserse = function(node, callback){
                if(node !== null){
                    this.tracerserse(node.left , callback);
                    callback(node);
                    this.tracerserse(node.right, callback);
                }
               
            }

            this.print = function(node){
                console.log(node.data + "   ");
            }

            this.remove = function(key){
                return removeNode(this.root, key);
            }

        }

        return Tree;
    }

)();

var tree = new Tree();
tree.add(11);
tree.add(7);
tree.add(15);
tree.add(5);
tree.add(3);
tree.add(9);
tree.add(8);
tree.add(10);
tree.add(13);
tree.add(12);
tree.add(14);
tree.add(20);
tree.add(18);
tree.add(25);
tree.add(6);
tree.add(4);
console.log(tree.root);
var t1 = tree.root;
tree.centerTraverse();
console.log(tree.remove(11));
console.log(tree.root);
tree.centerTraverse(); // console.log 是异步的


// function Tree(){
//     this.root = null;
//     var Node = function Node (key){
//         this.key = key;
//         this.left = null;
//         this.right = null;
//     }

//     var insert = function(node, key){
//         if(node.key < key){
//             if(node.right === null){
//                 node.right = new Node(key);
//             }else{
//                 insert(node.right, key);
//             }
//         }else{
//             if(node.left === null){
//                 node.left = new Node(key);
//             }else{
//                 insert(node.left, key);
//             }
//         }
//     }

//     this.add = function(key){
//         if(this.root == null){
//             this.root = new Node(key);
//         }else{
//             insert(this.root, key);
//         }
//     }
// }

// var tree = new Tree();
// tree.add(11);
// tree.add(7);
// tree.add(15);
// tree.add(5);
// tree.add(3);
// tree.add(9);
// tree.add(8);
// tree.add(10);
// tree.add(13);
// tree.add(12);
// tree.add(14);
// tree.add(20);
// tree.add(18);
// tree.add(25);
// console.log(tree.root);