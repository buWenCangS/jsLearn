var di1 = new Dictionary();
console.log(di1);

function Graph() { // 邻接表 表示图
    var vartex = []; // 顶点
    var adjoinSide = new Dictionary();
    var char = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

    this.addVertex = function (v) {
        vartex.push(v);
        adjoinSide.add(v, []);
    }

    this.addSide = function (v, w) { // 无向图
        adjoinSide.get(v).push(w);
        adjoinSide.get(w).push(v);// 将该行注释掉就是有向图了
    }

    this.toString = function () {
        var str = '';
        vartex.forEach(v => {
            str = v + " ------------->" + adjoinSide.get(v).join("  ")
            console.log(str);
        });
    }

    var initColor = function () {
        var color = [];
        for (let i = 0; i < vartex.length; i++) {
            const element = vartex[i];
            color[element] = 'white';
        }

        return color;
    }

    this.bfs = function (v, callback) {
        var queue = new Queue();
        var color = initColor();
        queue.enqueue(v);
        while (!queue.isEmpty()) {
            var currVartex = queue.dequeue();
            var arr = adjoinSide.get(currVartex);
            color[currVartex] = 'gray'
            for (let i = 0; i < arr.length; i++) {
                if (color[arr[i]] === 'white') {
                    color[arr[i]] = 'gray';
                    queue.enqueue(arr[i]);
                }
            }
            color[currVartex] = 'black';
            if (callback) {
                callback(currVartex);
            }
        }
    }

    this.dfs = function (callback) {
        var color = initColor();
        for (let i = 0; i < char.length; i++) {
            if (color[char[i]] === 'white')
                dfsVartex(char[i], color, callback);
        }
    }

    var dfsVartex = function (v, color, callback) {
        var vartexs = adjoinSide.get(v);
        color[v] = 'gray';
        if (callback) {
            callback(v);
        }
        for (let i = 0; i < vartexs.length; i++) {
            if (color[vartexs[i]] == 'white') {
                dfsVartex(vartexs[i], color, callback);
            }
        }
        color[v] = 'black';

    }

    this.BFS = function (v) {
        var queue = new Queue(),
            color = initColor(),
            dis = [],
            preVartex = [];
        for (let i = 0; i < vartex.length; i++) {
            const element = vartex[i];
            dis[element] = 0;
            preVartex[element] = null;
        }
        queue.enqueue(v);
        while (!queue.isEmpty()) {
            var w = queue.dequeue();
            color[w] = 'gray';
            var side = adjoinSide.get(w);
            for (let i = 0; i < side.length; i++) {
                if (color[side[i]] == 'white') {
                    color[side[i]] = 'gray';
                    dis[side[i]] = dis[w] + 1;
                    preVartex[side[i]] = w;
                    queue.enqueue(side[i]);
                }
            }
            color[w] = 'black';
        }

        return {
            distances: dis,
            preVartexs: preVartex
        }

    }

    this.graph = [[0, 2, 4, 0, 0, 0],
    [0, 0, 1, 4, 2, 0],
    [0, 0, 0, 0, 3, 0],
    [0, 0, 0, 0, 0, 2],
    [0, 0, 0, 3, 0, 2],
    [0, 0, 0, 0, 0, 0]];

    var INF = Number.MAX_SAFE_INTEGER;

    this.floydWarshall = function () {
        var dist = [],
            length = this.graph.length,
            i, j, k;
        for (i = 0; i < length; i++) { //{1}
            dist[i] = [];
            for (j = 0; j < length; j++) {
                dist[i][j] = this.graph[i][j];
            }
        }
        for (k = 0; k < length; k++) { //{2}
            for (i = 0; i < length; i++) {
                for (j = 0; j < length; j++) {
                    if (dist[i][k] + dist[k][j] < dist[i][j]) { //{3}
                        dist[i][j] = dist[i][k] + dist[k][j]; //{4}
                    }
                }
            }
        }
        return dist;
    };

    this.dijkstra = function (src) {
        var dist = [], visited = [],
            length = this.graph.length;
        for (var i = 0; i < length; i++) { //{1}
            dist[i] = INF;
            visited[i] = false;
        }
        dist[src] = 0; //{2}
        for (var i = 0; i < length - 1; i++) { //{3}
            var u = minDistance(dist, visited); //{4}
            console.log('u ================== > ' + u);
            visited[u] = true; //{5}
            for (var v = 0; v < length; v++) {
                if (!visited[v] &&
                    this.graph[u][v] != 0 && dist[u] != INF &&
                    dist[u] + this.graph[u][v] < dist[v]) { //{6}
                    dist[v] = dist[u] + this.graph[u][v]; //{7}
                }
            }
        }
        return dist; //{8}
    };

    var minDistance = function (dist, visited) {
        var min = INF, minIndex = -1;
        for (var v = 0; v < dist.length; v++) {
            if (visited[v] == false && dist[v] <= min) {
                min = dist[v];
                minIndex = v;
            }
        }
        return minIndex;
    };

}

