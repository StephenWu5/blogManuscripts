## javascript系列--es5的数组学习

> 参考网址是 https://www.zhangxinxu.com/wordpress/2013/04/es5%E6%96%B0%E5%A2%9E%E6%95%B0%E7%BB%84%E6%96%B9%E6%B3%95/

#### 1. forEach
该函数是`Array`方法里最基本的一个，就是遍历，循环。使用代码如下：
```
[1,2,3,4].forEach(alert);
[1, 2 ,3, 4].forEach(console.log);
```

`forEach`里面的方法支持3个参数，第一个是数字的内容，第二个是数组的索引，第三个是数组的本身。

```
[].forEach(function(value, index, array){
        
})
```

`forEach`除了接受一个必须的回调函数参数，还接受一个可选的上下文参数（改变该回调函数里面的`this`的指向）

代码例子如下：

```
var database = {
  users: ["张含韵", "江一燕", "李小璐"],
  sendEmail: function (user) {
    if (this.isValidUser(user)) {
      console.log("你好，" + user);
    } else {
      console.log("抱歉，"+ user +"，你不是本家人");	
    }
  },
  isValidUser: function (user) {
    return /^张/.test(user);
  }
};

// 给每个人法邮件
database.users.forEach(  // database.users中人遍历
  database.sendEmail,    // 发送邮件
  database               // 使用database代替上面标红的this
);

// 结果：
// 你好，张含韵
// 抱歉，江一燕，你不是本家人
// 抱歉，李小璐，你不是本家

```

`forEach`还有一个特点，不会遍历着一些空位的而打印空的数组的项。例子如下:

```
var array = [1, 2, 3];

delete array[1]; // 移除 2
alert(array); // "1,,3"

alert(array.length); // but the length is still 3

array.forEach(alert); // 弹出的仅仅是1和3
```


#### 2. map
这里`map`函数是不是地图的意思，而是映射；`[].map();`，基本用法和`forEach`方法类似。

```
array.map(callback,[thisObject]);

[].map(function(value,index,array){
        
})
```
映射就是把原数组映射为新数组。下方是数值项求平方：

```
var data = [1, 2, 3, 4];

var arrayOfSquares = data.map(function (item) {
  return item * item;
});

alert(arrayOfSquares); // 1, 4, 9, 16
```

`callback`需要`return`值，如果没有，就会把下面的都返回为`return`;就像下面这样：

```
var data = [1, 2, 3, 4];
var arrayOfSquares = data.map(function() {});

arrayOfSquares.forEach(console.log)
```


我们也可以利用`map`方法获取对象数组中的特定属性们。
```
var users = [
  {name: "张含韵", "email": "zhang@email.com"},
  {name: "江一燕",   "email": "jiang@email.com"},
  {name: "李小璐",  "email": "li@email.com"}
];

var emails = users.map(function (user) { return user.email; });

console.log(emails.join(", ")); // zhang@email.com, jiang@email.com, li@email.com
```

#### 3.filter

`filter`是过滤，筛选的意思。数组filter后，返回过滤后的新数组。用法和`map`极为类似。

```
array.filter(callback, [thisObject]);
```

当`callback`返回了布尔值`true`或者`false`，如果为`true`，就可以通过；如果为`false`，对不起，你回家吧。


```
var data = [0, 1, 2, 3];
var arrayFilter = data.filter(function(item) {
    return item;
});
console.log(arrayFilter); // [1, 2, 3]
```

其实可见，返回值只要是弱等于 `==true/false` 就可以了，因为`js`那里会给你做了这个自动转换。

#### 4. some

`some`指的是某些，就是说符合某些条件项的。和下面的`every`，比较类似。

用法如下：

```
array.some(callback,[ thisObject]);
```

例子代码如下：

```
var scores = [5, 8, 3, 10];
var current = 7;

function higherThanCurrent(score) {
  return score > current;
}

if (scores.some(higherThanCurrent)) {
  alert("朕准了！");
}
```

就是算只要数组里面有一项有这个值的，我就给他通过，返回一个'true', 否则什么都不返回；哈哈哈；

#### 5. every

和上面的`some`特别类似，意思就是数组里面的每一项都要满足我才给它返回true, 否则'false'。

例子代码如下：这里是没有的，参考上面some的代码吧，哈哈。

#### 6. indexOf 

该方法是在字符串中很早就有的。其实`string`和这个方法类似。如果没有匹配到该项，就返回`-1`；如果匹配成功就返回索引值。

```
array.indexOf(searchElement[, fromIndex])
```

第二个参数是从那个位置开始搜索，如果默认不填就从0开始。

```
var data = [2, 5, 7, 3, 5];

console.log(data.indexOf(5, "x")); // 1 ("x"被忽略)
console.log(data.indexOf(5, "3")); // 4 (从3号位开始搜索)

console.log(data.indexOf(4)); // -1 (未找到)
console.log(data.indexOf("5")); // -1 (未找到，因为5 !== "5")
```






