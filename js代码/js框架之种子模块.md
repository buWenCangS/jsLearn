### js框架的几种类型
** 第一种 以命名空间为导向的框架**
** 第二种 以工厂类为导向的框架**
** 第三种 以选择器为导向的框架**
** 第四种 以加载器串联为导向的框架**
** 第五种 有明确分层的MV*框架**

##js框架的主要功能
__jQuery 专注于dom操作 ，以后就是性能 兼容性上的改进__
__Prototype.js 早期的王者 __
* 语言扩展
* dom扩展
* ajax
* 废弃的部分（使用其他方法实现)
__mootools
* API 优雅  原型扩展

## 对比得出 
* >对基本数据的操作是基础 （each ， map。。。。
* >类型判定必不可少 isXXX系列
* >选择器， domReady, Ajax是现代框架的标配
* >dom操作是重点之重， 节点的样式， 属性 ， 遍历都是它的范畴
* >borwer sniff(浏览器嗅探) 已经过时了， feature detect（特征检测) 正在被应用， 但是不能成为框架的核心部分， 只能做成插件
* >主流的事件系统都支持， 事件代理
* >数据的缓存 处理
* >动画引擎
* >插件的易开发 和 扩展性
* >提供诸如 Deferred(是对事件处理的一种机制，减少同一个对象多个事件的嵌套触发机制， 能够直接在事件后面继续添加监听事件)这样的处理解决方案
* >即使不提供工厂类， 还是需要有 extend 方法 mixin方法可以对对象进行扩展
* >jQuery的noConfict方法（避免和其他框架和类库的$符号重合 ，产生冲突， 通过该方法，会释放$符号 供给其他框架 或者 类库使用
* >许多框架非常重视cookie的操作

#### 种子模块
## IIFE立即执行函数  (function(){})() ; note : 防止变量污染; 即 执行完毕就会销毁掉函数中声明的变量，对象
### 命名空间 ： 可以使得一个对象中  可以包含另一个对象 。。。 调用方法的方式  也就成了 对象.对象.对象.func();
* Prototype Base2 和 mootools使用的是 扩展原生对象， mootools是Prototype的升级版， 现在又很多的插件都是基于 Prototype实现的
* 第二类是 jQuery 和 YUI EXT,  YUI 和 ext是和上面所说的叠罗汉的方式实现对象扩展的， jQuery是另辟途径使用选择器来完成对象的扩展的，  jQuery的类库共用的原理就是先使用一个变量将出现的同名变量保存起来 在通过 noConfict方法  将变量换回去， 其他框架想要实现也是非常的简单

### 对象的扩展
* extend 方法  
> ```function extend (destination, source){
	for(var key in source)  // 但是  在IE中对象是不能遍历出object的原型方法
		destination[key] = source[key];
	}```
	
mess Framework 的mixin方法
``` javascript
function mixin(destination, source){
	var arg = [].prototype.slice.call(arguments),
		i = 1,
		key,
		ride = typeof arg[arg.length - 1] == 'boolean' ? arg.pop() : true; // 判断是否覆写同名属性
	if(arg.length === 1){
		destination = !this.window ? this : {};
		i = 0;
	}
	while(source = arg[i ++]){
		for(var key in source){
			if(ride || !key in destination){
				destination[key] = source[key];
			}
		}
	}
	
	return destination;
}
```

### 数组化 ： 提供数组化的对象
### 类型判断
### domReady
> 注意点： 在dom加载之前 ， 进行加载判断 window.onload 中处理dom事件 等问题， 避免在dom的代码还没加载完成就被调用的尴尬局面
### 命名空间 ： 将冲突对象进行替换， 使得框架 或者 类库之间不会产生冲突

	
	

