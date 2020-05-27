# Ts之初体现

最近公司项目没有那么忙了，有看到微软出手的Ts这个语言大热，很受开发者的热爱，看来这家伙有过人之处，所以啊，就学习一下Ts在Vue里面的应用，未雨绸缪。作为it开发者，一定要保持不断学习的状态，不然很容易咔嚓的。这个行业有个好处，就是可以不断的学习，尝试新的东西，如果用一个技术长达5到10年，写同一句语句或者单词，真的是无聊枯燥。害处是要不断的学习，不喜欢，身体疲惫，也要假装很喜欢的，很有动力的学习。

微软实力宏厚，出品的工具都很优秀，vscode，outlook，办公三大件，window，我都很喜欢。所以同样看好`ts`这个工具。

![image.png](https://upload-images.jianshu.io/upload_images/8195910-1e543d17c931ad30.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## Ts中文网--手册指南
TypeScript是JavaScript的一个超集，js是弱类型语音，Ts可以约束变量的类型，弥补了该不足。代码更严谨。我是刚刚开始学习，至于有什么其他优点，还没有体会到。严谨，严谨，严谨。暂时体会到这一点。

####  一、基础类型
支持布尔，数字，字符串，数组，元祖，枚举，any，Void,Null,Undefined,Never,Object;
感觉any，接口，object，字符串才是使用率最高的吧，其他了解一下就行
```javascript
let isDone: boolean = false; //布尔
let decLiteral: number = 6; //数字
let name: string = "bob"; //字符串
let list: number[] = [1, 2, 3]; //数组
let x: [string, number] = ['hello', 10]; //元祖

enum Color {Red, Green, Blue} //枚举
let c: Color = Color.Green;

let notSure: any = 4;  //any 与never相反

function warnUser(): void {    //void
    console.log("This is my warning message");
}

let u: undefined = undefined; //undefined与null
let n: null = null;

function infiniteLoop(): never { //never
    while (true) {
    }
}

declare function create(o: object | null): void; //object
create({ prop: 0 }); // OK
```

#### 二、接口 (Interface)
接口是什么，上面的类型约束变量是一个个的进行，接口是一堆变量的类型约束。支持可选，只读属性。让开发者成套的撸代码。

使用如下：

```javascript
interface fData {
    carNo: string,
    carType: string,
}

export default class extends Vue{
    fData: fData | any = {
        carNo: '',
        registTime: '',
    }
}
```

#### 三、函数
无论是传入的参数，还是返回值，都需要约束类型。支持参数设置默认值，其余参数，this参数。

在`vue`页面中，`get`开头的函数是`computed`计算属性，可以不写返回值的约束类型。大佬灯如是说。

```javascript
setAsOriderSateToVal(v: number): number {
    if(v === 3){
        return 7;
    }else{
        return 0;
    }
}
```

#### 四、泛型（用的应该比较少，看业务需求吧）
泛型就是传啥类型，它返回啥类型。传入数组返回数组；传入字符串返回字符串之类。有点那个自动识别的意思。`Java`语言有类似的概念。

```javascript
//================函数中的泛型================
function itself<T>(a: T):T {
    return a
}
//隐式调用
console.log(itself(true)) // true
//显示调用 建议初学者用这个，看得懂
console.log(itself<boolean>(true)) // true

//================接口与泛型配合使用================
//有点像，一堆特定类型结构，返回类似该特定的类型结构
interface Human{
    name: string,
    age: number
}
function create<T>(returnV: T): T{
    return returnV;
}
//使用
create<Human>({
    name: 'stephenWu5',
    age: 18
})
//================可以用泛型接口来结束该函数================
interface cfn<T> {
   (arg: T): T 
}
let myFun: cfn;
myFun = function<T>(arg: T):T{
    return arg;   
}
myFun<string>('x')  // 返回x
```

#### 五、枚举

枚举几乎没有使用，之前在公司中需要那种键值对，都是写`Json`对象，遍历该对象拿到需要的值。

官方给的介绍是： 使用枚举我们可以定义一些带名字的常量。 使用枚举可以清晰地表达意图或创建一组有区别的用例。

其实枚举和`Json`对象都可以实现业务需求。哪个都无所谓。两者在功能上几乎没有区别。你用哪个还不是一样的用。讲道理是有区别的，要不TypeScript也不会给出。

```javascript
//json的写法
export const Dierection = {    //
    SZZS:"上证指数", 
    SZCZ:"深圳成指", 
}

//枚举的写法
enum Dierection{
    SZZS = '上证指数',
    SZCZ = '深圳成指',
}
```

印象中都是在前端的查询页面中渲染下拉框时使用。使用语法： `v-for="(item,key) of Dierection"`。

#### 六、 类型兼容性
其实这个用的也是算少的啰，因为平时写代码的时候习惯需要什么类型，就定义什么类型（连内部的子类型都定义的一模一样），写不一样不就是抬石头砸自己的脚吗？

就是`TS`语言中赋值时，编译器会检查x中每个属性，能否在y中找到对应属性。主要是用于子类型的检查。

```javascript
interface Named {
    name: string;
}
let x: Named;
let y = { name: 'Alice', location: 'Seattle' };
//y 能给 x提供对应的属性，所以没有报错
x = y;
//这样子就报错了
y = x;  //error
```

官方文档中比较2个函数的例子：

```javascript
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

//目前还没有理解为啥是这样，看了官方的解释还是没法理解。也许是参数可以忽略吧。返回值那个例子倒是很容易理解。
y = x; // OK
x = y; // Error
```

枚举类型与数字类型兼容，数字类型与枚举类型兼容。不同枚举类型之间是不能兼容。

下面的短小内容让我们更好的里面泛型的概念。
**因为TypeScript是结构性的类型系统，类型参数只影响使用其做为类型一部分的结果类型。**

```javascript
//
interface Empty<T> {
}
let x: Empty<number>;
let y: Empty<string>;
x = y;  // OK, because y matches structure of x


//泛型类型使用时就好像不是一个泛型类型了。
interface NotEmpty<T> {
    data: T;
}
let x: NotEmpty<number>;
let y: NotEmpty<string>;
x = y;  // Error, because x and y are not compatible
```

没有指定泛型类型的泛型参数时，默认所有的泛型为any。所以用结果类型比较时，就不会报错。代码如下:

```javascript
let identity = function<T>(x: T): T {
    // ...
}

let reverse = function<U>(y: U): U {
    // ...
}

identity = reverse;  // OK, because (x: any) => any matches (y: any) => any
```

#### 七、高级类型（躲开）

一般看到那些高级内容，羞涩难懂,项目中用的少，我都是选择躲开。之前在大学时代啥都学学，很多用不到，浪费时间和力气。经一事长一智。要学多用的。

#### 八、Symbols

之前一段时间在地铁里看一本es6的电子书，了解这个概念。就是一个新型的类型。symbol类型的值是通过Symbol构造函数创建的。就算传入一模一样的字符串参数，他们的值也是不一样的，这个特点让我印象深刻。可以作为对象属性的键值对中的键使用，永远不会和其它键名冲突。

这家伙的使用场景还没有想到，几乎没有使用过，哈哈。

#### 九、命名空间

命名空间就是内部模块，ts所说的模块一般是外部模块。命名空间是为了解决变量名污染和代码维护性而来的。当一个web应用需求越来越多，代码越来越多，为了提高代码的维护性，最好是按照功能拆分一个文件成多个文件。拆分后的文件使用同一个命名空间，那么在使用的时候就如同定义在同一个文件。

使用命名空间里面的变量，接口，方法等，需要`xxx.`。xxx是命名空间的名称。

```javascript
//还支持别名呢（多套一个namespace而已）
namespace Shapes {
    export namespace Polygons {
        export class Triangle { }
        export class Square { }
    }
}

import polygons = Shapes.Polygons;
let sq = new polygons.Square(); // Same as "new Shapes.Polygons.Square()"
```

一般上面所说的命名空间用的少，使用的话会增加额外的模块层，可以改名命苦空间了；但是还有一种命名空间叫**外部命名空间**，它的使用率很高，没有它不行。js的库或者开发者自己写的工具类js，使用普通的`javascript`写的，如果直接导入到`ts`文件，它会识别不了，报错。外部命名空间就是出场解决这个问题，让ts编译器识别上述文件变量和方法的类型（不可能用重写jquery等库一遍吧）。

外部命名空间使用主要走两步：
第一步：一般是在原有路径新增一个xxx.d.ts文件；
```javascript
export = pinyin;
declare namespace pinyin {
    export const codefans: (value: string) => any
    export const arraySearch: (value: string) => any
    export const ucfirst: (value: string) => any
}
```
第二步： 编辑tsconfig.json文件，添加合适的路径。
```javascript
"include": [
    "src/**/*.ts",
],
```

#### 十、后续

官网的基础手册后面的内容还有声明合并，jsx，修饰器，Mixins，三斜线指令，文件类型检查等等。粗粗看了一下，声明合并，就是你在声明命名空间，接口，类，枚举时，如果名字重复了，它会帮你做合并处理(当然不是所有的，类不能和其他类，变量合并)，你会用的很少的，因为写代码不会写两个重复的名字（编辑器有提示），你不会傻到抬石头砸自己的脚；`jsx`会用，但是在`vue`项目中用的很少，除非是需要那个虚拟`dom`。以后遇到react项目再详细看；修饰器属于高级的东西，以后熟练`TS`项目（搞一搞项目），再详细看，否则很难用的到。（其实是我懒不想学哈哈）；Mixins就是支持把源对象的属性，方法复制到目标对象上，官网上有个很好的例子，需要的时候再来`copy`吧；三斜线指令，文件类型检查了解一下就行了，没有必要细细研究，用的少。以后需要再过来看，时间宝贵。

## Ts中文网--声明文件

就是教你如何写声明文件。(项目中大量用到)

![image.png](https://upload-images.jianshu.io/upload_images/8195910-506c9ef47f067c71.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


#### 结构

**全局库**。在全局命名空间下可以访问，暴露出x个全局变量。在它的源码中，可以看到：顶级的`var`语句或`function`声明，一个或多个赋值语句到`window.someName`，DOM原始值像document或window是存在的。现在他妈的全局库都转UMD库了。很少保持全局的姿态。全局库的使用模版是`global.d.ts`。全局插件使用`global-plugin.d.ts`，全局修改模块使用`global-modifying-module.d.ts`。

**模块化库**。工作在模块加载器的环境下。模块化库的源码可以看到：无条件的调用require或define，像import * as a from 'b'; or export c;这样的声明，赋值给exports或module.exports。很多流行的nodejs库都是这类。模块能够作为函数调用，使用`module-function.d.ts`；模块能够使用new来构造，`module-class.d.ts`；模块不能被调用或构造，使用`module.d.ts`文件；如果是模块插件，就使用`module-plugin.d.ts`

**UMD**。名字起的很专业，其实就是上面功能的相加。可以模块导入，也可以全局使用。源码里看到了typeof define，typeof window，或typeof module这样的测试，尤其是在文件的顶端，那么它几乎就是一个UMD库。这种库很主流。

#### 举例

这里手把手教你书写。这一块的内容不用记，知道有这个事就行了，以后忘记写了就过来查。都是一些规则而已。重点学会**带属性的对象**够受用的了。

**全局变量**

```javascript
//代码
console.log(foo)

//声明
declare var foo: number;
declare const foo: number;  //只读
declare let foo: number;  //块级作用域
```

**全局函数**
```javascript
//代码
greet('hello world')

//声明
declare function greet(greeting: string): void;
```

**带属性的对象**（使用率最高）
```javascript
//原代码
let result = myLib.makeGreeting("hello, world");
let count = myLib.numberOfGreetings;


//声明
declare namespace myLib{
    function makeGreeting(greeting: string): void;
    let numberOfGreetings: number;
}
```

**函数重载**

```javascript
//代码
let x: Widget = getWidget(43);
let arr: Widget[] = getWidget("all of them");

//声明
declare  function getWidget(n: number): Widget;
declare function getWidget(s: string): Widget[];
```

**可重用类型（接口）**

```javascript
//代码
greet({
  greeting: "hello world",
  duration: 4000
});

//声明
interface greetO{
    greeting: string;
    duration?: number;
}
declare function greet(greeting: greetO):void;
```

**可重用类型（类型别名）**

```javascript
//代码
function getGreeting() {
    return "howdy";
}
class MyGreeter extends Greeter { }
greet("hello");
greet(getGreeting);
greet(new MyGreeter());

//声明
type paraType = string || (()=>  string) || MyGreeter;
declare function greet(g: paraType): void;
```

**组织类型**

```javascript
//代码
const g = new Greeter("Hello");
g.log({ verbose: true });
g.alert({ modal: false, title: "Current Greeting" });

//声明
declare namespace GreetingLib{
    interface  LogOptions {
        verbose?: boolean;
    }
    interface AlertOptions {
        modal: boolean;
        title?: string;
    }
}

```

**类**
```javascript
//代码
const myGreeter = new Greeter("hello, world");
myGreeter.greeting = "howdy";
myGreeter.showGreeting();

class SpecialGreeter extends Greeter {
    constructor() {
        super("Very special greetings");
    }
}

//声明
declare class myGreeter{
    constructor(){
        super(greeting:string)
    }
    greeting: string;
    showGreeting(): void;
}
```

#### 规范

尽量使用`number\string\boolean`，不要使用`Number\String\Boolean`；
回调函数的返回值被忽略时返回`void`而不是`any`；
尽量写出回调函数的非可选参数；不要因为回调函数参数个数不同而写不同的重载：用最大参数写一个重载就可以；
当不得不重载时，最细分的重载写在前面，大概的写在后面；否则会被覆盖的；
如果仅仅是尾部参数不同，不要写不同的重载，选择可选参数；
仅仅是某个位置的参数类型不同时，可以使用联合类型。例如`number|string`

除了第一第二点，其他都是优化的，尽量使用这个规则吧（其实不使用也行，多写几行代码。）

## Ts中文网--项目配置
官网详细点。

## Ts在Vue中的使用
使用`vue-property-decorator`这个插件，利用修饰符可以简化书写。

![image.png](https://upload-images.jianshu.io/upload_images/8195910-f2080891c2f5a271.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 1. @Component （使用率很高）
组件，做前端一定要有组件的能力，提高代码的使用率（省无数代码），开发效率大大提高，省事更省心。有一次面试，面试官说了2次：“会不会写组件？写组件的能力一定要有。”of course。上一家公司快离开时，技术大佬成哥说：有时间多写写自己的组件，提高自己的技术。所以咬咬牙结合项目需求写了两个支持`sync`特性的组件，还挂在博客园（之前都是维护，没写过自己的）。

```javascript
//js的写法
export default{
    components: {
        CountDown,
        TcLocpicker,
    }
}

//ts的写法
import {
    Component,
    Vue,
    Watch
} from "vue-property-decorator";
@Component({
    components: {
        CountDown,
        TcLocpicker,
    },
    filters: {
        upper(v: string){
            if (!v) return '';
            return v.toString().toUpperCase();
        } 
    },
})
export default class extends Vue{
}
```

#### 2. @Prop  （常用）
使用过vue的同学都知道，这是父组件传给子组件的参数，使用率很高。它在`class`里面的写法是
`!:`是必须要有的意思。

之前我在项目内插入这个`ts`，有一个关于`prop`的报错，报错内容不是很详细的，因为是硬加入项目内，其它地方有很多警告。当然项目是可以跑起来的。我找了2小时也找不到，后来发现是`Prop`的第一个`P`没有大写。(注意：所有`vue-property-decorator`的@开头的变量都是大写的)所以啊，写代码细心很重要。还有一个原因我用的是vim编辑器，如果是`vscode`编辑器，会出现提示内容。**所以以后发现报错一定要结合vscode来找才快。**

```javascript
//js的写法
export default{
    props:{
        mecType: Number
    }
}

//ts的写法
export default class extends Vue {
    import {Vue, Component,Prop} from 'vue-property-decorator';
    //props
    //写法1
    @Prop(String)
    mecType!: string;
    //写法2
    @Prop([String,Number])
    mecType: string | number; 

    //写法3
    @Prop({  
        type: Number,
        default: 0,
        required: true,
        validator: (value) => {
            return [
            'InProcess',
            'Settled'
            ].indexOf(value) !== -1
        }
    }) 
    mecType!: number;
}

```

#### 3. data  （常用）
这个data的使用率是最高的了，就连静态页面也是存在的。有一个`.vue`文件就有它。

```javascript
//js的写法
export default{
    data: function(){
        return {
            loading: false,
            mec_Type: 'a'
        }
    }
}

//ts的写法  很简单吧哈哈
export default class extends Vue {
    loading: boolean = false;
    mec_Type: string = "a"; //选择的机构类型
}
```

#### 4. methods  （常用）
`methods`里面的方法终于可以不用`methods`包起来，和那些周期函数`created,mounted,`
平起平坐了，熬出头了。

```javascript
//js的写法
export default{
    methods: {
        fn1: function(){

        }
    }
}

//ts的写法  
export default class extends Vue {
    fn1: function(){

    }
}
```

#### 5. computed  （较多）

计算属性在组件里面很实用，一般是监听几个变量的变化去改变计算属性值。上一家公司的时候我很少用计算属性，后来用了一下，确实少写许多代码。所以啊，想少写代码，一定去多使用它！,计算属性已经成为我的心头好。

`computed`在`class`里面的方法的写法很简单，就是在方法名前面加上`get`。

```javascript
//js的写法
export default{
    computed: {
        currentRoleId() {
            return store.getters.roles
        },
    }
}

//ts的写法  很简单吧哈哈
export default class extends Vue {
    get currentRoleId() {
        return store.getters.roles
    },
}
```

#### 6. @Watch （较多）

监听一个变量的是否变化，执行一个方法；该方法不能改变这个变量。否则就会没完没了。有一次确实踩过这个坑，页面上的按钮一点，页面卡住了。加上`console.log`语句，发现打印20000+，真的是流汗。后来周日加班摆平了，血与泪的教训。

```javascript
//js的写法
export default{
    watch: {
        'orderSate': {
            handler: 'setAsOriderSateToVal',
            immediate: true,
            deep: true
        }
    },
    methods: {
        setAsOriderSateToVal(val, oldVal) { }
    }
}

//ts的写法  很简单吧哈哈
export default class extends Vue {
    @Watch('orderSate')
    onChangeOriderSate(v: any, oldv: any) {
        this.setAsOriderSateToVal(v);
    };

    setAsOriderSateToVal(v){

    };
}
```

#### 7. @Emit  （算多）

主要作用就是通讯。其实就是写组件的时候，父组件需要拿到子组件里面的值。怎么办啊，用这个概念从子组件里面发射到父组件里面（emit中文就是发射）。印象中用的最多的就是在页面中按一个添加，弹出一个框，这个框选择一个值，同时这个值传递到页面所在的组件中。

```javascript
//js的写法
export default{
    addToCount(n) {
      this.count += n
      this.$emit('add-to-count', n)
    },
    resetCount() {
      this.count = 0
      this.$emit('reset')
    },
}

//ts的写法  很简单吧哈哈
export default class extends Vue {
    @Emit()
        addToCount(n: number) {
        this.count += n
    };

    @Emit('reset')
    resetCount() {
        this.count = 0
    };
}
```

#### 8. @Provide和@Inject  （少见）

作用是通讯。子组件需要拿到父组件的值，但是业务逻辑复杂时，需要组件之间几层的嵌套，他包她，她包它，它又包另外一个组件。这种情况啊，`props`不容易拿到，得写好几层`props`,看到你头痛：我在哪里啊？。所以啊，为了简单达到这个目的: 曾曾子组件一次性拿到父组件的变量，就需要`Provide和Inject`哈。

```javascript
//js的写法
export default {
    //==========子组件取值=======================
    inject: {
        foo: 'foo',
        bar: 'bar'
    },
    //或者使用这种方式 --在xx收款项目中确实这样使用过
    inject: ['foo','bar'],
    //===========父组件注入====================== 
    provide () {
        return {
          foo: this.foo,
          bar: this.baz
        }
    },
}

//ts的写法  很简单吧哈哈
import {Vue,Component,Inject,Provide} from 'vue-property-decorator';
export default class extends Vue {
    //==========子组件取值=======================
    @Inject()
    foo!: string;
    
    @Inject('bar')
    bar!: string;

    //===========父组件注入====================== 
    @Provide()
    foo = 'foo'
    
    @Provide('bar')
    baz = 'bar'
}
```
总结一下，项目配置这一块其实就是换个写法而已，什么`computed`，`methods，data，watch`这些都是一些老的概念，没有出现什么新的概念点。只要记住新的写法或者说写的时候查一下文档就可以了。最后感谢大佬灯给我提供TypeScript的学习资料。现在我已经有维护和迭代TypeScript项目的能力了。

最后，欢迎关注我的公众号。

![公众号二维码.jpg](https://upload-images.jianshu.io/upload_images/8195910-4759b64c8d6d9ed7.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)










