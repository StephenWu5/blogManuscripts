## typeScript中文网 -- 泛型

确保传入的类型与返回的类型是一致的。这时候就需要泛型这个概念哈。

```javascript
function identity(arg: number): number {
    return arg;
}

function identity(arg: any): any {
    return arg;
}
```

```javascript
function identity<T>(arg: T): T {
    return arg;
}
```
我们给identity添加了类型变量T。 T帮助我们捕获用户传入的类型（比如：number），之后我们就可以使用这个类型。(这就是最大用处哈)

第二种用法：

```javascript
let output = identity<string>("myString");  // type of output will be 'string'
```

不能直接用`.length`属性，除非声明是[]。
```javascript
function loggingIdentity<T>(arg: T[]): T[] {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}
```

#### 泛型类型

```javascript
function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: <T>(arg: T) => T = identity;
```

也可以使用不同的泛型参数名，只要在数量和使用方式上对应就可以哈。

```javascript
function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: <U>(arg: U) => U = identity;
```

#### 泛指接口

```javascript
//这是一整个的例子
interface GenericIdentityFn {
    <T>(arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn = identity;
```

```javascript
//另外一个例子(我看这个使用的最多啦)
interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

#### 泛指类

泛指类和泛指接口差不多，使用`<>`括起来，跟在类名后面哈。

```javascript
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

> 泛指可以帮助我们确定类的所有属性使用相同的类型。

```javascript
let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function(x, y) { return x + y; };

console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));
```

#### 泛型约束

以后（或者明天）再了解哈




