##  三、循环引用

### #递归组件

组件是可以在它们自己的模版中调用自身的。不过它们是通过`name`来做这件事：

```
name: 'unique-name-of-my-component'
```

如果有不小心的时候，你就会写出无限循环：

```
name: 'stack-overflow',
template: '<div><stack-overflow></stack-overflow></div>'
```

也就是`max stack size exceeded`类似的错误，所以请确保递归调用是有条件的（就是最后的那个最终会得到`false`的`v-if`）。

### 组件之前的循环引用

```
//A模版
// name 为  <tree-folder>
<p>
  <span>{{ folder.name }}</span>
  <tree-folder-contents :children="folder.children"/>
</p>
```

```
//B模版
//name 为 <tree-folder-contents>
<ul>
  <li v-for="child in children">
    <tree-folder v-if="child.children" :folder="child"/>
    <span v-else>{{ child.name }}</span>
  </li>
</ul>
```

组件之前相互调用，看去来很矛盾。所以把一个组件看成一个点时，第二个组件的注册时间注册对就可以了。

```
beforeCreate: function () {
  this.$options.components.TreeFolderContents = require('./tree-folder-contents.vue').default
}
```
或者在本地注册组件的时候，使用`webpack`的异步`import`就可以了。

```
components: {
  TreeFolderContents: () => import('./tree-folder-contents.vue')
}
```

这一块的应用场景应该是不大啊。


## 四、模版定义的替代品

### #内联模版

其实就是允许你在#app这个标签内使用一个组件的内容作为组件的`template`的内容，改变一下template的书写地方而已。
```
<my-component inline-template>
  <div>
    <p>These are compiled as the component's own template.</p>
    <p>Not parent's transclusion content.</p>
  </div>
</my-component>
```

> 警告
> 不过，inline-template 会让模板的作用域变得更加难以理解。所以作为最佳实践，请在组件内优先选择 template 选项或 .vue 文件里的一个 <template> 元素来定义模板。

### X-Template

这个其实就是允许你把模版的内容写在`script`元素的内部，因为有时候，你的元素内容写在`html`那里非常的不好看，因为它们内容复杂。

```
//例子
<script type="text/x-template" id="hello-world-template">
  <p>Hello hello hello</p>
</script>

Vue.component('hello-world', {
  template: '#hello-world-template'
})
```

> 可以应用于模版特别大或者极小的应用，但是能不用就不用，因为和其他定义看起来，会很乱。

### 五、控制更新

强制更新

利用一个方法`$forceUpdate `就可以了。

`v-once`创建一个少开销的静态组件，在这个组件的根组件添加`v-once`确保只渲染一次，而不是多次。哈。




