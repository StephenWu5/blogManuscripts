# js使用经验

## 目的

在平常的前端开发中，一般需要处理数据（数组和对象居多），特别是复杂功能的页面，通常是一到两个对象数组（有时数组里面还有数组）。大多数前端开发的难点就是这里，耗时大。以前我在工作中，遇到的支付方式功能，排课日历，场地预约，公园大屏幕运动排行和弹幕，后台系统的权限模块等等，这些功能难度大费脑耗时间多。其他那些功能很简单的，无脑复制粘贴运行就完成了。如果我可以总结一下，找出一些高效的处理数组和对象的方法，以后工作中就对号入座的使用，这肯定可以提高我的工作效率，到时候我可以多出时间来给测试或者学习新知识或者摸鱼休息。这总比每天瞎用`js`工具类，碌碌无为的写代码强。

做一件事有很多种方法，最快捷的就那一两个，把它们找出来，事半功倍。正所谓磨刀不误砍柴工。

![空虚](https://upload-images.jianshu.io/upload_images/8195910-76873caf090eaa65.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




## 数组的遍历

#### 一、for...of(通用)

最好用的迭代（循环）语句

说到循环，javascript的循环语句那么多，我该如何选择？其实就是问下自己，自己需要什么？我眼睛一闭，我要可以用在很多地方（对象），写法简单，这样维护性高；我还要支持`continue，break，throw，return`打断循环或者跳到下一个循环（某一次迭代不执行循环体代码块），我还要`index`，`index`等于某个值时做一些逻辑判断。

`for...of`，它可以用于可迭代对象。`Array，Map，Set，String，TypeArray，arguments`等等。就是说可用的地方很广，哪里都能用。迭代是啥意思，就是说按顺序访问列表中的每一项，就是小时候老师家访那样，学生的家走一遍。其实在项目中，一般都是遍历对象数组，这样的数据结构前端后台耳熟能祥。

这个东西性能不算好的，是es2015推出来的，写法特别简洁。运行效率中下，比`for，forEach`差，但是比`map`好。优点是占用内存最小。其实运行效率和占用内存是次要的，因为在项目中，处理的数据的长度不会很长，一般在10到30之间，影响不大，再说前端在大多数情况下不需要考虑性能（上一家公司技术大哥给我的经验）。写法简洁的话，在二层循环的情况代码的阅读性和维护性就较高。

处理逻辑时，一般需要（特别需要）使用`break，continue，return`来设计代码逻辑。不是所有的循环语句都支持`return ，break`。记得有一次我使用`forEach`语句的时候，循环体里面加了`break`，发现跳不出去。搞半天原来是不支持。现实又狠狠的打了我这种渣渣一耳光。改为`for`语句解决了。

`index`它是不支持的，不是你要什么它就是支持什么。可以通过把数组等转化为`Map`对象。实现如下：

```javascript
for(let [index,item] of new Map(targetArray.map((item,i) => [i,item]))){
    console.log(index, item)
} 
```

#### 二、reduce，reduceRight（百变）

`reduce`循环（招式很多）

一开始我以为`reduce`只能求和，没什么用，查询大神写的博客，我才知道它很厉害。我开始要抄别人的东西了。没办法，技术不行。

数组求和，求乘积(其实求减，求除也是没有问题的啰)

```javascript
var  arr = [1, 2, 3, 4];
var sum = arr.reduce((x,y)=>x+y)
var mul = arr.reduce((x,y)=>x*y)
console.log( sum ); //求和，10
console.log( mul ); //求乘积，24

//其实对象数组也可以求和，为所欲为啊
var  arr = [{num: 1}, {num: 2}];
var sum = arr.reduce((x,y)=>x+y.num,0)
```

计算一个数组中元素成员的次数（利用了一个`reduce`的第二参数初始化为空对象，用这个对象来记录数组出现的次数。然后把这个对象给饼状图。不过一般后台会直接给前台这个对象，不需要前台计算。）

```javascript
let names = ['Alice', 'Bob', 'Alice'];

let nameNum = names.reduce((pre,cur)=>{
  if(cur in pre){
    pre[cur]++
  }else{
    pre[cur] = 1 
  }
  return pre
},{})
console.log(nameNum); //{Alice: 

//万一数组的每一项是对象，能不能搞啊 可以的，拓展一下就可以了。看
let names = [{name:'Alice'}, {name: 'Bob'}, {name: 'Alice'}];
let nameNum = names.reduce((pre,cur)=>{
  if(cur.name && cur.name in pre){
    pre[cur.name]++
  }else{
    pre[cur.name] = 1 
  }
  return pre
},{})
console.log(nameNum); //{Alice: 
```

数组去重，这个功能经常遇到，当数组出现重复，后台不好处理时，这时需要前端去重(利用了第二个参数初始化为空数组，)

```javascript
let arr = [1,2,3,4,4,1]
let newArr = arr.reduce((pre,cur)=>{
    if(!pre.includes(cur)){
      return pre.concat(cur)
    }else{
      return pre
    }
},[])
console.log(newArr);// [1, 2, 3, 4]
//对象数组去重和上面一样，拓展一下
let arr = [{num: 1},{num: 2},{num: 3},{num: 3}]
let temp = {};
let newArr = arr.reduce((pre,cur)=>{
    if(!temp[cur.num]){
      temp[cur.num] = true;
      return pre.concat(cur)
    }else{
      return pre
    }
},[])
console.log(newArr);// [1, 2, 3, 4]

```

看了一下人家的博客，发现`reduce`还能快速实现`filter`的功能。为所欲为啊。实现如下。

```
const data = [
  {name: 'a', age: 37, weight: 72, sex: 'male'},
];
// accu 为 accumulator，curr 为 currentValue
const result = data.reduce((accu, curr) => {
  // if 判断，相当于 filter
  if (curr.sex === 'female') {
    accu.push(curr);
  }
  return accu;
}, []);
console.log(result);
```

递归处理`tree`树形，这种需求在工作中没有遇到过，不知道以后会不会遇到。代码中的`callee`是个指针，指向当前执行的函数，就是函数它自己，一旦是用于递归处理。如果不这样写的哈，就需要定义个函数变量，在函数内部调用自己。函数定义在`reduce`的外面，代码的阅读性降低。`callee`就是提供快捷编码，提高代码的阅读性。

```
var data = [{
            id: 1,
            name: "办公管理",
            pid: 0,
            children: [{
                    id: 2,
                    name: "请假申请",
                    pid: 1,
                    children: [
                        { id: 4, name: "请假记录", pid: 2 },
                    ],
                },
                { id: 3, name: "出差申请", pid: 1 },
            ]
        }
    ];
    const arr = data.reduce(function(pre,item){
        const callee = arguments.callee //将运行函数赋值给一个变量备用  
        pre.push(item)
        if(item.children && item.children.length > 0) item.children.reduce(callee,pre); //判断当前参数中是否存在children，有则递归处理
        return pre;
    },[]).map((item) => {
        //清空每一项item
        item.children = []
        return item
    })
    console.log(arr)
```

他还有个兄弟，叫`reduceRight`，只是循序不一样，一个是顺序，一个是倒叙而已。功能几乎一模一样为什么还要搞两个？程序员有时真的是无聊到极点。我会不会去学`reduceRight`?我不学，机智躲开。

有个大佬写了`reduce`的高级用法 

https://developer.51cto.com/art/202002/610535.htm 



#### 三、some，every，filters，map （私人定制）

要想快速实现某些功能，就要使用功能专一的。

`some` 和 `every`

他们是两兄弟，需要的参数可以是函数，返回值是true和false。前者有一个条件满足，函数返回值是`true`，就停止遍历。后者是所有条件满足，函数返回值是`true`，就停止遍历。

几乎没有用过，不知道使用场景。应该是算是否全勤，一个班的同学是否全部及格。还有全选效果的实现吧。

`filter`(推荐)

官方的解释是找到所有符合条件的元素然后放到一个数组中 如果没有符合条件的那么返回空数组。物如其名，就是一个过滤器，拿到符合条件的数据项拼成新的数据。

使用场景很多，渲染页面的时候，需要拼接符合条件的数组和给后台数据的时候，给后台符合条件的数据。**按某个属性分组**。上一家公司的时候，写跑步比赛页面，页面需要显示跑步中，没开始，跑完等状态。此时如果使用`filter`，就快速得到需要的数组。

`map` 

就是需要对一个数组的每一项做相同的操作处理时。使用`map`就会很快。`map`不会改变原来的数组这个定律适用于数组成员是值类型。如果是引用类型，这个不适用。

那么如何快速的选择合适的遍历数组的方法呢？根据开发工作中的需求，首先审查功能专一私人定制的`some，every，filters，map`，再到`reduce`。这时候千万不能轻易跳到`for...of`。在`reduce`这一层尽情耍大刀。如果实在不行了，就`for...of`呗。

## 对象的遍历

在工作中除了处理数据，处理对象也是常见。

#### 一、for...in

这个是一般用法。使用很简单。

#### 二、keys，getOwnPropertyNames，ownKeys (推荐)

他们的使用一模一样，都很简单。 `keys`遍历自身的可枚举属性。 `getOwnPropertyNames`遍历自身的所有属性。 `ownKeys`遍历自身属性（包括`Symbol`）。

其实不乱的，需要知道属性有可枚举与不可枚举，是否是Symbol。根据实质情况去选择就行了。再说工作中大多数的对象的属性都是可枚举的，用 `keys`可以解决大多数需求。

为什么要推荐使用 `keys`等。可以试想一下，把对象转化得到数组之后，不就是可以使用上面数组循环的那些方法处理各种逻辑？什么`reduce,filter,map,some，every`对吧，特别那个`reduce`就和周杰伦双截棍那样，怎么耍都可以。又快又简洁。

```javascript
var obj = {'0': 1, '1': b}
Object.keys(obj).forEach((key) =>{
    console.log(key,obj[key])
})
```

在以前公司的项目中，我发现可以这样写接口，每次添加接口只需要在`urlMap`对象里面添加键值对：（或者说写在其他`js`文件，把几个对象合并到`urlMap`）。

这样处理的好处是，阅读舒服，代码维护性高，减少不必要的代码冲突，节省时间。

```javascript
const urlMap = {
    loginUserInfo: '/api/loginUserInfo', //---方法名/接口路径---
};
const services = {};
 
Object.keys(urlMap).forEach((methodName) = > {
    services[methodName] = function (params, async = true, type = 'GET') {
        var data = [];
        var promise = $.ajax({
            url: urlMap[methodName],
            data: params ? params : {},
            async: async,
            dataType: "json"
        });
        if (async) {
            return promise;
        } else {
            promise.done(({
                code, obj
            }) = > {
                (code === 0) && (data = obj)
            });
            return data;
        }
    };
});
 
export default services;
```

说个题外话的，处理对象的时候，有时候需要做对象合并处理。对象合并可以用在哪些地方？就是页面分页组件，`echart`组件它们需要配置对象，这个对象有很多的键值对。可以抽一些共同的属性处理预设值写在组件内部，其它的就写在组件外部传进来，这时候就需要合并它俩。这种概念叫做配置 `config`。

简单的写法就是使用 `Object.assingObj`；这个方法就是把多个源目标复制到目标对象，不管这个目标对象有没有这个属性值。

也可以使用严格一些的方法，就是说，目标对象和源对象公共的属性值，才搞到目标对象上，不是的话不要过来，否则可能会搞坏内部的配置。缺点就是在组件写配置对象时，需要多写(有可能是很多行)属性名，总是比每次写在组件外面强（代码如下）。

```javascript
function assignObj(vm, firstSource) {
    for(let [index,item] of new Map([...arguments].map((item,i) => [i,item]))){
        if(index === 0)  continue; //躲开vm

        let nextSource = [...arguments][index];
        if (nextSource && typeof nextSource !== "object") continue;
        Object.keys(vm).reduce((pre,cur) => {
            if(vm.hasOwnProperty(cur) && nextSource.hasOwnProperty(cur))

                vm[cur] = nextSource[cur]
        },vm)
    } 
    return vm
}

var returnValue =  assignObj({name: 'name',age: 6,hairs: 8},{name: 'name',age: 6,clothes: 'lalala1'},{name: '周星驰'})
console.log(returnValue,'returnValue')
```

有人可能会提问？当对象里面的属性又是对象时，你这个方法不支持啊。难不倒我，我可以用`callee`来升级的。

```javascript
function assignObj(vm, firstSource) {
    const callee = arguments.callee //将运行函数赋值给一个变量备用  
    for(let [index,item] of new Map([...arguments].map((item,i) => [i,item]))){
        if(index === 0)  continue; //躲开vm

        let nextSource = [...arguments][index];
        if (nextSource && typeof nextSource !== "object") continue;
        Object.keys(vm).reduce((pre,cur) => {
            if(Object.prototype.toString.call(vm[cur]) !== '[object Object]' && vm.hasOwnProperty(cur) && nextSource.hasOwnProperty(cur))

            vm[cur] = nextSource[cur]
            else if(Object.prototype.toString.call(vm[cur]) === '[object Object]' && vm.hasOwnProperty(cur) && nextSource.hasOwnProperty(cur))
            callee(vm[cur],nextSource[cur]);
            return vm;
        },vm)
    } 
    return vm
}
```

如果不想在`vue`内部组件中写太多的组件初始化配置值的话，可以采取一种宽松的方式：就是说在目标对象的基础上，把所有源对象的属性复制过来，共同属性的值直接覆盖。其实很简单的，遍历源目标，属性是非对象把值复制过来，属性是对象再次遍历。 把上面代码的那行`Object.keys`出现的`vm`改为`nextSource`就可以了。


再说个题外话吧，就是上个月啊，和一个后台搞图片的功能。图片的待上传列表是那后台返回来的数组。写的时候，需要搞隐射，发现不好搞：一个页面，拿到`SPECIAL_FATE_STORE_HEADER`字段给后台`specialFateStoreHeaderId`字段；另外一个地方同理：`specialFateStoreHeaderId->STORE_HEADER`。为什么这么麻烦？后台小子逻辑差，经验不足，没处理好。一开始我使用`switch case`。搞了不少行代码，维护性也不好，因为有两套，改其中一个，另外一个也得跟着改。这时候，上面的那些数组遍历和对象遍历的内容就可以用进来了。再一次证明会`js`真的可以为所欲为，呵呵。代码如下。

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

以后再次来需求，我就在`valueMap`对象里面加。万一再来需求，后台小子还要值3，值4怎么办？难不到我。我修改`valueMap`的结构。再改下逻辑就行。他还要值5的话，那就叼人或者离职吧。

```javascript
let valueMap = {
    SPECIAL_FATE_STORE_HEADER: 'specialFateStoreHeaderId&&值3&&值4'//值1：值2 && 值3 && 值4
    //...这里省略了15行
}
```

![javascript.jpg](https://upload-images.jianshu.io/upload_images/8195910-d796737ab048781b.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

最后，欢迎关注我的公众号。

![公众号二维码.jpg](https://upload-images.jianshu.io/upload_images/8195910-4759b64c8d6d9ed7.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)














