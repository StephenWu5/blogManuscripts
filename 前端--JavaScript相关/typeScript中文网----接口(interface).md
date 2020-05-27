https://www.tslang.cn

#### 初试

接口其实就是一个描述： 必须包含一个label属性且类型为string。接口就好像一个名字而已。

```
interface LabelledValue {
  label: string;
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);

```

#### 可选属性

接口里面的属性不是必需的，有个存在，有的不存在。带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个?符号。

可选属性的好处之一就是可以对可能存在的属性进行预定义，好处之二就是引用了不存在的属性时的错误我。比如把`color`的值拼错，就会得到一个错误的提示。相对来说比较严谨。

```
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
  let newSquare = {color: "white", area: 100};
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({color: "black"});
```

#### 只读属性

一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 readonly来指定只读属性:

```
interface Point {
    readonly x: number;
    readonly y: number;
}
```使用一个字面量来构造一个`Point`。赋值后，`x`和`y`的值就不能改变。

TypeScript 具有`ReadonlyArray<T>`的类型，它与`Array<T>`相似，把所有可变的方法去掉了，所以确保了数组创建后不能再被修改。

```
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error!
```

上面代码的最后一行，可以看到就算把整个ReadonlyArray赋值到一个普通数组也是不可以的。 但是你可以用类型断言重写：

```
a = ro as number[];
```

`readonly`与`const`的相同点就是不让变量可变，`readonly`用于属性，`const`用于变量。

#### 额外的属性检查

在一个函数里面，如果你调用的时候使用了一个接口里面没有的变量名，或者你拼错了，这时候就会有个报错。

```
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    // ...
}


// error: 'colour' not expected in type 'SquareConfig'
let mySquare = createSquare({ colour: "red", width: 100 });
```

如果要绕开这些检查很简单，就是要使用类型断言。前提是你需要在接口`interface`里面添加一个字符串索引签名。你要确定额外的属性。

```
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);

interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}
```

其实还有一种额外的跳过检查的方式，就是把对象赋值给另外一个变量，因为该变量不会经过额外的属性检查，所以编译器不会报错。其实在接口变量添加一个属性就可以了。


```
let squareOptions = { colour: "red", width: 100 };
let mySquare = createSquare(squareOptions);
```

#### 函数类型

接口就是一个描述，可以描带属性的普通对象，也可以描述函数类型。给接口定义一个调用签名，它是一个只有参数列表，返回值类型的函数定义。参数列表里的参数需要名字和类型。

```
interface SearchFunc {
  (source: string, subString: string): boolean;
}
```

使用如下：(函数的参数名不需要和接口里定义的名字匹配)

```
let mySearch: SearchFunc;
//mySearch = function(src: string, sub: string): boolean { //也可以
mySearch = function(source: string, subString: string): boolean {
  let result = source.search(subString);
  return result > -1;
}
```

//最省的写法
```
let mySearch: SearchFunc;
mySearch = function(src, sub) {
    let result = src.search(sub);
    return result > -1;
}
```

#### 可索引的类型

当我们需要通过索引得到的类型，比如`a[10]`或者ageMap["deinel"]。可索引类型具有一个索引签名，它描述了对象索引的类型，还有相应的索引返回值类型。

```
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];

```

上面例子里，我们定义了StringArray接口，它具有索引签名。 这个索引签名表示了当用 number去索引StringArray时会得到string类型的返回值。

TypeScript支持两种索引签名：字符串和数字。可以同时使用两种类型的索引，但是数字缩影的返回值必须是字符串索引返回值类型的子类型。这是因为使用`number`来索引，会把它转化为`string`去索引对象。也就是说就算是`100`，也会变为"100"。因此，两者需要保持一致哈。


```
class Animal {
    name: string;
}
class Dog extends Animal {
    breed: string;
}

// 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
// 因为下面的number是可以转化为String的，所以会和String有冲突
interface NotOkay {
    [x: number]: Animal;
    [x: string]: Dog;
}
```

字符串引用签名能够很好的描述`dictionary`，并且它们也会确保所有的属性与其返回值类型相匹配。因为字符串索引声明了obj.property和obj["property"]的两种形式都可以。

下面这个例子，`name`的类型与字符串索引类型不匹配，所以类型检查器给出一个提示：

```
interface NumberDictionary {
  [index: string]: number;
  length: number;    // 可以，length是number类型
  name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配
}
```

还有一个方法：就是把索引签名设置为只读，就可以防止给索引赋值，改变索引。

```
interface ReadonlyStringArray {
    readonly [index: number]: string;
}
let myArray: ReadonlyStringArray = ["Alice", "Bob"];
myArray[2] = "Mallory"; // error!
```

#### 类类型

与c#或者java接口的基本作用一样，可以强制一个类去符号某种契约。其实就是一个写法限制啰。

```
interface ClockInterface {
    currentTime: Date;
}

class Clock implements ClockInterface {
    currentTime: Date;
    constructor(h: number, m: number) { }
}
```

你也可以在接口中描述一个方法，在类里实现它，如同在下面`setTime`一样

```
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}

class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}
```

接口描述了类的公共部分，而不是公共和私有部分。它不会帮你检查类是否具有某些私有成员。

**类静态部分与实例部分的区别**

当我们对类的静态部分（位于constructor）进行类型检查时，我们需要特殊的处理，因为在一般的处理下，静态部分不在检查的范围内。

我们应该直接操作类的静态部分。 看下面的例子，我们定义了两个接口， ClockConstructor为构造函数所用和ClockInterface为实例方法所用。 为了方便我们定义一个构造函数 createClock，它用传入的类型创建实例。(这里我真的没有看懂)


```
//，在createClock(AnalogClock, 7, 32)里，会检查AnalogClock是否符合构造函数签名
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
    tick();
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tock");
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

```

#### 继承接口

和类一样，接口也可以相互继承。让我们可以从一个接口里复制成员到另外一个接口里，把接口分割到可重用的模块里。

```
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
```

一个接口可以继承多个接口，创建出多个接口的合成接口。

```
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
```

混合类型：一个好的例子就是，一个对象可以同时为函数，对象使用，并且可以带额外的属性。


```
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

#### 接口继承类

当一个接口继承一个类类型时，它会继承类的成员但不包括其实现。就好像接口声明了所以类中存在的成员，但没有提供具体实现一样。接口同样会继承类的`private`和`protected`成员。也就是说这个类或其子类所实现(implement)。

当你有一个庞大的继承结构时这很有用，但要指出的是你的代码只在子类拥有特定属性时起作用。 这个子类除了继承至基类外与基类没有任何关系。 

```
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }
}

class TextBox extends Control {
    select() { }
}

// 错误：“Image”类型缺少“state”属性。
class Image implements SelectableControl {
    select() { }
}

class Location {

}
```

上面的代码更多的是说`extends`与`implements`的区别吧。哈哈哈。其实就是说继承的内容哈哈哈。

`extends`与`implements`的区别就是
extends 是继承某个类, 继承之后可以使用父类的方法, 也可以重写父类的方法; 
implements 是实现多个接口, 接口的方法一般为空的, 必须重写才能使用，支持多继承。 








