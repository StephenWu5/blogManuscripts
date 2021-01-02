###  一、 Avatar 头像 
1. shape指的是型状
  ```
<template>
  <div>
    <div>
      <pax-avatar :size="64" icon="user" />
      <pax-avatar size="large" icon="user"/>
      <pax-avatar icon="user"/>
      <pax-avatar size="small" icon="user"/>
    </div>
    <br/>
    <div>
      <pax-avatar shape="square" :size="64" icon="user" />
      <pax-avatar shape="square" size="large" icon="user" />
      <pax-avatar shape="square" icon="user" />
      <pax-avatar shape="square" size="small" icon="user" />
    </div>
  </div>
</template>

```
2. 带徽标的头像
```
<template>
  <div>
    <span style="margin-right:24px">
      <pax-badge :count="1"><pax-avatar shape="square" icon="user" /></pax-badge>
    </span>
    <span>
      <pax-badge dot><pax-avatar shape="square" icon="user" /></pax-badge>
    </span>
  </div>
</template>
```

3. 可以支持图片，icon以及字符，可以修改背景图片和背景色。

```
<template>
  <div>
    <pax-avatar icon="user" />
    <pax-avatar>U</pax-avatar>
    <pax-avatar>USER</pax-avatar>
    <pax-avatar src="static/ODTLcjxAfvqbxHnVXCYX.png" />
    <pax-avatar style="color: #f56a00; backgroundColor: #fde3cf">U</pax-avatar>
    <pax-avatar style="backgroundColor:#87d068" icon="user" />
  </div>
</template>
```
4. 自动调整字符大小

当字符串特别大时，头像不变，字体大小变化。
```
<template>
  <div>
    <pax-avatar shape="square" size="large" :style="{backgroundColor: color, verticalAlign: 'middle'}">{{avatarValue}}</pax-avatar>
    <pax-button size="small" :style="{ marginLeft: 16, verticalAlign: 'middle' }" @click="changeValue">改变</pax-button>
  </div>
</template>
<script>
  const UserList = ['U', 'Lucy', 'Tom', 'Edward']
  const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae']
  export default {
    data () {
      return {
        avatarValue: UserList[0],
        color: colorList[0],
      }
    },
    methods: {
      changeValue () {
        const index = UserList.indexOf(this.avatarValue)
        this.avatarValue = index < UserList.length - 1 ? UserList[index + 1] : UserList[0]
        this.color = index < colorList.length - 1 ? colorList[index + 1] : colorList[0]
      },
    },
  }
</script>
```

 5. 相关的API 看官网

###  二、Badge微标数

一般用于显示要处理的消息数量，就类似手机那样子。

1. 代码显示
当`count`为0时，使用`showZero`协助显示，否则不显示。
```
<template>
  <div>
    <pax-badge count="5">
      <a href="#" class="head-example"></a>
    </pax-badge>
    <pax-badge count="0" showZero>
      <a href="#" class="head-example"></a>
    </pax-badge>
    <pax-badge>
      <pax-icon slot="count" type="clock-circle" style="color: #f5222d" />
      <a href="#" class="head-example"></a>
    </pax-badge>
  </div>
</template>
```
2.  可以独立使用，什么标签都不放，当作样式来使用。

```
<template>
  <div>
    <pax-badge count="25" />
    <pax-badge count="4" :numberStyle="{backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset'}" />
    <pax-badge count="109" :numberStyle= "{backgroundColor: '#52c41a'} " />
  </div>
</template>
```
3. 封顶数字 就是说，超过这个数字，就会显示`+`结尾。

```
<template>
  <div>
    <pax-badge :count="99">
      <a href="#" class="head-example"></a>
    </pax-badge>
    <pax-badge :count="100">
      <a href="#" class="head-example"></a>
    </pax-badge>
    <pax-badge :count="99" :overflowCount="10">
      <a href="#" class="head-example"></a>
    </pax-badge>
    <pax-badge :count="1000" :overflowCount="999">
      <a href="#" class="head-example"></a>
    </pax-badge>
  </div>
</template>
```
4. 可以显示为一个小红点（内部没有具体的数字）

