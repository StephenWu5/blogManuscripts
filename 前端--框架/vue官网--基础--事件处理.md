#### 事件修饰符

`.stop`防止事件传播
`.prevent`阻止表单默认事件
`.capture`使用事件捕获模式
`.self`自身触发，不能由内部事件触发
`.onec`单击时间只触发一次
`.passive`告诉浏览器触发默认事件吧

```javascript
<!--阻止单击时间传播-->
<a v-on:click.stop="doThis"></a>
<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即元素自身触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
```

#### 按键修饰符

enter, page-down 

```javascript
<!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
<input v-on:keyup.enter="submit">

<input v-on:keyup.page-down="onPageDown">
```

#### 按键码（keyCod）

更多按键名请看官网那里

```javascript
<input v-on:keyup.13="submit">
```

> 你还可以通过全局 config.keyCodes 对象自定义按键修饰符别名：

```javascript
// 可以使用 `v-on:keyup.f1`
Vue.config.keyCodes.f1 = 112
```

#### 系统修饰键

这个功能就把页面搞的和应用，编辑器一个样子了。

`.ctrl`, `.alt`, `.shift`,`.meta`  

`.exact`修饰符允许你控制由精确的系统修饰符组合触发的事件。  

```javascript
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button @click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button @click.exact="onClick">A</button>
```

#### 鼠标修饰符

我猜用不到，不看也罢。

#### vue 时间监听的好处

`v-on`

1. 可以在代码里快速的找到对应的方法。
2. 无需操作Dom，手动绑定事件，快速写代码，关注业务逻辑。
3. 清理事件这个事情不用开发者做，`vue`帮你做。
