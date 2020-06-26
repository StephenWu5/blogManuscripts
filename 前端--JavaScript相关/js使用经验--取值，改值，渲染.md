# js使用经验--取值，改值，渲染


有时间了，就写一写前端的项目遇到的几个常见的问题，为了记录工作，总结下，对自己有或多或少的帮助。也许，十几年后回过头来，能看到自己的影子，走过的路迹。


因为深度拷贝项目中用的多，所以啊，也在里面提及。


##  取值


前端是什么，前端就是把后台的数据或者自定义的数据渲染到页面上，或者自定义数据或者从页面拿数据作为参数给后台接口。渲染数据主要用的是后台的数据，而给后台接口的数据主要来自页面或者后台上一次的接口。

![image](https://upload-images.jianshu.io/upload_images/8195910-3390f66da9300ef1.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**所以从页面（html）拿数据给后台就变得很重要或者频繁**，做好这一步，对工作效率的提高是很大的帮助。


方式一、原生js支持dataSet，只要在标签内`data-`就能嵌入值，在js里面dom.dataset就能拿到对应的值。


方式二、vue有双向数据绑定，v-model把data的值插入到标签。这个data的值就是需要的值。


#### 啥时候取值


在项目中有时不会这个简单。记得有一次我做xx所有人信息时，那一块需要一个数组，数组的每一项对应着姓名（输入框），类型（单项），电话，证件，地址（下拉框）等等。我要采集这一块数据有两个方案：给每一个输入项绑定事件，比如输入框onblur，onchang,等等，可以稳稳实现，但是代码量多，以后改动起来不好改；利用监听vuex里面的某个状态变化便采集开始数据，但是需要写两个state状态值，对原来保存功能的代码改动大，不是个好方法。


后来在我思考选哪一种方式时，坐地铁时，突然想起onmouseleave事件可以完美解决这个问题。xx所有人信息块是一个区域，技术上来说是个标签div，每次点击保存时鼠标一定要移出这个区域，我只要添加mouseleave，让那会生成后台需要数组，等真正点击保存按钮时，数据肯定是就绪的。一行代码的事。如果我选择上面的方式之一，10到50行不同地方的代码，维护起来就不容易。你看，onmouseleave这个了不起眼的事件，在这个时候就起到很大的作用。所以有时间需要了解一些原生js，vue的事件，说不定那天就大派用场。


这件事给我的启发是，用一种方式做一件事（不限写代码）的时候，如果感觉有困难，很可能是这个方式有问题，那就要多想其他的2种方式，在这几种方式挑最有好的。这样子，事半功倍。写代码时，如果项目任务不是特别急，时间充裕下，停下来想好再编码，对公司，对自己都是好事。否则很可能在项目里挖一些坑。


代码写的简洁，对自己和项目是好事。但是给领导那边不好交代。代码写简洁就是用行数少的代码去做多的时间，代码行数少，领导知道这个以为你做事情不多或者工作不饱和，这样不太好。有一次代码评审时，别人一看我的代码少，就问你叫什么名字，是不是工作不饱和。其实我只是代码写简洁了，用这种方式之前我还用过其他一种复杂的方式，后来才想到后来这种优化的方式，说白了就是取巧。我的工作量并没有像代码行数那样少，应该说不多不少，因为除了写代码，还要走测试流程呢。没地方吐槽，便来这里吐槽呗。




#### 到源头取值


vue ui选择框，选择框下数组通常是前端定义好或者后来返回来的。当选择了其中一项时，我们使用onchange，很容易拿到当前选择的一个值，去做点什么。如果是后台需要该数组下的当前选择的2个以上或者几个字段的值时，那怎么办？onchange只能拿到绑定在下面标签的一个字段。我的同事包括我吧，曾经感觉这个很难，用dataSet不方便，onchange在v-for的外面。因为我们都犯了一个错：把注意力留在html层面。其实，回到数据源头，事情变得很简单。你看下面代码，v-for需要的dataList，我们需要的东西就在dataList，其实到DataList去要就行，它才是源头。html它是个中间人，可以不管它，因为html的数据值也是由dataList提供的啊。


具体是dataList的哪一项呢？拿到目标数据项的某个属性值（不限于index），借助array.filter这个函数（我在公众号文章《js使用经验--遍历》体验过），轻松拿到。实现如下：




```javascript
//vue
<pax-select defaultValue="lucy" style="width: 120px" @change="handleChange">
      <pax-select-option :value="item.value" v-for="(item,index ) in dataList">{{item.name}}</pax-select-option>
</pax-select>


//js
data(){
    return {
        dataList: [{
            value: 'value'
            ... //省略很多行代码
        }]
    }  
},
methods: {
    handleChange(value) {
        let targetItem = this.dataList.filter((item) => {
            //因为value是唯一的，所以拿它做标记
            return item.value === value;
        })[0];
        //之后就干点什么
    }
}
```




## 改值


#### 深度拷贝


取值后，我们通常需要对数据处理，达到某个目的。在调用一些工具类处理对象或者数组时，会把原来的对象或数组改变，我们并不需要这样的改变。这时候，就需要深度拷贝。


为啥会改变呢，因为引用，原数据和新数据用的是同一个内存地址，他们是同一个东西。深度拷贝就是不管数据有多复杂，原封不动的拷贝一样的过来。无论怎么改后者，前者都不变。


这玩意有啥用呢。有一次，我做一个4个SY人信息的录入，保存，再次第二次保存时，发现上一次信息数据残留，回填着呢。没办法啊，只有改，排查keepAlive找一会找不到，肯定不是那个问题，因为其他信息录入没有问题。后来才想到应该是data里面的数据数组和初始值数组（后者赋值给前者），它们的联系没有切断。使用深度拷贝这个概念切断它们的联系，让它们在内存中独立存在，这个数据残留的问题就解决了哈。


//todo 写一写页面数据和后台数据。


一、一维数组，对象的拷贝


数组：concat() 拓展运算符... Array.from
对象：Object.assign() 扩展运算符...


注意使用 assign() 有如下特点：不会拷贝对象继承的属性、不可枚举的属性、属性的数据属性/访问器属性；可以拷贝 Symbol 类型。


以上他们只能对一维的数据深度拷贝，对二维和多维无效，因为还是引用那个问题。


二、 二维以上的深度拷贝


（1）最常用的 JSON 序列化与反序列化
JSON.parse(JSON.stringify(obj))


简单粗爆，但是有缺陷:


拷贝的对象的值中如果有函数、undefined、symbol，则经过 JSON.stringify() 序列化后的 JSON 字符串中这个键值对会消失；
拷贝 Date 引用类型会变成字符串;
拷贝 RegExp 引用类型会变成空对象;
等等。


（2）lodash 的深拷贝 cloneDeep(推荐，最靠谱的)
使用 lodash 插件的深拷贝方法
​



(3) 自己撸一个轮子，玩下


其实实现思路很简单，就是遍历一个对象，查看它内部的属性值的类型，如果是对象和数组等等，再次进去遍历；如果是简单的数据类型，就做赋值操作。因为对象和数组的赋值是给引用，普通的数组类型是真给值，当然存在这非对象数组非普通数据的第三种情况（工作中很少遇到而已）。


需要用到递归，`arguments.callee`可以简化写法。


```javascript
function deepClone(Obj){
    let result;
    let topType = Object.prototype.toString.call(Obj);     // "[object Array]"
    let callee =  arguments.callee;
    result = ['[object Object]'].includes(topType) ? {} : [];


    if(['[object Object]'].includes(topType)){
        Object.keys(Obj).forEach((item, index)=>{
            result[item] = callee(Obj[item])
        })
    }else if(['[object Array]'].includes(topType)){
        Obj.reduce((pre, cur) => {
            result.push(callee(cur))
            return [];
        },[])
    }else{
        //省略 
        //这里可以扩展其他条件
        result = Obj
    }


    return result;
}


//测试
let obj = {
    name: 'admin',
    arr: [2,3,{name: 'name',value: 'value'}],
    obj: {
        name: 'admin2'
    },
    deepClone: function(){
        console.log('hello word')
    }
}
let obj2 = deepClone(obj);
obj2.arr[2].name = [1,2,88]
obj2.obj.name = '周星驰'
obj2.deepClone = function(){
    console.log('fuck pinan')
}


console.log(obj)     
console.log(obj2)
obj.deepClone();
obj2.deepClone();


```


(4) 30second of code 有名的代码片段


人家的代码简洁，整理代码应该往这种方向走，让我写，我肯定写不出来。


```javascript
const deepClone = obj => {
  if (obj === null) return null;
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  );
  return Array.isArray(obj) && obj.length
    ? (clone.length = obj.length) && Array.from(clone)
    : Array.isArray(obj)
    ? Array.from(obj)
    : clone;
};
```


## vue页面渲染，$set


最近遇到一个vue项目的问题，感觉算经典的，挺有意思的。就是在页面上渲染一个数组，采集SY人的基本信息，这个数组的每一项采集名称，年龄，日期等字段，可删可增。在做项目的过程中，发现删除第一项，怎么也删除不了；当时试了2种方法，比如set等等，


最后发现是`:key='index'`的问题。只要让`:key=id`就可以了。ID是独一无二的，index不是。vue的v-for每一项的是否重新渲染是看key是否变化，给id值确保了页面做删除操作了，页面重新渲染，因为id肯定变化了。


其实这类的问题最快捷的解决方法就是去`vue`的官网上找文档观看，了解`v-for`的运行机制，就可以解决答案。我很幸运，是朋友告诉我的。哈哈。




如果是数据复杂时，比如，数组的每一项是对象，对象下某个属性是对象。改变最底层的某个属性值，而页面上不更新。这时候需要要set方法。实现很简单，代码如下：


```javascript
this.$set(this.obj,'e',02)
```




最后，欢迎关注我的公众号。


![公众号二维码.jpg](https://upload-images.jianshu.io/upload_images/8195910-4759b64c8d6d9ed7.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