```
<template>
<div id="components-badge-demo-dot">
  <pax-badge dot>
    <pax-icon type="notification" />
  </pax-badge>
  <pax-badge :count="0" dot>
    <pax-icon type="notification" />
  </pax-badge>
  <pax-badge dot>
    <a href="#">Link something</a>
  </pax-badge>
</div>
</template>
<style scoped>
#components-badge-demo-dot .anticon-notification {
  width: 16px;
  height: 16px;
  line-height: 16px;
  font-size: 16px;
}
</style>
```
小红点可以修改不同的颜色，以表示不同的状态。
```
<template>
  <div>
    <pax-badge status="success" />
    <pax-badge status="error" />
    <pax-badge status="default" />
    <pax-badge status="processing" />
    <pax-badge status="warning" />
    <br />
    <pax-badge status="success" text="Success" />
    <br />
    <pax-badge status="error" text="Error" />
    <br />
    <pax-badge status="default" text="Default" />
    <br />
    <pax-badge status="processing" text="Processing" />
    <br />
    <pax-badge status="warning" text="warning" />
  </div>
</template>
```
5.  显示动态效果
```
<template>
  <div>
    <div>
      <pax-badge :count="count">
        <a href="#" class="head-example" />
      </pax-badge>
      <pax-button-group>
        <pax-button @click="decline">
          <pax-icon type="minus" />
        </pax-button>
        <pax-button @click="increase">
          <pax-icon type="plus" />
        </pax-button>
      </pax-button-group>
    </div>
    <div style="margin-top: 10px">
      <pax-badge :dot="show">
        <a href="#" class="head-example" />
      </pax-badge>
      <pax-switch v-model="show" />
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      count: 5,
      show: true,
    }
  },
  methods: {
    decline () {
      let count = this.count - 1
      if (count < 0) {
        count = 0
      }
      this.count = count
    },
    increase () {
      this.count++
    },
  }
}
</script>
```
6. 显示鼠标hover时的文字

```
<template>
  <div id="components-badge-demo-title">
    <pax-badge :count="5" title="Custom hover text">
      <a href="#" class="head-example" />
    </pax-badge>
  </div>
</template>
<style scoped>
#components-badge-demo-title .pax-badge:not(.pax-badge-status) {
  margin-right: 20px;
}
.head-example {
  width: 42px;
  height: 42px;
  border-radius: 4px;
  background: #eee;
  display: inline-block;
}
</style>
```
6. API看官网

### 三、日历（咱不看）

### 四、Card卡片

1. 后台概览页面
```
<template>
  <pax-card title="Card Title">
    <a href="#" slot="extra">more</a>
    <p>card content</p>
    <p>card content</p>
    <p>card content</p>
  </pax-card>
</template>
```
2. 利用 `Card.Meta`把文字显示在下面
```
<template>
<pax-card
  hoverable
  style="width: 240px"
>
  <img
    alt="example"
    src="static/QBnOOoLaAfKPirc.png"
    slot="cover"
  />
  <pax-card-meta
    title="Europe Street beat">
    <template slot="description">www.instagram.com</template>
  </pax-card-meta>
</pax-card>
</template>
```
3. 网格内嵌卡片
```
<template>
<pax-card title="Card Title">
  <pax-card-grid style="width:25%;textAlign:'center'">Content</pax-card-grid>
  <pax-card-grid style="width:25%;textAlign:'center'">Content</pax-card-grid>
  <pax-card-grid style="width:25%;textAlign:'center'">Content</pax-card-grid>
  <pax-card-grid style="width:25%;textAlign:'center'">Content</pax-card-grid>
  <pax-card-grid style="width:25%;textAlign:'center'">Content</pax-card-grid>
  <pax-card-grid style="width:25%;textAlign:'center'">Content</pax-card-grid>
  <pax-card-grid style="width:25%;textAlign:'center'">Content</pax-card-grid>
</pax-card>
</template>
```
4. 栅格卡片
卡片可以与栅格配合使用。
```
<template>
  <div style="background-color: #ececec; padding: 20px;">
    <pax-row :gutter="16">
      <pax-col :span="8">
        <pax-card title="Card title" :bordered=false>
          <p>card content</p>
        </pax-card>
      </pax-col>
      <pax-col :span="8">
        <pax-card title="Card title" :bordered=false>
          <p>card content</p>
        </pax-card> 
      </pax-col>
      <pax-col :span="8">
        <pax-card title="Card title" :bordered=false>
          <p>card content</p>
        </pax-card>   
      </pax-col>
    </pax-row>
  </div>
</template>
```

