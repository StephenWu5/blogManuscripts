##  vue官网--过渡 & 动画

### 一、进入/离开 & 列表过渡

#### 概述

vue 在插入，更新或者移除Dom时，可以应用过渡效果。

#### 单元素/组件的过渡（利用transition组件）

1. 条件渲染 (使用 v-if)
2. 条件展示 (使用 v-show)
3. 动态组件
4. 组件根节点

```
<div id="demo">
  <button v-on:click="show = !show">
    Toggle
  </button>
  <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
</div>

new Vue({
  el: '#demo',
  data: {
    show: true
  }
})

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
```

在插入transition组件时，Vue将做如下的处理：

1. 自动嗅探目标元素是否应用了 CSS 过渡或动画，如果是，在恰当的时机添加/删除 CSS 类名。

2. 如果过渡组件提供了 JavaScript 钩子函数，这些钩子函数将在恰当的时机被调用。

3. 如果没有找到 JavaScript 钩子并且也没有检测到 CSS 过渡/动画，DOM 操作 (插入/删除) 在下一帧中立即执行。(注意：此指浏览器逐帧动画机制，和 Vue 的 nextTick 概念不同)

#### 过渡的类名

6个类名： `v-enter, v-enter-active,v-enter-to,v-leave,v-leave-active,v-leave-to`
理解主要看一下那张流程图就可以了。

#### css过渡(最常用)

类名就是`transition`通过`name`属性来添加的

#### css动画

css动画用法同css过渡，区别是在动画中`v-enter`在节点插入Dom不会立刻删除，而是在`animationend`事情触发时删除。

```
<div id="example-2">
  <button @click="show = !show">Toggle show</button>
  <transition name="bounce">
    <p v-if="show">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis enim libero, at lacinia diam fermentum id. Pellentesque habitant morbi tristique senectus et netus.</p>
  </transition>
</div>

new Vue({
  el: '#example-2',
  data: {
    show: true
  }
})

.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
```

#### 自定义过渡的类名

（其实就是6个类名，）,可以结合`Animate.css`来使用哈。自己想用啥就用啥哈。

```
<link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">

<div id="example-3">
  <button @click="show = !show">
    Toggle render
  </button>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated tada"
    leave-active-class="animated bounceOutRight"
  >
    <p v-if="show">hello</p>
  </transition>
</div>

```

#### 同时使用过渡和动画

vue 过渡相关的事件监听器，可以是`transitionend` 或者 `animationend`,vue里面有自动识别和监听。

开发也可以使用`type`来设置`animation`或者`transition`啦。

#### 过渡时间

```
<transition :duration="1000">...</transition>
```

或者详细点

```
<transition :duration="{ enter: 500, leave: 800 }">...</transition>
```

#### javascript钩子函数

其实就是类似于vue生命周期。

```
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"

  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>

// ...
methods: {
  // --------
  // 进入中
  // --------

  beforeEnter: function (el) {
    // ...
  },
  // 当与 CSS 结合使用时
  // 回调函数 done 是可选的
  enter: function (el, done) {
    // ...
    done()
  },
  afterEnter: function (el) {
    // ...
  },
  enterCancelled: function (el) {
    // ...
  },

  // --------
  // 离开时
  // --------

  beforeLeave: function (el) {
    // ...
  },
  // 当与 CSS 结合使用时
  // 回调函数 done 是可选的
  leave: function (el, done) {
    // ...
    done()
  },
  afterLeave: function (el) {
    // ...
  },
  // leaveCancelled 只用于 v-show 中
  leaveCancelled: function (el) {
    // ...
  }
}
```

> 推荐对于仅使用 JavaScript 过渡的元素添加 v-bind:css="false"，Vue 会跳过 CSS 的检测。这也可以避免过渡过程中 CSS 的影响。 

#### 初始渲染的过渡

可以通过`appear`特性设置节点在初始渲染的过渡。 

这里默认和进入/离开过渡一样，同样也可以自定义 CSS 类名。 


```
<transition
  appear
  appear-class="custom-appear-class"
  appear-to-class="custom-appear-to-class" (2.1.8+)
  appear-active-class="custom-appear-active-class"
>
  <!-- ... -->
</transition>
```

或者自定义 JavaScript 钩子：

```
<transition
  appear
  v-on:before-appear="customBeforeAppearHook"
  v-on:appear="customAppearHook"
  v-on:after-appear="customAfterAppearHook"
  v-on:appear-cancelled="customAppearCancelledHook"
>
  <!-- ... -->
</transition>
```

#### 多个元素的过渡（这个用的好少）

需要设置`key`特性唯一标记来区分。

```
//最简单的例子
<transition>
  <button v-if="isEditing" key="save">
    Save
  </button>
  <button v-else key="edit">
    Edit
  </button>
</transition>
```

#### 过渡模式

其实就是给`transition` 添加一个简单特性。`mode`

1. in-out：新元素先进行过渡，完成之后当前元素过渡离开。
2. out-in：当前元素先进行过渡，完成之后新元素过渡进入。

```
<transition name="fade" mode="out-in">
  <!-- ... the buttons ... -->
</transition>
```

### 二、多个组件的过渡

多个组件的过渡简单，只要利用**动态组件**就可以了。

```
<transition name="component-fade" mode="out-in">
  <component v-bind:is="view"></component>
</transition>

new Vue({
  el: '#transition-components-demo',
  data: {
    view: 'v-a'
  },
  components: {
    'v-a': {
      template: '<div>Component A</div>'
    },
    'v-b': {
      template: '<div>Component B</div>'
    }
  }
})

.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
```

### 三、列表过渡(用的很少，可以忽略)

利用`transition-group`组件完成，内部需要一个`span`元素，提供一个`key`的值，过渡的类需要添加到`span`上，而不是容器本身

```
<div id="list-demo" class="demo">
  <button v-on:click="add">Add</button>
  <button v-on:click="remove">Remove</button>
  <transition-group name="list" tag="p">
    <span v-for="item in items" v-bind:key="item" class="list-item">
      {{ item }}
    </span>
  </transition-group>
</div>
```

以后有需要再弄

