// var graph = new Graph();
// graph.addVertex('A');
// graph.addVertex('B');
// graph.addVertex('C');
// graph.addVertex('D');
// graph.addVertex('E');
// graph.addVertex('F');
// graph.addVertex('G');
// graph.addVertex('H');
// graph.addVertex('I');


// graph.addSide('A', 'B');
// graph.addSide('A', 'C');
// graph.addSide('A', 'D');
// graph.addSide('C', 'D');
// graph.addSide('C', 'G');
// graph.addSide('D', 'G');
// graph.addSide('D', 'H');
// graph.addSide('B', 'E');
// graph.addSide('B', 'F');
// graph.addSide('E', 'I');
// graph.toString();

// graph.bfs('C', function (vartex) {
//     console.log('探索顶点 : ' + vartex)
// });

// console.log(graph.BFS('A'));

// graph.dfs(function (v) {
//     console.log('查看的顶点 :  ' + v);
// })

// var findMinDis = function (v, obj) {
//     var vartex = obj.preVartexs[v];

// }

// console.log(graph.dijkstra(5));
// console.log(graph.floydWarshall());


var graph = [[0, 2, 4, 0, 0, 0],
            [0, 0, 1, 4, 2, 0],
            [0, 0, 0, 0, 3, 0],
            [0, 0, 0, 0, 0, 2],
            [0, 0, 0, 3, 0, 2],
            [0, 0, 0, 0, 0, 0]];
const INF = Number.MAX_SAFE_INTEGER;
const dijkstra = (graph, src) => {
    const dist = [];
    const visited = [];
    const { length } = graph;
    for (let i = 0; i < length; i++) { // {1}
        dist[i] = INF;
        visited[i] = false;
    }
    dist[src] = 0; // {2}
    for (let i = 0; i < length - 1; i++) { // {3}
        const u = minDistance(dist, visited); // {4} 寻找距离最近的点
        visited[u] = true; // {5} 将走过的路线记录
        for (let v = 0; v < length; v++) {
            if (!visited[v] &&
                graph[u][v] !== 0 && // 必须是通路
                dist[u] !== INF && // 必须是有距离的， 不是初始化的值
                dist[u] + graph[u][v] < dist[v]) { // {6} 是不是比原来的距离更近
                dist[v] = dist[u] + graph[u][v]; // {7}
            }
        }
    }
    return dist; // {8}
};

const minDistance = (dist, visited) => {
    let min = INF;
    let minIndex = -1;
    for (let v = 0; v < dist.length; v++) {
        if (visited[v] === false && dist[v] <= min) {
            min = dist[v]; // 会将该数值换成最小的数值
            minIndex = v;
        }
    }
    return minIndex;
};

console.log(dijkstra(graph,0));