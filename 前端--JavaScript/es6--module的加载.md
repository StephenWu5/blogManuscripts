
浏览器的加载方式对页面的加载速度影响很大，所以一个前端工程师研究这个是有帮助的。

## 加载规则

### 传统方法

一般在公司都是用标签`script` 加载javascript 代码

```js
<!-- 页面内嵌的脚本 -->
<script type="application/javascript">
  // module code
</script>

<!-- 外部脚本 -->
<script type="application/javascript" src="path/to/myModule.js">
</script>
```

一般渲染遇到`script`就会停止，执行里面的代码，如果是外部脚本，还要加上下载的时间。网络不好的情况下，就会出现卡死的情况。

这时候，你就需要采用**异步加载**的方式来解决这个问题。

在`script`标签上加上`defer`或者`async`就可以达到目的。

```js
<script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script>
```

`defer`是等页面渲染完才执行，有多个时按照顺序执行；`async`是下载完中断渲染就执行，有多个时不能保证顺序执行。

### 加载规则

现在的很多js文件都是采用es6模块，可以加载它们，但是要加上`type='module'`。

在加上`type='module'` 的同时也可以加上 `defer`或者`async`;如果不加，默认就是`defer`的效果；

`defer`是等页面渲染完才执行，有多个时按照顺序执行；`async`是下载完就中断渲染执行，有多个时不能保证顺序执行。

ES6的模块也允许内嵌在网页中，语法行为与加载外部脚本完全一致。

```javascript
<script type="module">
  import utils from "./utils.js";
  // other code
</script>
```



外部的模块脚本，有几点需要注意：

* 代码是模块作用域之中运行的，不是在全局作用域运行。内部的顶层变量，外部不可见。
* 模块脚本自动采用严格模式。
* 模块之中，使用`import`命令加载其他模块（.js后缀不可省略），也可以使用`export`命令输出对外接口。
* 模块之中，顶层的`this`关键词返回`undefined`，而不是指向`window`。也就是说，在模块中顶层使用`this`是没有意义的。
* 同一模块如果加载多次，将只执行一次。

下面是一个实例模块

```javascript
import utils from 'https://example.com/js/utils.js';

const x = 1;

console.log(x === window.x); //false
console.log(this === undefined); // true
```

利用顶层的`this`等于`undefined`这个语法点，可以侦测当前代码是否在 ES6 模块之中。

```javascript
const isNotModuleScript = this !== undefined;
```

------

## ES6模块与CommonJs模块的区别



它俩的2个重大差异：

* CommonJS模块输出的是一个值的拷贝，ES6模块输出的是值的应用。
* CommonJs运行时加载，ES6模块是编辑时输出接口。

第二个差异是因为CommonJS加载的是一个对象（即`module.exports`属性），该对象只有在脚本运行完才会生成。ES6模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

```javascript
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};
```

```javascript
// main.js
var mod = require('./lib');

console.log(mod.counter);  // 3
mod.incCounter();
console.log(mod.counter); // 3
```

上面的代码说明，`lib.js`加载以后，内部变化的影响不到输出的`mod.counter`了。这是因为`mod.counter`是一个原始类型的值，会被缓存。除非写成一个函数，才能的到内部变动后的值。

```javascript
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  get counter() {
    return counter
  },
  incCounter: incCounter,
};
```

ES6模块的运行机制与CommonJS不一样。JS引擎对脚本静态分析时，遇到`import`,就会生成一个只读引用。等到脚本真正执行时，更根据这个应用，到被加载的模块里面去取值。ES6的`impot` 有点像动态引用，不会缓存值，模块里面的变量绑定其所在的模块。

```javascript
// lib.js
export let counter = 3;
export function incCounter() {
  counter++;
}

// main.js
import { counter, incCounter } from './lib';
console.log(counter); // 3
incCounter();
console.log(counter); // 4
```

再举一个例子吧。

```javascript
// m1.js
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);

// m2.js
import {foo} from './m1.js';
console.log(foo)；
setTimeout(() => console.log(foo), 500);
```

再一次说明，es6模块不会搞出一些缓存，而是到模块里面去取值。变量是属于所在的模块里面的呢。

ES6 输入的模块变量，只是一个“符号连接”，所以这个变量是只读的，对它进行重新赋值会报错。

