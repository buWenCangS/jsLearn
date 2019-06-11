#### 模块加载系统
### 服务器端的js规范 CommonJS  浏览器的js规范 AMD CMD
1.	AMD是异步加载模块的定义， 主要用于浏览器模块化开发，  CommonJS是用于服务端开发
2.	AMD 主要使用define定义模块  使用 require 导入模块
3.	CommonJs 是Node.js主要使用的模块化定义的规范， 使用module.exports定义一个模块  ， 使用require导入模块
4.	关于模块化  还可以使用ES6 的export ， export default 定义模块， 使用 import来导入模块
CMD 通用模块的定义 ， 使用define 就近使用加载的模块