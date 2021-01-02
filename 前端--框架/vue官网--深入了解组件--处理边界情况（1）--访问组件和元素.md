### 访问元素/组件
1. 访问根组件
所有的子组件都可以将这个实例当作一个全局`store`来使用

```
// 获取根组件的数据
this.$root.foo

// 写入根组件的数据
this.$root.foo = 2

// 访问根组件的计算属性
this.$root.bar

// 调用根组件的方法
this.$root.baz()
```
2. 访问父组件
`$parent`可以从里面子组件那里快速的访问父组件，让您随时抵达父组件。

3. 访问父组件和或者子元素

你可以通过 ref 特性为这个子组件赋予一个 ID 引用，在javascript里面直接访问子组件。
```
<base-input ref="usernameInput"></base-input>
//this.$refs.usernameInput
```
可以直接访问子组件里面的方法。
当 ref 和 v-for 一起使用的时候，你得到的引用将会是一个包含了对应数据源的这些子组件的数组。
> 注意点：$refs 只会在组件渲染完成之后生效，并且它们不是响应式的。这仅作为一个用于直接操作子组件的“逃生舱”——你应该避免在模板或计算属性中访问 $refs。

4. 依赖注入
```javascript  
<google-map>
  <google-map-region v-bind:shape="cityBoundaries">
    <google-map-markers v-bind:places="iceCreamShops"></google-map-markers>
  </google-map-region>
</google-map>
```
在这这个例子中，`google-map`的后代都需要访问一个this.getMap方法，**但是`$parent`有无法兼顾多层组件**，所以的话就有更深层的的**依赖注入**： provide 和 inject。
```
//父组件中定义
provide: function () {
  return {
    getMap: this.getMap
  }
}
//任何后代组件中使用
//然后在任何后代组件里，我们都可以使用 inject 选项来接收指定的我们想要添加在这个实例上的属性：
inject: ['getMap']，

```

依赖注入有2个特点：
  1. 祖先组件不需要知道哪些后代组件使用它提供的属性；
  2. 后代组件不需要知道被注入的属性来自哪里。