```javascript
// lib.js
export let obj = {};

// main.js
import { obj } from './lib';

obj.prop = 123; // OK
obj = {}; // TypeError
```

因为是通过引用来传值的，所以在module.js里面拿到的值都是，就算是不同的接口，拿到的都是相同的实例。

```javascript
// mod.js
function C() {
  this.sum = 0;
  this.add = function () {
    this.sum += 1;
  };
  this.show = function () {
    console.log(this.sum);
  };
}

export let c = new C();
```

## Node加载

### 概述

Node对es6模块的处理麻烦，因为它是CommonJS模块格式。现在的处理方案是将两个分开处理。

Node要求ES6模块采用`.mjs`后缀，也就是说，脚本文件采用`import`或者`export`命令，就必须用`.mjs`后缀名。`require`不能加载`mjs`后缀的文件，会报错的。其实这个功能还在试验阶段。这个要求Node8.5.0才可以打开这个功能。

为了与浏览器的`import`加载规则相同，Node的`.mjs`文件支持URL路径。

```javascript
import './foo?query=1'; 
```

如果这些参数文件名有`:`等特殊字符，最好是进行转义。

目前，Node的`import`命令只支持加载本地模块，不支持加载远程模块。如果模块名称不含路径，那么`import`命令就会去`node_modules`目录寻找这个模块。

```javascript
import 'baz';
import 'abc/123';
```

当然，如果模块包含路径，那么命令会按照路径去寻找这个名字的脚本文件。

如果脚本文件省略了后缀名，比如`import './foo'`,Node会依次尝试四个后缀名：`./foo.mjs`、`./foo.js`、`./foo.json`、`./foo.node`。如果没有这些脚本都不存在，Node会去加载`./foo/package.json`的`main`字段制定的脚本。如果还是没有。那么会依次加载`./foo/index.mjs`、`./foo/index.js`、`./foo/index.json`、`./foo/index.node`，如果还是不存在，就会抛出错误。

最后，Node的`import`命令都是异步加载的，和浏览器的处理方法相同。

### 内部变量

ES6模块应该是通用的，同一个模块不用修改，就可以用在浏览器环境和服务器环境。为了达到这个目标，Node是不能拥有和CommonJs模块一样的某些内部变量。

`this`关键字，es6模块模块中,`this`指向`undefined`;CommonJs模块中`this`指向当前模块。

这些变量在ES6模块中是不存在的。`arguments`、 `require`、 `module`、 `exports`、 `__filename`、 `__dirname`。

可以用es6模块去加载CommonJS模块，这样子可以得到上述的变量，但是不推荐这样子做，因为这样子ES6就不可以直接用于浏览器环境了。

```javascript
// expose.js
module.exports = {__dirname};

// use.mjs
import expose from './expose.js';
const {__dirname} = expose;
```

### ES6模块加载CommonJS模块

CommonJS模块的输出定义在`module.exports`这个属性上面。当Node的`import`加载CommonJS模块，node会自动将`module.exports`属性，当做是默认输出，这就等同于`export default xxx`。

```javascript
// a.js
module.exports = {
  foo: 'hello',
  bar: 'world'
};

// 等同于
export default {
  foo: 'hello',
  bar: 'world'
};
```

所以有三种方法可以拿到`module.exports`;

```javascript
// 写法一
import baz from './a';
// baz = {foo: 'hello', bar: 'world'};

// 写法二
import {default as baz} from './a';
// baz = {foo: 'hello', bar: 'world'};

// 写法三
import * as baz from './a';
// baz = {
//   get default() {return module.exports;},
//   get foo() {return this.default.foo}.bind(baz),
//   get bar() {return this.default.bar}.bind(baz)
// }
```

上面代码的第三种写法,可以通过`baz.default`拿到`module.exports`。`foo`属性和`baz`属性就是通过这种方法拿到了`module.exports`。

```javascript
// b.js
module.exports = null;

// es.js
import foo from './b';
// foo = null;

import * as bar from './b';
// bar = { default:null };
```

上面代码中，`es.js`采用了第二种写法，要通过`bar.default`的写法，才能达到了`module.exports`;

```javascript
// c.js
module.exports = function two() {
  return 2;
};

// es.js
import foo from './c';
foo(); // 2

import * as bar from './c';
bar.default(); // 2
bar(); // throws, bar is not a function

```

