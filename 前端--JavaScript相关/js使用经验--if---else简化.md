# js使用经验-- 简化 if else 语句

## 目的

在项目中，`if else`语句如果用得很多，特别是嵌套，代码不美观，阅读性不好。所以的话，用其他的方式简化替换`if...else...`就很有必要。

简化的作用就是赠人玫瑰，手留余香。对自己对项目对别人都是好事。

if else语句是啥？好比下图。

![image.png](https://upload-images.jianshu.io/upload_images/8195910-ff56230f59d35978.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 如何简化

#### 一、 借助短路运算符  && ||

这两个是啥？就是大学时代学习数电的与或。短路逻辑就是说是否执行第二个语句（操作数）取决与第一个操作数的结果。

我们可以用 `&&` 来决定是否执行一段代码或者 `||` 设置默认值。

```javascript
// && || 经典模式
if (foo) bar(); ==> foo&&bar(); 
if (!foo) bar(); ==> foo||bar(); 
//&& 别人博客例子
function getInfoFromStorageBydid(key, did, success, error) {
  wx.getStorage({
    key: key,
    success: function (res) {
      var data = res.data[did];
      if (data) {
        typeof success === 'function' && success(data);
        wx.hideToast();
      } else {
        typeof error === 'function' && error();
      }
    },
    fail: function () {
      typeof error === 'function' && error();
    }
  });
}

//|| 
if(a){a = a} else {a = b} ==> a = a || b;
```

#### 二、使用三元表达式

平时开发中使用率很高，特别是在页面数组渲染是根据一个字段的值来判断给哪个单位，或者中文描述等等。只要是2选一的，就无脑用呗。

```javascript
if (foo) bar(); else baz(); ==> foo?bar():baz(); 
if (!foo) bar(); else baz(); ==> foo?baz():bar(); 
if(a == b ){ a = c }else { a = d } ==> a = (a==b)?c:d;
```

注意，三元表达式（操作符）不能使用return语句。

#### 三、switch/case

如果`if else`的数量很大，分支很多，而且不仅仅是需要返回字段，需要干点什么。就用`switch case`吧。

例如
```javascript
xxx.done(function(data){
  switch(data.status){
     case 'success':
       //TODO
       break;
     case 'fail':
       //TODO
       break;
     default:
      //TODO
  }
});
```


#### 四、hase表(推荐)

`hash`表是什么？键值对的集合。对象就是`hash`表

这个东西就类似映射那样。如果`if else`的数量很大，分支很多，而且就是让你返回一个字段。

就是上个月啊，和一个后台搞图片的功能。图片的待上传列表是那后台返回来的数组。写的时候，需要搞隐射，发现不好搞：一个页面，拿到`SPECIAL_FATE_STORE_HEADER`字段给后台`specialFateStoreHeaderId`字段；另外一个地方同理：`specialFateStoreHeaderId->STORE_HEADER`。为什么这么麻烦？后台小子逻辑差，经验不足，没处理好。一开始我使用switch case。搞了不少行代码，维护性也不好，因为有两套，改其中一个，另外一个也得跟着改。这时候，上面的那些数组遍历和对象遍历的内容就可以用进来了。再一次证明会js真的可以为所欲为，呵呵。代码如下。

```javascript
let valueMap = {
    SPECIAL_FATE_STORE_HEADER: 'specialFateStoreHeaderId'//值1：值2
    //...这里省略了15行
}
//获取值的值 
function getValueName(type) {
    return valueMap[type] ? valueMap[type] : valueMap['SPECIAL_FATE_STORE_HEADER'];
}
//获取键的值
function getKeyName(targetValue){
    let targetArr =  Object.keys(valueMap).filter((key) => { return valueMap[key] == targetValue });
    return targetArr.length === 0 ? 'STORE_HEADER' :  targetArr[0].split('FATE_')[1]
}
console.log(getValueName('SPECIAL_FATE_STORE_HEADER'),'valueMap')
console.log(getKeyName('specialFateStoreHeaderId'),'valueMap')
```

以后再次来需求，我就在`valueMap`对象里面加。万一再来需求，后台小子还要值3，值4怎么办？难不到我。我修改`valueMap`的结构。再改下逻辑就行。

```javascript
let valueMap = {
    SPECIAL_FATE_STORE_HEADER: 'specialFateStoreHeaderId&&值3&&值4'//值1：值2 && 值3 && 值4
    //...这里省略了15行
}
```

就拿我在项目中的遇到的一个问题吧，有个搜索框，是很多页面共用的，可以查询客户经理，银行，分行等等。不同接口的方法类型和需要的数值不一样，情况就7到8种。我那个同事啊，写了很多`if-else`。看起来很麻烦，瞬间就不想再看。其实这时候可以使用`hash`来，结合反引号可以动态引入变量值。代码如下，注意啊，每个键值对都要加双引号（除非是数字），不能是单引号，否则`JSON.parse`会出现报错。

```javascript 
let mapObj = {
    1:`{
         "data": {"name": "${value}","branchId": ${this.id}},
         "type": "get"
       }`,
    2:`{
         "data": {"name": "${value}"},
         "type": "post"
       }`
}
data = JSON.parse(mapObj[this.type]).data
```

#### 五、省略括号

如果能省略括号就直接省略括号吧，阅读起来特别直观。

```javascript
//省略前
if(a > b){
  console.log('a大');
}else{
  console.log('b大');
};

//省略后
if(a > b) console.log('a大');
else console.log('b大');
```

最后，欢迎关注我的公众号。

![公众号二维码.jpg](https://upload-images.jianshu.io/upload_images/8195910-4759b64c8d6d9ed7.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)





