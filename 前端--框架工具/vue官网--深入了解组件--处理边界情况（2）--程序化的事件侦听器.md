###  程序化的事件侦听器

vue的$emit的用法，它可以被`v-on`侦听，除了以上这些，我们可以使用： 
1. 通过 `$on(eventName, eventHandler)` 侦听一个事件
2. 通过 `$once(eventName, eventHandler)` 一次性侦听一个事件
3. 通过 `$off(eventName, eventHandler) `停止侦听一个事件

下面是集成第三方库的模式：
```
// 一次性将这个日期选择器附加到一个输入框上
// 它会被挂载到 DOM 上。
mounted: function () {
  // Pikaday 是一个第三方日期选择器的库
  this.picker = new Pikaday({
    field: this.$refs.input,
    format: 'YYYY-MM-DD'
  })
},
// 在组件被销毁之前，
// 也销毁这个日期选择器。
beforeDestroy: function () {
  this.picker.destroy()
}
```
上面的代码有2个问题：1. 最好的是只有生命周期钩子可以访问到它，否则视为杂物；2. 我们很难的程序化的清理我们建立的东西，最好是程序化的侦听器清理我们建立的实例。

一次实例：
```
mounted: function () {
  var picker = new Pikaday({
    field: this.$refs.input,
    format: 'YYYY-MM-DD'
  })

  this.$once('hook:beforeDestroy', function () {
    picker.destroy()
  })
}
```
多个实例：

```
mounted: function () {
  this.attachDatepicker('startDateInput')
  this.attachDatepicker('endDateInput')
},
methods: {
  attachDatepicker: function (refName) {
    var picker = new Pikaday({
      field: this.$refs[refName],
      format: 'YYYY-MM-DD'
    })

    this.$once('hook:beforeDestroy', function () {
      picker.destroy()
    })
  }
}
```
>注意点： 注意 Vue 的事件系统不同于浏览器的 [EventTarget API](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget)。尽管它们工作起来是相似的，但是 `$emit`、`$on`, 和 `$off` 并不是 `dispatchEvent`、`addEventListener` 和 `removeEventListener` 的别名。
