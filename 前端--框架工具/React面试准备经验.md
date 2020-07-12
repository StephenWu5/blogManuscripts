# React面试经验--准备版

## 前言

最近打算换工作了，因为现在的工作又苦又累，对技术没有什么挑战和提升的帮助，再说，说好的半年加班费也是没有了，公司拿疫情来做挡箭牌。

React的一些概念：Vue 比 React 容易，因为 Vue 提供了很多模板语法或属性帮你搞定事情，比如 v-for、v-if、directive、v-model、watch、computed 等。你背下它们的作用就能做事了。

但是 React 比 Vue 简单，因为 React 里面其实只有一个概念，就是函数。React 没有引入任何新的概念（JSX 也只是在写函数而已）。你可以用 JS 的 if 实现 v-if，你可以用 JS 的 for 实现 v-for，你可以用 JS 的 defineProperty 实现 watch，你可以用 JS 的 getter 实现 computed。

如果你把 Vue 给你额外提供的 v-for、v-if、watch 这些特性全部去掉，然后在 Vue 里用 JSX，其实跟 React 差别也不大，但这样就很不 Vue 了呀。你也可能在 React 里面自定义一些 API 来模拟 Vue，那这样就很不 React 了呀。


## 正文

####  组件

如何定义一个React，组件就是代码的复用，提高代码的维护性，如果不写组件的话，可能在最上的的那个组件就需要多写很多的data,methods之类的。代码维护性不好。

声明组件的2种方式：类和方法。一般是es6类的方式。

```javascript
import React from 'react'

class Banner extends React.Component {
    constructor(props){
        super(props);
    }
    //组件中的变量
    state = {
        selectedRowKeys: [],
        loading: false,
        dataList: [],
        pagination: {},
        visibleModel: false,
    };

    render(){
        return (
            //jsx html就写在里面jsx就是允许在html里面写js语句
        )
            
       
    }
}
```

#### 通信

1、 父组件操纵子组件

```javascript
//父组件定义一个方法，传给子组件，子组件在componentDidMount方法里面调用一些。
//父组件调用子组件方法
onRef = (ref) => {
this.child = ref
}

//子组件定义
componentDidMount(){
    this.props.onRef(this);
}

//最后父组件就拿到最新的子自己的this对象，然后那就可以操该方法和属性。
```

2、子组件拿到父组件的数据和方法
```javascript
//其实就是在prop里面传下去
{/*弹窗层*/}
<AddOrEditModel style={{width: '180px'}} className="addModel" onRef={this.onRef} fetchList={this.fetchList}></AddOrEditModel>
```

#### 生命周期


#### 路由

state传参, params 传参
```javascript
import {Link} from 'react-router-dom'

this.props.history.push('/child02')
<Link to={'/app/index'}></Link>
```

#### computed和watch

要实现 vue 的 computed，很简单，useMemo 属性即可

1、computed
```javascript
//useMemo,useCallback
import React, { memo, useMemo, useCallback, useState } from 'react';

const App = memo(() => {
  const [count, setCount] = useState(0);
  let double = useMemo(() => {
    return count * 2
  }, [count]);   //double依赖于count，当count改变时，double自动改变，详情可见我的useMemo文章 
  return (
    <div>
      <button onClick={()=>{setCount((count) => count + 1)}}>count+1</button>
    </div>
  )
})
export default App;
```

2、watch

在componentDidUpdate里面做对比
```javascript
componentDidUpdate（prevProps, prevstate if（prevstate. namel！==this state. name1）t this setstate（t name2. this. state, name1
}）

```
或者state 定义一个getter ,setter在里面做这个事。


