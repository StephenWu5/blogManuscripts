和`javascript`一样，`ts`可以创建出有名字的函数和匿名函数。不论是一系列API函数还是只使用一次的函数。

```javascript
// Named function  带名字函数
function add(x, y) {
    return x + y;
}

// Anonymous function  匿名函数
let myAdd = function(x, y) { return x + y; };
```

在`javascript`中，函数可以使用函数体外部的变量，就是一种捕获机制吧。
```javascript
let z = 100;
function addToZ(x, y) {
    return x + y + z;
}
```

#### 为函数定义类型

`ts`可以在上面的函数中添加类型：

```javascript
function add(x: number, y: number): number {
   return x + y; 
}

let myAdd = function(x: number,y: number): number {
    return x + y;
}
```

函数类型包含两部分： 参数类型和返回值类型。当写出完整函数类型的时候，这两部分是必要的。对应返回值，在函数和返回值之前使用（=>）符号。

```javascript
let myAdd: (baseValue: number, increment: number) => number =
    function(x: number, y: number): number { return x + y; };
```

#### 推断类型

如果你在赋值语句的一边指定了类型，但是另一边没有类型的话，`TypeScript`编译器会自动识别出类型：

```javascript
// myAdd has the full function type
let myAdd = function(x: number, y: number): number { return x + y; };

// The parameters `x` and `y` have the type number
let myAdd: (baseValue: number, increment: number) => number =
    function(x, y) { return x + y; };
```

#### 可选参数和默认参数 

`javascript`里参数是可选的，可传可不传。没传参的时候，它就是`undefined`。
在`TypeScript`在参数名旁使用`?`表示可选与否。

```javascript
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}

let result1 = buildName("Bob");  // works correctly now
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");  // ah, just right
```

在TypeScript里，我们也可以为参数提供一个默认值当用户没有传递这个参数或传递的值是undefined时。 它们叫做有默认初始化值的参数。 让我们修改上例，把last name的默认值设置为"Smith"。

```javascript
function buildName(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // works correctly now, returns "Bob Smith"
let result2 = buildName("Bob", undefined);       // still works, also returns "Bob Smith"
let result3 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result4 = buildName("Bob", "Adams");         // ah, just right
```

共享同样的类型`(firstName: string, lastName: string) => string`。默认参数的默认值消失，只保留它是一个可选参数的信息(这句话就是同享同样的类型的含义)。
可选参数与末尾的默认参数共享参数类型。必须传入`undefined`值来获取该参数的默认值。

```javascript
function buildName(firstName = "Will", lastName: string) {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // error, too few parameters
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");         // okay and returns "Bob Adams"
let result4 = buildName(undefined, "Adams");     // okay and returns "Will Adams"
```

#### 剩余参数

在`javascript`里面，可以使用`arguments`访问传入的参数。在`TypeScript`里，你可以把所有参数收集到一个变量里面(...省略号)：

```javascript
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
```

#### this，箭头函数

在`JavaScript`里面，函数被调用的时候才会指定`this`的值。

```javascript
let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        return function() {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();
alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```

让我们往例子里添加一些接口，Card 和 Deck，让类型重用能够变得清晰简单些：

```javascript
interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}
let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // NOTE: The function now explicitly specifies that its callee must be of type Deck
    createCardPicker: function(this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```

现在TypeScript知道createCardPicker期望在某个Deck对象上调用。 也就是说 this是Deck类型的，而非any，因此--noImplicitThis不会报错了。

#### this 参数在回调函数里

```javascript
interface UIElement {
    addClickListener(onclick: (this: void, e: Event) => void): void;
}

class Handler {
    info: string;
    onClickGood(this: void, e: Event) {
        // can't use this here because it's of type void!
        console.log('clicked!');
    }
}
let h = new Handler();
uiElement.addClickListener(h.onClickGood);
```

因为onClickGood指定了this类型为void，因此传递addClickListener是合法的。 当然了，这也意味着不能使用 this.info. 如果你两者都想要，你不得不使用箭头函数了：

```javascript
//使用箭头函数哈
class Handler {
    info: string;
    onClickGood = (e: Event) => { this.info = e.message }
}
```


#### 重载

暂时不需要了解。
