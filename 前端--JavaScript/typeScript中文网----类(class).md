#### 一个简单的例子

一个简单的类的例子：

```javascript
class Greeter {
    greeting: string,
    constructor: (message: string){
        this.greeting = message;
    },
    greet() {
        return "Hello, " + this.greeting;
    },
}

let greeter = new Greeter("world");
```
上面的代码声明了一个`Greeter`类，这个类有三个成员： `greeting`的属性，一个构造函数和一个`greet`方法。其中，`this`就是这个对象哈。

最后一行，我们使用`new`构造了`Greeter`类的一个实例。


#### 继承

继承是一个很熟很熟却用的很少的东西来的。作用就是拓展现有的类。

```javascript
class Animal {
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}

class Dog extends Animal {
    bark(){
        console.log('woof!woof!');
    }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();
```

从基类`Animal`派生出派生类`Dog`通过`extends`关键词。 子类，超类。


一个更加复杂的例子： 里面有`super`和`super()`这两个概念，表示超类和超类里面的构造函数哈。里面还涉及到重写父类的方法呢。

```javascript
class Animal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);
```

#### 公共，私有与受保护的修饰符

默认是`public`, 公有；
私有是 `private`; 私有的意思是外部不可以访问，只能在类里面的方法使用。
保护是 `protected`；`protected`与`private`作用类似，多了在派生类中可以访问。


```javascript
//我们不能在`Person`类外使用`name`，但是我们仍然可以通过`Employee`类的实例方法访问，因为`Employe`是由`Person`派生而来的。
class Person {
    protected name: string;
    constructor(name: string) { this.name = name; }
}

class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name)
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.name); // 错误
```

构造函数也可以被标记成 protected。 这意味着这个类不能在包含它的类外被实例化，但是能被继承。比如

```javascript
class Person {
    protected name: string;
    protected constructor(theName: string) { this.name = theName; }
}

// Employee 能够继承 Person
class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales");
let john = new Person("John"); // 错误: 'Person' 的构造函数是被保护的.
```

`readonly` 修饰符
可以设置属性，为只读的。只读属性必须在声明时或构造函数里被初始化。代码如下：

```javascript
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor (theName: string) {
        this.name = theName;
    }
}
let dad = new Octopus("Man with the 8 strong legs");
dad.name = "Man with the 3-piece suit"; // 错误! name 是只读的.
```


**存取器** `set` 和 `get`
作用就是有效控制对对象成员的访问哈。

没有存取器的例子，会带来麻烦。

```javascript
class Employee {
    fullName: string;
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log(employee.fullName);
}
```

加上存取器...

```javascript
let passcode = "secret passcode";

class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    alert(employee.fullName);
}
```
> 只带有 get不带有 set的存取器自动被推断为 readonly。

#### 静态属性

类的静态属性，存在于类本身而不是类的实例上。如果想访问这个属性的时候，要在`origin`面前加上类名。如同在实例属性上使用`this`.前缀来访问属性一样的，这里我们使用`Grid.`来访问静态属性。

```javascript
class Grid {
    static origin = {x: 0, y: 0};
    calculateDistanceFromOrigin(point: {x: number; y: number;}) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor (public scale: number) { }
}

let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));
```

#### 抽象类

抽象类作为其他派生类使用，一般不会直接被实例化。抽象类可以包含成员的实现细节。`abstract`是关键词。用于定义抽象类或者在抽象类内部定义抽象方法。

```javascript
abstract class Animal {
    abstract makeSound(): void;
    move(): void {
        console.log('roaming the earch...');
    }
}
```

抽象类中的抽象方法不包含集体实现，而且必须在派生类中实现。抽象方法的语法与接口方法类似，两者都是定义方法签名但不包含方法体。抽象方法必须包含`abstract`关键词而且包含访问修饰符。

```javascript
abstract class Department {

    constructor(public name: string) {
    }

    printName(): void {
        console.log('Department name: ' + this.name);
    }

    abstract printMeeting(): void; // 必须在派生类中实现
}

class AccountingDepartment extends Department {

    constructor() {
        super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
    }

    printMeeting(): void {
        console.log('The Accounting Department meets each Monday at 10am.');
    }

    generateReports(): void {
        console.log('Generating accounting reports...');
    }
}

let department: Department; // 允许创建一个对抽象类型的引用
department = new Department(); // 错误: 不能创建一个抽象类的实例
department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
department.printName();
department.printMeeting();
department.generateReports(); // 错误: 方法在声明的抽象类中不存在
```

#### 高级技巧--构造函数

声明一个类的时候，同时也在声明很多东西。首先是类的实例的类型。

```javascript
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter: Greeter;
greeter = new Greeter("world");
console.log(greeter.greet());
```

上面的代码编译后如下(其实这个可以不管呢，会用就可以了哈)：

```javascript
let Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
})();

let greeter;
greeter = new Greeter("world");
console.log(greeter.greet());
```

没有构造函数的写法：（为啥没有构造函数也是可以的，这个不太清楚）
```javascript
class Greeter {
    static standardGreeting = "Hello, there";
    greeting: string;
    greet() {
        if (this.greeting) {
            return "Hello, " + this.greeting;
        }
        else {
            return Greeter.standardGreeting;
        }
    }
}

let greeter1: Greeter;
greeter1 = new Greeter();
console.log(greeter1.greet());

let greeterMaker: typeof Greeter = Greeter;
greeterMaker.standardGreeting = "Hey there!";

let greeter2: Greeter = new greeterMaker();
console.log(greeter2.greet());
```

#### 把类当作接口使用

类定义会创建两个东西: 类的实例类型和一个构造函数。所以可以在使用接口的地方使用类。

```javascript
class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
```










