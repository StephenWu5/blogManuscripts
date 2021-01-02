 每一个语言,变量的学习都是第一的。

### 布尔值

最简单的数据类型就是true/false值，这玩意叫做布尔。

```javascript
let isDone: boolean = false;
```



### 数字

Typescript里面所有的数字都是浮点数。这些浮点数的类型都是`number`，除了支持十进制和十六进制，还支持二八进制。

```javascript
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;

```

### 字符串

```javascript
let name: string = "bob";
name = "smith";
```

你也可以使用es6的模版字符串，它可以定义多行文本和内嵌表达式，字符串是被反引号包围，并且以`${expr}`这种形式嵌入表达式： 

```javascript 
let name: string = `Gene`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ name }.

I'll be ${ age + 1 } years old next month.`;
```

### 数组

TypeScript像JavaScript一样可以操作数组元素。 有两种方式可以定义数组。 第一种，可以在元素类型后面接上[]，表示由此类型元素组成的一个数组：

```javascript 
let list: number[] = [1, 2, 3];

```

第二种方式是使用数组泛型，`Array<元素类型>`

```javascript 
let list: Array<number> = [1,2,3];
```

### 元祖 Tuple

元组类型允许表示一个已知元素数量和类型的数组，各元素类型不必相同。你可以定义一对值分别为string和number类型的元组。

```javascript
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
x = [10, 'hello']; // Error
```

当访问一个一直索引的元素，会得到正确的类型： 

```javascript
console.log(x[0].substr(1)); // OK
console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'
```

当访问该数组内一个没有定义的元素时，只要类型是已定义类型中就没问题，否则会报错的。

```javascript
x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型

console.log(x[5].toString()); // OK, 'string' 和 'number' 都有 toString

x[6] = true; // Error, 布尔不是(string | number)类型

```

### 枚举

`enum` 类型是对JavaScript标准数据类型的一个补充。可以使用枚举类型可以为一个数组赋予友好的名字。

```javascript 
enum Color {Red,Green,Blue}
let c: Color = Color.Green
```

默认情况下，从`0`开始编号，但是可以修改编号的起始数字。

```javascript
enum Color {Red  = 1,Green,Blue}
let c: Color = Color.Green

```

或者全部采用手动赋值： 

```javascript
enum Color {Red = 1,Green = 2, Blue = 4}
let c : Color = Color.Green
```

枚举类型提供的一个便利是你可以由枚举的值得到它的名字。 例如，我们知道数值为2，但是不确定它映射到Color里的哪个名字，我们可以查找相应的名字：

```javascript
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];

console.log(colorName);  // 显示'Green'因为上面代码里它的值是2
```

### 任意值 

任意值就是你定义一个变量的时候，还不知道它的类型，就用`any`来标记吧。


```javascript
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

```

当你知道一部分数据的类型时，`any`类型也是有用的。比如你用一个数组。包含了不同的类型。是不是很方便啊。

```javascript
let list: any[] = [1, true, "free"];

list[1] = 100;
```

如果是一个普通类型，在赋值的过程中，改变类型是不被允许的。但是`any`类型就完全可以。

在任意值访问任何属性都是允许的。也可以调用任何方法。

```ts
let anyThing: any = 'hello';
console.log(anyThing.myName);
console.log(anyThing.myName.firstName);


let anyThing: any = 'Tom';
anyThing.setName('Jerry');
anyThing.setName('Jerry').sayHello();
anyThing.myName.setFirstName('Cat');
```

**声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值**。

### 未声明的变量

没有声明的变量，统统归纳与任意值的类型。

### void 空值

`void`类型和`any`类型相反，表示没有任何类型。当一个函数没有返回值时，你看到的就是`void`：

```javascript
function run():void{
   console.log("this is my warning message")
}

```

表明一个`void`类型的变量没有什么大用，因为你只能为它赋予`nudefined`和`null`。


```javascript
let number: void = undefined;
```

### Null和Undefined

先不管吧。

### Never

`Never`类型表示那些永不存在的值的类型。`Never`类型是那些会抛出异常或根本不有有返回值的函数表达式或es6箭头函数表达式的返回值类型。变量也可以是`never`类型，特别是它们被永不为真的类型保护所约束时。

`never`类型可以是任何类型的子类型，可以赋值给任何类型；没有类型是`never`的子类型，或者赋值给`never`类型，`any`也不可以。

```javascript
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}
```

### Object 

