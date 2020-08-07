# React学习记录

## 前言

最近打算换工作了，因为现在的工作又苦又累，对技术没有什么挑战和提升的帮助，再说，说好的半年加班费也是没有了，公司拿疫情来做挡箭牌。

这一段时间，找工作，部分公司问到React的知识点，大多数React问题回答不好。吓的我一身冷汗。所以找了时间补了一下该知识点。其实也难怪，因为公司用到的框架是vue，React只是简单做过，没有太过经验。

现在前端流行框架是React和vue，就好比支付领域的支付宝和微信。应该短时间不会改变。只会vue不会React的前端不是好前端，会被时代淘汰的。所以啊，还是学一学React的知识哈。

## 哪些知识？

无非就是vue概念的那一套。

React的一些概念：Vue比 React容易，因为 Vue 提供了很多模板语法或属性帮你搞定事情，比如 v-for、v-if、v-model、watch、computed 等。你背下它们的作用就能做事了。

但是 React 比 Vue 单一，因为 React 里面其实只有一个概念，就是函数。React 没有引入任何新的概念（JSX 也只是在写函数而已）。你可以用 JS 的 if 实现 v-if，你可以用 JS 的 for 实现 v-for，你可以用 JS 的 defineProperty 实现 watch，你可以用 JS 的 getter 实现 computed。

如果你把 Vue 给你额外提供的 v-for、v-if、watch 这些特性全部去掉，然后在 Vue 里用 JSX，其实跟 React 差别也不大，但这样就很不 Vue 了呀。你也可能在 React 里面自定义一些 API 来模拟 Vue，那这样就很不 React 了呀。


####  组件

如何定义一个React，组件就是代码的复用，提高代码的维护性，如果不写组件的话，可能在最上的的那个组件就需要多写很多的data,methods之类的。代码维护性不好。这是我在上家公司看到有的同事不会写组件的感悟，又好气又好笑。

声明组件的2种方式：es6类和方法。现在主流的是Es6类的方法。因为简单快捷。


```javascript
import React from 'react'

class Son extends React.Component{
    constructor(props) { //构造函数，初始化props和state的值
        super(props);

        this.state = {   //定义状态值
            strikes: 0,
            count: 0,
        }

        this.timerTick = this.timerTick.bind(this) //这里绑定this是为了让该方法指向实例，否则的话this为undefined了，这是js上下文的内容，不是React的锅。
        this.increase = this.increase.bind(this) //这里绑定this是为了让该方法指向实例
    }

    timerTick(){    //自定义方法1，比起Vue的话，不用写在methods对象里面，自由度高。
        this.setState({
            strikes: this.state.strikes + 100
        })
    }

    increase(){   //自定义方法2
        this.setState({
            count: this.state.count + 1
        })
    }


    componentWillReceiveProps(np){
        console.log('componetwillReceiveprops',np)
        return;
    }


    componentWillMount(){
        console.log('componentWillMount')
    }


    componentDidMount(){
        console.log('componentDidMount')
            //setInterval(this.timerTick, 1000);
    }

    componentWillUnmount(){
        console.log('componentWillUnmount1')
        return;
    }

    shouldComponentUpdate(NP,NS){
        console.log('shouldcomponentUpdate',NP,NS)
        if(NS.strikes <90000){

        return true;
        }else{
            ReactDOM.unmountComponentAtNode(destination);
            return false;
        }
    }

    componentWillUpdate(){
        console.log('componentWillUpdate')
    }

    componentDidUpdate(){
        console.log('componentDidUpdate')
    }

    render(){
        var style1 = {

            color: '#66ffff',
            fontSize: 50,
        }

        var commonStyle = {
            fontSize: 24,
            color: 'red',
        }
        var count = this.state.count.toLocaleString();

        return (
            <div>
                <div>{count}</div>
                <button onClick={this.increase}>+</button>
                    
            </div>
        )
    }
}
```

看过一本基本的React的电子书，React版本是16之前的，它是用creatClass来创建组件的，这个方法在16版本已去除。

三步走起：
1、创建React类。
2、创建React组件元素。
3、创建React组件。

```javascript
var React = require（'react'）；
var ReactDOM = require（'react-dom'）；
var ReactClass = React.createClass（{
render：function（）{
return React.createElement（'h1'，{className：'header'}，'React Component'）；
}
}）；
var reactComponentElement = React.createElement（ReactClass）；
var reactComponent = ReactDOM.render（reactComponentElement，document.
getElementById（'react-application'））；
//你应该对这个例子中的一些代码已经很熟悉了，其余的部分可以分为简单的三步：
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