上面代码中，baz本身就是一个对象，不能当做函数调用，只能通过`bar.default`调用。CommonJS模块的输出缓存机制，在ES6加载方式下依然有效。

```javascript
// foo.js
module.exports = 123;
setTimeout(_ => module.exports = null);
//上面代码中对于加载foo.js的脚本，module.exports的输出值一直是123；
```
因为ES6模块是编译时确定输出接口，CommonJs模块是运行时确定输出接口。采用`import`命令加载CommonJs模块时，不允许采用下方的写法。

```javascript
// 不正确
import { readFile } from 'fs';
```

上方的写法不正确，因为`fs`是CommonJS格式，运行时才确定`readFile`接口，解决方法就是改为整体输入。

```javascript
// 正确的写法一
import * as express from 'express';
const app = express.default();

// 正确的写法二
import express from 'express';
const app = express();
```


### CommonJs模块加载ES6模块

CommonJs模块加载ES6模块，不能采用`require`命令，而是要使用`import`函数。ES6模块的所有输出接口,都会成为对象的属性。

```javascript
// es.mjs
let foo = { bar: 'my-default' };
export default foo;

// cjs.js
const es_namespace = await import('./es.mjs');
// es_namespace = {
//   get default() {
//     ...
//   }
// }
console.log(es_namespace.default);
// { bar:'my-default' }
```

上面代码中，`default`接口变成了`es_namespace.default`属性。

```javascript
// es.js
export let foo = { bar:'my-default' };
export { foo as bar };
export function f() {};
export class c {};

// cjs.js
const es_namespace = await import('./es');
// es_namespace = {
//   get foo() {return foo;}
//   get bar() {return foo;}
//   get f() {return f;}
//   get c() {return c;}
// }
```

### 循环加载

”循环加载“指的是a脚本执行依赖B脚本，而B脚本的执行有依赖a脚本。

```javascript
// a.js
var b = require('b');

// b.js
var a = require('a');
```

如果处理不好的话，会出现递归加载，程序无法执行。

### CommonJS模块的加载原理

CommonJS的一个模块，就是一个脚本文件，`require`命令第一次加载该脚本，就会执行整个脚本，然后再内存中生成一个对象。

```javascript
{
    id: 'xxxx',
    exports:{...},
    loaded: true,
    ...
}
```

这就是Node内部加载模块后生成的一个对象。以后要用到这个模块的时候，就会到`exports`属性上面取值。再次执行`require`命令的时候，而是到缓存之中取值。也就是说，CommonJs模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，都是返回第一次的结果。

### CommonJS模块的循环加载

CommonJS模块的特性是加载时执行，即脚本代码在`require`的时候，就会全部执行。一旦出现某个模块被加载，只输出已经执行的部分，没执行的部分不会输出。

```javascript //a.js
exports.done = false;
var b = require('./b.js');
console.log('在 a.js 之中，b.done = %j', b.done);
exports.done = true;
console.log('a.js 执行完毕');
```

```javascript //b.js
exports.done = false; var a = require('./a.js');
console.log('在 b.js 之中，a.done = %j', a.done);
exports.done = true;
console.log('b.js 执行完毕');

```

这里发生了循环，对于`b.js`来说，他从`a.js`只输出一个变量`done`，值为`false`。`b.js`接着往下执行，等全部执行玩，把执行权交还给`a.js`。于是`a.js`往下执行，直到完毕。可以写一个脚本`main.js`。
```javascript
var a = require('./a.js');
var b = require('./b.js');
console.log('在 main.js 之中, a.done=%j, b.done=%j', a.done, b.done);
```

结果如下:
> $ node main.js

在 b.js 之中，a.done = false
b.js 执行完毕
在 a.js 之中，b.done = true
a.js 执行完毕
在 main.js 之中, a.done=true, b.done=true

总之,CommonJS输出的值是拷贝的值,而不是应用。遇到循环加载时，返回的是已经执行的部分的值，而不是代码全部执行后的值。

```javascript
var a = require('a'); // 安全的写法
var foo = require('a').foo; // 危险的写法

exports.good = function (arg) {
  return a.foo('good', arg); // 使用的是 a.foo 的最新值
};

exports.bad = function (arg) {
  return foo('bad', arg); // 使用的是一个部分加载时的值
};
```
上面代码中，如果发生循环加载，第一种方式的值可能被改写，而第二种方式安全一点。

