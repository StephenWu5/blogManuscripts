# vuex使用经验

#### 前言

因为在项目中使用vuex的关系，最近重新在慕课网上学习了这个课程。对它的了解又进一步。

vuex就是一个状态管理的仓库，只要是vue项目的同一个页面的所有组件，都可以对这个仓库进行的状态进行存储，修改或者读取。不是同一个页面的话，可以通过浏览器的cookie，localStorage，sessionStorage进行桥连，就是在切换路由的时候，判断localStorage，或者sessionStorage是否存有值，有的话，就拿里面的值给vuex里面对应的State名；每次存Vuex里面的值时，记得给localStorage存一份。当然在这里不是每一个State的值都要备份到Storage里面去。需要桥连多个页面的那些State才需要，这样子可以写少代码量。

#### State

State是状态库，它就好像一个数据库，存放数据的，一个字段对应一个数值。

State看起来很简单，其实不然，他有个高级的用法。像我在上一家公司录入东西时，新增页面5种类型的该东西，编辑页面可以有更多种，如果我只是定义一个status的值，解决不了我的问题。那就把他写成一个对象，给该对象添加根据类型值的属性和值，在另外一个组件监听该状态下的属性值，做点什么。

其实这里uniqueFlag要找对，找不对的话，程序会出问题。新增页面SH类型，编辑页面找SH类型加SH编号。一开始无论新增/编辑页面我只找SH类型，这样子是不对的，比如多开2个编辑页面的话同时进行会出问题。大多数测试测不到这个问题是因为他们习惯只开一个编辑页面。

实现如下：

```javascript
//一、定义
 state: {
        secIndustry: '',//第二行业类型
    },
    mutations: {
        setSecIndustryAsyc:(state,data) => {
            state.secIndustry = {
                ...state.secIndustry,
                ...data,
            }; 
        },
    },
}

//二、修改值
let newObj = {};
let uniqueFlag = ''; //唯一标识
newObj['secIndustry'+ uniqueFlag] = secIndustry;
store.dispatch('setSecIndustry', newObj);  //设置第二行业分类

//三、//监听store里面的状态secIndustry下的某个属性变化
let uniqueFlag = 'xxx'; //唯一标识
computed: {
    ...mapGetters(['secIndustry'])
},
watch: {
    //"secIndustry." + uniqueFlag: function(newV,oldV){ 
    //本来我想使用.属性的方式来监听的，发现拼接不上，没法实现，只好手写如下
    //这样子就处理好了
    "secIndustry": function(newV,oldV){
        if(newV[uniqueFlag] != oldV[uniqueFlag]){
            //干点什么
        }
    }
},
```


#### mutations

vuex不是直接去该state里面的值，而是通过mutations或者actions。这样的好处是为了记录State的每一次的修改活动，方便调试和状态回滚。这个回滚是啥，有什么好处，不太懂，在项目中没有用过。 mutations里面是一堆的方法，方法的第一个参数是state。如果有第二参数，那就是调用传入该方法的参数。

mutations只要是同步修改，增加，减少state的值。在项目中主要都是在定义好state的值，mutations修改操作。

定义：
```javascript  
mutations:{
    //es6语法，等同edit:funcion(){...}
    edit(state,payload){
        //state.name = 'jack'
        state.name = payload.xxx;
    }
}
```


在同一个页面的任意一个vue里面，使用：（原来我一直以为只能在actions里面使用）
```javascript
this.$store.commit('edit');

this.$store.commit('edit',15)

this.$store.commit('edit',{age:15,sex:'男'})

//或者正规一些的方式
this.$store.commit({
    type:'edit',
    payload:{
        age:15,
        sex:'男'
    }
})

```

或者在actions里面使用
```javascript
actions:{
    aEdit(context,payload){
        setTimeout(()=>{
            context.commit('edit',payload)
        },2000)
    },
    
    //或者actions里面简单的写法 
    aEdit({commit},payload){
        setTimeout(()=>{
            commit('edit',payload)
        },2000)
    }
}
```

在这里想说说这个接参数使用{}方式的好处。可以减少代码的书写，我们一般会知道传过来的对象里面有哪些，如果使用{}的方式接收参数，这样子拿值时就少写一层名称。就好比上面那些代码可以少写context。简洁了。我们在定义工具类的时候,大可以使用这种方式来简化单词量。

```javascript
/**
 * @desc 转换时间 
 * @param paraObj 对象
 *              DetailsVO  对象
 *              key  目标键
 * @returns newObj
 *              xxxx1时间值
 *              String文字描述
 */
export function convertTime({DetailsVO,key}) {
    let momentObj;
    let newObj = {};
    if (DetailsVO[key] == '9999-12-31') {   //该项为长期有效
        momentObj = null;
        newObj[key+'1'] = momentObj;  //时间
        newObj['timePlaceHolderString'] = '长期有效'
        //console.log('==================================')
    }else if(DetailsVO[key] != null && DetailsVO[key] != ''){
        momentObj = moment(DetailsVO[key]  + '', 'YYYY-MM-DD');
        newObj[key+'1'] = momentObj;  //时间
    }
    return newObj;
}
```


