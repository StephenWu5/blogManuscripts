### 一、Grid 栅格
1. 概念
使用如下：
  ```
1.  通过`row` 创建一行；
2.  每一下的内容放在`col`里面；
3. 跨越的范围是1到24的值，如果一行的每个内容的总和超过24，那么就会另起一行。
  ```
2. 布局支持Flex布局
特点是，支持子元素在父节点内的水平对齐方式（居左，居中，居右），也支持子元素之间的对齐方式（顶部对齐，底部对齐，垂直居中对齐）。同时支持元素之间的排列顺序。
```
//使用方法如下：
<template>
  <div>
    <p>Align Top</p>
    <a-row type="flex" justify="center" align="top">
      <a-col :span="4"><p class="height-100">col-4</p></a-col>
      <a-col :span="4"><p class="height-50">col-4</p></a-col>
      <a-col :span="4"><p class="height-120">col-4</p></a-col>
      <a-col :span="4"><p class="height-80">col-4</p></a-col>
    </a-row>

    <p>Align Center</p>
    <a-row type="flex" justify="space-around" align="middle">
      <a-col :span="4"><p class="height-100">col-4</p></a-col>
      <a-col :span="4"><p class="height-50">col-4</p></a-col>
      <a-col :span="4"><p class="height-120">col-4</p></a-col>
      <a-col :span="4"><p class="height-80">col-4</p></a-col>
    </a-row>

    <p>Align Bottom</p>
    <a-row type="flex" justify="space-between" align="bottom">
      <a-col :span="4"><p class="height-100">col-4</p></a-col>
      <a-col :span="4"><p class="height-50">col-4</p></a-col>
      <a-col :span="4"><p class="height-120">col-4</p></a-col>
      <a-col :span="4"><p class="height-80">col-4</p></a-col>
    </a-row>
  </div>
</template>
```
3. flex排序
可以通过`:order="x"`来改变元素的排序。
```
<template>
  <div>
    <p>Align Top</p>
    <a-row type="flex" justify="center" align="top">
      <a-col :span="4"><p class="height-100">col-4</p></a-col>
      <a-col :span="4"><p class="height-50">col-4</p></a-col>
      <a-col :span="4"><p class="height-120">col-4</p></a-col>
      <a-col :span="4"><p class="height-80">col-4</p></a-col>
    </a-row>

    <p>Align Center</p>
    <a-row type="flex" justify="space-around" align="middle">
      <a-col :span="4"><p class="height-100">col-4</p></a-col>
      <a-col :span="4"><p class="height-50">col-4</p></a-col>
      <a-col :span="4"><p class="height-120">col-4</p></a-col>
      <a-col :span="4"><p class="height-80">col-4</p></a-col>
    </a-row>

    <p>Align Bottom</p>
    <a-row type="flex" justify="space-between" align="bottom">
      <a-col :span="4"><p class="height-100">col-4</p></a-col>
      <a-col :span="4"><p class="height-50">col-4</p></a-col>
      <a-col :span="4"><p class="height-120">col-4</p></a-col>
      <a-col :span="4"><p class="height-80">col-4</p></a-col>
    </a-row>
  </div>
</template>

```
4. Flex布局的基础，子元素根据不同的值`start`，`center`，`end`，`space-between`， `between`， `space-around`，定义该布局。
```
<template>
  <div>
    <p>sub-element align left</p>
    <a-row type="flex" justify="start">
      <a-col :span="4">col-4</a-col>
      <a-col :span="4">col-4</a-col>
      <a-col :span="4">col-4</a-col>
      <a-col :span="4">col-4</a-col>
    </a-row>

    <p>sub-element align center</p>
    <a-row type="flex" justify="center">
      <a-col :span="4">col-4</a-col>
      <a-col :span="4">col-4</a-col>
      <a-col :span="4">col-4</a-col>
      <a-col :span="4">col-4</a-col>
    </a-row>

    <p>sub-element align right</p>
    <a-row type="flex" justify="end">
      <a-col :span="4">col-4</a-col>
      <a-col :span="4">col-4</a-col>
      <a-col :span="4">col-4</a-col>
      <a-col :span="4">col-4</a-col>
    </a-row>

    <p>sub-element monospaced arrangement</p>
    <a-row type="flex" justify="space-between">
      <a-col :span="4">col-4</a-col>
      <a-col :span="4">col-4</a-col>
      <a-col :span="4">col-4</a-col>
      <a-col :span="4">col-4</a-col>
    </a-row>

    <p>sub-element align full</p>
    <a-row type="flex" justify="space-around">
      <a-col :span="4">col-4</a-col>
      <a-col :span="4">col-4</a-col>
      <a-col :span="4">col-4</a-col>
      <a-col :span="4">col-4</a-col>
    </a-row>
  </div>
</template>

```
5.  有时候，我们不需要给标签和标签贴的太紧，彼此需要空间，`Row`可以使用`gutter`属性，数值是`16+8n`。也可以支持响应式，具体看官网处：[点击](https://vue.ant.design/components/grid-cn/)
```
<template>
  <div class="gutter-example">
    <a-row :gutter="16">
      <a-col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </a-col>
    </a-row>
  </div>
</template>
<style scoped>
.gutter-example >>> .ant-row > div {
  background: transparent;
  border: 0;
}
.gutter-box {
  background: #00A0E9;
  padding: 5px 0;
}
</style>

```
6. 左右编移效果，`offset`设置编移值，用在`col`标签上。代码如下：
```
<template>
  <div>
    <a-row>
      <a-col :span="8">col-8</a-col>
      <a-col :span="8" :offset="8">col-8</a-col>
    </a-row>
    <a-row>
      <a-col :span="6" :offset="6">col-6 col-offset-6</a-col>
      <a-col :span="6" :offset="6">col-6 col-offset-6</a-col>
    </a-row>
    <a-row>
      <a-col :span="12" :offset="6">col-12 col-offset-6</a-col>
    </a-row>
  </div>
</template>

```
7. `a-col`标签通过`xs` `sm` `sm` `md` `lg` `xl` `xxl` 来添加一个对象，对象里面有`order` `span` `pull` `push`  `offset` 等等。
```
<template>
  <a-row>
    <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">Col</a-col>
    <a-col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }">Col</a-col>
    <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">Col</a-col>
  </a-row>
</template>

```
8. 相应式布局
```
<template>
  <a-row>
    <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="10">Col</a-col>
    <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="4">Col</a-col>
    <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="10">Col</a-col>
  </a-row>
</template>

```
9.  栅格排序（列排序）通过`push` 和`pull`可以快速改变列的顺序。
```
<template>
  <div>
    <a-row>
      <a-col :span="18" :push="6">col-18 col-push-6</a-col>
      <a-col :span="6" :pull="18">col-6 col-pull-18</a-col>
    </a-row>
  </div>
</template>

```

10. 难度最大，有兴趣在去看一下吧。代码挺多的，其实就是帮助理解栅格这一部分内容的。
```
<template>
  <div id="components-grid-demo-playground">
    <div style="marginBottom:16px">
      <span style="marginRight:6px">Gutter (px): </span>
      <div style="width:50%">
        <a-slider
          :min="0"
          :max="Object.keys(gutters).length - 1"
          v-model="gutterKey"
          :marks="this.gutters"
          :step="null"
        />
      </div>
      <span style="marginRight:6px">Column Count:</span>
      <div style="width:50%">
        <a-slider
          :min="0"
          :max="Object.keys(colCounts).length - 1"
          v-model="colCountKey"
          :marks="this.colCounts"
          :step="null"
        />
      </div>
    </div>
    <a-row :gutter="gutters[gutterKey]">
      <a-col v-for="(item, index) in colCounts[colCountKey]" :key="item.toString()" :span="24/colCounts[colCountKey]">
        <div>Column</div>
      </a-col>
    </a-row>
    <pre v-text="rowColHtml">
    </pre>
  </div>
</template>
<script>
  export default {
    data () {
      const gutters = {}
      const arr = [8, 16, 24, 32, 40, 48]
      arr.forEach((value, i) => { gutters[i] = value; })
      const colCounts = {}
      const arr1 = [2, 3, 4, 6, 8, 12]
      arr1.forEach((value, i) => { colCounts[i] = value; })
      return {
        gutterKey: 1,
        colCountKey: 2,
        colCounts,
        gutters,
      }
    },
    computed: {
      rowColHtml() {
        const colCount = this.colCounts[this.colCountKey]
        const getter = this.gutters[this.gutterKey]
        let colCode = '<Row :gutter="' + getter + '">\n'
        for (let i = 0; i < colCount; i++) {
          const spanNum = 24 / colCount
          colCode += '  <Col :span="' + spanNum + '"/>\n'
        }
        colCode += '</Row>'
        return colCode
      }
    },
  }
</script>
<style scoped>
  #components-grid-demo-playground [class^="ant-col-"] {
    background: transparent;
    border: 0;
  }
  #components-grid-demo-playground [class^="ant-col-"] > div {
    background: #00A0E9;
    height: 120px;
    line-height: 120px;
    font-size: 13px;
  }
  #components-grid-demo-playground pre {
    background: #f9f9f9;
    border-radius: 6px;
    font-size: 13px;
    padding: 8px 16px;
  }
</style>

```
### 二、 布局
这一块先不管，等那个前端搞好再弄。


