vue官网2.0--可复用性 & 组合--自定义指令

### 简介

默认指令有`v-model`和`v-show`; 注册允许自定义指令。

全局

```
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```

局部

```
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
```
使用如下

```
<input v-focus>
```

### 钩子函数

一个指令定义对象提供几个钩子函数。

`el`: 可以直接操作DOM;
`binding`: 一个对象，有`name`和`value`等丰富属性；
`vnode`: Vue生成的虚拟节点；
`oldVnode`: 上一个虚拟节点；

```
//一个例子
<div id="hook-arguments-example" v-demo:foo.a.b="message"></div>


Vue.directive('demo', {
  bind: function (el, binding, vnode) {
    var s = JSON.stringify
    el.innerHTML =
      'name: '       + s(binding.name) + '<br>' +
      'value: '      + s(binding.value) + '<br>' +
      'expression: ' + s(binding.expression) + '<br>' +
      'argument: '   + s(binding.arg) + '<br>' +
      'modifiers: '  + s(binding.modifiers) + '<br>' +
      'vnode keys: ' + Object.keys(vnode).join(', ')
  }
})

new Vue({
  el: '#hook-arguments-example',
  data: {
    message: 'hello!'
  }
})
:
```
>name: "demo"
>value: "hello!"
>expression: "message"
>argument: "foo"
>modifiers: {"a":true,"b":true}
>vnode keys: tag, data, children, text, elm, ns, context, fnContext, fnOptions, fnScopeId, key, componentOptions, componentInstance, parent, raw, isStatic, isRootInsert, isComment, isCloned, isOnce, asyncFactory, asyncMeta, isAsyncPlaceholder


### 动态指令参数

指令的参数是动态的。`v-mydirective:[argument]="value"`中，`argument`参数可以根据组件实例数据进行更新，使得自定义指令可以灵活使用。


```
//实时更新是亮点
<div id="dynamicexample">
  <h3>Scroll down inside this section ↓</h3>
  <p v-pin:[direction]="200">I am pinned onto the page at 200px to the left.</p>
</div>


Vue.directive('pin', {
  bind: function (el, binding, vnode) {
    el.style.position = 'fixed'
    var s = (binding.arg == 'left' ? 'left' : 'top')
    el.style[s] = binding.value + 'px'
  }
})

new Vue({
  el: '#dynamicexample',
  data: function () {
    return {
      direction: 'left'
    }
  }
})
```


### 函数的缩写

`bind`和`update`钩子可以如下缩写：

```
Vue.directive('color-swatch', function (el, binding) {
  el.style.backgroundColor = binding.value
})
```

### 对象字面量

如果指令需要多个值，可以传入一个 JavaScript 对象字面量。支持所有合法的 JavaScript 表达式。

```
<div v-demo="{ color: 'white', text: 'hello!' }"></div>


Vue.directive('demo', function (el, binding) {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text)  // => "hello!"
})
```