### ES6模块的循环加载

es6处理“循环加载”与CommonJS有本质的不停，ES6模块是动态引用。如果使用`import`冲一个模块加载变量，那些变量而是成为了引用。这样子是为了真正的取到值。

```javascript
// a.mjs
import {bar} from './b';
console.log('a.mjs');
console.log(bar);
export let foo = 'foo';

// b.mjs
import {foo} from './a';
console.log('b.mjs');
console.log(foo);
export let bar = 'bar';

```

上面的代码中，`a.mjs`加载`b.mjs`，后者又反过来加载前者，这样子就构成了循环加载。

执行`a.mjs`，结果如下：

```javascript
$ node --experimental-modules a.mjs
b.mjs
ReferenceError: foo is not defined

```

首先执行`a.mjs`以后，发现他加载了`b.mjs`，会优先执行`b.mjs`，然后再执行`a.mjs`。执行`b.mjs`的时候，发现发从`a.mjs`输入了`foo`接口，这时候不会去执行`a.mjs`，而认为这个接口已经存在了，继续往下执行。到后来发现这个接口根本没有定义，因此就报错。

解决这个问题的方法就是，让`b.mjs`运行的时候，`foo`已经有定义了。这可以通过将`foo`写成函数来解决。

```javascript
// a.mjs
import {bar} from './b';
console.log('a.mjs');
console.log(bar());
function foo() { return 'foo' }
export {foo};

// b.mjs
import {foo} from './a';
console.log('b.mjs');
console.log(foo());
function bar() { return 'bar' }
export {bar};
```

再执行`a.mjs`就可以得到预期结果。

```markdown
$ node --experimental-modules a.mjs
G.mjs
foo
a.mjs
bar

```

这是因为函数有提升作用。在执行`import {bar} from './b'`时，函数foo就已经定义好了。所以`b.mjs`加载的时候就不会报错。但是要注意一点的是，如果把函数`foo`改为函数表达式，就会报错。因为函数表达式没有提升的作用，所以就报错。


#### 一个**SystemJS**的例子

```javascript
// even.js
import { odd } from './odd'
export var counter = 0;
export function even(n) {
  counter++;
  return n === 0 || odd(n - 1);
}

// odd.js
import { even } from './even';
export function odd(n) {
  return n !== 0 && even(n - 1);
}
```

上面代码中，`event.js`的里面的函数`even`有一个参数，n，就会减一 直到等于0。

```javascript
$ babel-node
> import * as m from './even.js';
> m.even(10);
true
> m.counter
6
> m.even(20)
true
> m.counter
17
```

上面的代码中,参数从10变为0的过程中,`event()`一共执行了6次,所以`counter`等于6。第二次从20变为0，一直执行了11次，加上前面的6次，就是17次了。


如果这个例子改成CommonJS，根本无法执行，会报错。

```javascript
// even.js
var odd = require('./odd');
var counter = 0;
export.counter = counter;
export.even = function(){
     counter++;
     return n===0 || odd(n-1);
}

// odd.js
var even = require('./even').even;
module.exports = function (n) {
  return n != 0 && even(n - 1);
}
```

上面的两个js文件相互加载，形成了循环加载。引擎会输出`even.js`到已经执行的部分，就是拿缓存吧。所以在`odd.js`，变量`even`是`undefined`。

所以会报错：

```markdown
$ node
> var m = require('./even');
> m.even(10)
TypeError: even is not a function
```

### Es6模块的转码 

除了用`Babel`来用来转码之外，其实还有两个方法。

1. es6 module transpiler 
   ```markdown
   //安装
       npm install -g es6-module-transpiler
   //使用
       compile-modules convert file1.js file2.js
   ```
2. SystemJS
   其实大家把SystemJS当做是jquery来使用就可以了，当然了，还有一些跨域的问题，所以不能是file协议打开。`systemjs`可以帮我们转换es6代码为es5代码。
   ```markdown
   1. npm install systemjs
   2. var System = require('systemjs');
   3. // loads './app.js' from the current directory
   System.import('./app').then(function(m) {
   console.log(m);
   });. 
   ```


