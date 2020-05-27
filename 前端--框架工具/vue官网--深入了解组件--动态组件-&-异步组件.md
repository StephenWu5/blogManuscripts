
### 在动态组件中使用`keep-alive` （动态组件）

在多标签界面中使用`is`来切换不同的组件
```
<component v-bind:is="currentTabComponent"></component>
```

`keep-alive`标签可以将动态组件包裹起来。失效的组件可以缓存起来。

### 异步组件

Vue 允许你以一个工厂函数的方式定义你的组件，这个工厂函数会异步解析你的组件定义。

支持异步渲染，提高页面渲染效率

演示代码如下：
```
Vue.component(
  'async-webpack-example',
  // 这个 `import` 函数会返回一个 `Promise` 对象。
  () => import('./my-async-component')
)
```

> 2.3.0+ 新增的内容

工厂函数可以使用如下格式

```
const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('./MyComponent.vue'),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})
```