#### actions

因为在大多数情况下，我们写代码的处理方式是异步(api，setTimeout)，不是同步的。这时候需要在actions里面。如果硬是把异步的操作写在mucation，state里面的状态会发生混乱，就是说页面的值变化，state的值还是原来的。

定义：

```javascript
actions:{
    aEdit(context,payload){
        setTimeout(()=>{
            context.commit('edit',payload)
        },2000)
    }
}
```

使用：

```javascript
this.$store.dispatch('aEdit',{age:15})
```

actions还有一个高级的用法，因为它是异步操作，我们可以使用Promise来封装之。

```javascript
//定义
actions:{
    aEdit(context,payload){
        return new Promise((resolve,reject)=>{
            //或者说在这里发送ajax请求
            setTimeout(()=>{
                context.commit('edit',payload)
                resolve()
                //resolve('后台对象')
            },2000)
        })
    }
}

//使用
this.$store.dispatch('aEdit',{age:15}).then((returnObj)=>{
    //做点什么
    //比如拿到后台数据改变本组件的data值；
})
```

actions和aync await组合使用，可以等待。更高级的写法。

在平时开发中我遇到一个需求是，我需要一个信息采集组件采集多个数据塞到一个数组里面，在其他组件点击该按钮时触发这件事，等数据采集完毕，再拿采集到的数据作为参数去调用其他接口。其实可以这样子做，设置一个state字段，以async wait方式写 actions，在信息采集组件监听该状态的变化，当变化时，做采集数据这个事完了，才去做其他事情。这样子应该就可以解决问题了。 这个需求一句话概括就是改变了state的状态，等待状态修改完毕再做点什么。

```javascript
//定义
actions:{
    async aEdit(context,payload){
        return new Promise((resolve,reject)=>{
            //或者说在这里发送ajax请求，setTimeOut
            setTimeout(()=>{
                context.commit('edit',payload)
                resolve('ok了')
                //resolve('后台对象')
            },2000)
        })
    }
}
//使用
try {
    let res =  await this.$store.dispatch('aEdit',{age:15})
    if(res === 'ok了'){
        //做点什么
        //这会儿信息采集完，做点其他事情。
    }
}catch(err){

}
})
```

```javascript
// 假设 getData() 和 getOtherData() 返回的是 Promise
actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
```


#### getters

存钱是为了什么，是为了拿钱去用。getters就是拿钱，它最爽。getters和actions的关系就好比小孩和大人，小孩是花钱的。

用官方的话说，getters就是把state里面的状态暴露出去。

```javascript
//定义
getters:{
    nameInfo(state){
        return "姓名:"+state.name
    },
}

//使用同一页面的Vue文件中
this.$store.getters.fullInfo
```

#### modules 

当一个项目属于中大型，处理的逻辑多，我们需要频繁的写很多的getters,actions,mutation,states;写很多的时候，维护性和阅读性就低。每一个功能的都有自己对应的getters,actions,mutations，按功能划分的话，代码的维护性就上去,modules就是为了这个而来的。


#### 辅助函数（四件）

辅助函数就是为了让开发者快速简洁使用Vuex。它是利用对象展开运算符，做了映射处理，这样子就不用使用 store.commit store.dispatch store.getters,这些又长又臭的语句。


定义很简单的，getters和state搞到computed那里，mapMutations和mapActions推到methods那里。 为啥不把getters等搞到data那里？因为在业务中需要追踪state状态的值，实时更新，data只能拿到某个时刻的状态值。

辅助函数给我的感觉是真香。

```javascript
computed: {
     // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ]),
     // 使用对象展开运算符将 state 混入 computed 对象中
     // 为啥有了getters还要State，其实是一样的，mapState显得有点冗余，用getters也是可以的。
    ...mapState([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
},

methods:{
    ...mapMutations([
      'increment' // 映射 this.increment() 为 this.$store.commit('increment')
    ]),
    ...mapMutations({
      add: 'increment' // 映射 this.add() 为 this.$store.commit('increment')
    }),

     ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
}, 
```

使用：
```javascript
//需要传值就给个参数，否则直接调用。
this.increment({ amount: 10 }) 或 this.add({ amount: 10 })
this.increment() 或 this.add()
```

不建议开始接触Vuex就使用辅助函数，应该使用基本写法一小段时间之后，对Vuex有了了解，再使用辅助函数。
