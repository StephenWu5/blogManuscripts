[TOC]

## stylus--选择器

#### 缩排和省略花括号，甚至是冒号
注意： 花括号可以写，可以不写，一写就全写，不写就全不写。

```
body
    color white

body {
color: #fff;
}
```

#### 规则集

可以使用逗号或者换行为多个选择器定义属性。

```
textarea, input
  border 1px solid #eee

textarea,
input {
  border: 1px solid #eee;
}
```

该规则唯一例外的就是长的像属性的选择器，例如下方的`foo bar baz`，可能是个属性。
解决就是在尾部加个逗号啦。

```
foo bar baz
> input
  border 1px solid

foo bar baz,
form input,
> a
  border 1px solid
```

####  父级引用
使用`&`这个符号

下面这个例子，IE浏览器利用父级引用和混入书写实现`2px`的边框。

```
 box-shadow()
    -webkit-box-shadow arguments
    -moz-box-shadow arguments
    box-shadow arguments
    html.ie8 &,
    html.ie7 &,
    html.ie6 &
      border 2px solid arguments[length(arguments) - 1]

  body
    #login
      box-shadow 1px 1px 3px #eee

body #login {
    -webkit-box-shadow: 1px 1px 3px #eee;
    -moz-box-shadow: 1px 1px 3px #eee;
    box-shadow: 1px 1px 3px #eee;
  }
  html.ie8 body #login,
  html.ie7 body #login,
  html.ie6 body #login {
    border: 2px solid #eee;
  }
```

####  取消歧义

使用包裹表达式取消负号的歧义

```
pad(n)
  padding (- n)

body
  pad(5px)


body {
  padding: -5px;
}
```

如果有`stylus`无法处理的属性值，使用`unquote`来解决

## stylue--变量

#### 变量

指定表达式为变量

```
font-size = 14px
body
  font font-size Arial, sans-seri

body {
  font: 14px Arial, sans-serif;
}
```

变量也可以是表达式

```
font-size = 14px
font = font-size "Lucida Grande", Arial

body
  font font sans-serif


body {
  font: 14px "Lucida Grande", Arial sans-serif;
}
```

变量名也可以带`$`这个符号

```
body {
  font: 14px "Lucida Grande", Arial sans-serif;
}
```

#### 属性查找

Stylus有个功能，不需要分配给变量就可以引用属性。

```
#logo
  position: absolute
  top: 50%
  left: 50%
  width: w = 150px
  height: h = 80px
  margin-left: -(w / 2)
  margin-top: -(h / 2)


#logo
  position: absolute
  top: 50%
  left: 50%
  width: 150px
  height: 80px
  margin-left: -(@width / 2)
  margin-top: -(@height / 2)
```

也可以按照条件来分配属性。

```
position()
  position: arguments
  z-index: 1 unless @z-index

#logo
  z-index: 20
  position: absolute

#logo2
  position: absolute
```

属性会向上冒泡，直到被发现，下面这个例子, '@color'变成`blue`

```
body
    color: red
    ul
        li
            color: blue
                a
                    background-color: @color
```

## stylus--插值

#### 插值

支持`{}`表达式来插入值，然后组成一个新的标识符。比如私有前缀拓展哈。

```
vendor(prop, args)
  -webkit-{prop} args
  -moz-{prop} args
  {prop} args

border-radius()
  vendor('border-radius', arguments)

box-shadow()
  vendor('box-shadow', arguments)

button
  border-radius 1px 2px / 3px 4px


button {
  -webkit-border-radius: 1px 2px / 3px 4px;
  -moz-border-radius: 1px 2px / 3px 4px;
  border-radius: 1px 2px / 3px 4px;
}
```

#### 选择器插值

插值也可以使用在选择器上，指定前几行的高度

```
table
  for row in 1 2 3 4 5
    tr:nth-child({row})
      height: 10px * row


table tr:nth-child(1) {
    height: 10px;
}
table tr:nth-child(2) {
    height: 20px;
}
table tr:nth-child(3) {
    height: 30px;
}
table tr:nth-child(4) {
    height: 40px;
}
table tr:nth-child(5) {
    height: 50px;
}
```

## stylus--运算符

#### 和大多数运算符一样，一元表达式，二元表达式，三元表达式，下标表达式
#### 范围 .. ...
```
1..5
// => 1 2 3 4 5

1...5
// => 1 2 3 4
```
#### + - * %　**   (最后一个是指数)

#### 逻辑表达式  && ||  (end  or)

```
5 && 3
// => 3

0 || 5
// => 5

0 && 5
// => 0

#fff is a 'rgba' and 15 is a 'unit'
// => true
```

#### 存在操作符 in
检查左边内容是否在右边的表达式

```
nums = 1 2 3
1 in nums
// => true

5 in nums
// => false
```

```
words = foo bar baz
bar in words
// => true

HEY in words
// => false
```

元组同样使用，啥是元祖，都忘记了。

```
vals = (error 'one') (error 'two')
error in vals
// => false

(error 'one') in vals
// => true

(error 'two') in vals
// => true

(error 'something') in vals
// => false
```

混合书写适用例子：

```
pad(types = padding, n = 5px)
  if padding in types
    padding n
  if margin in types
    margin n

body
  pad()

body
  pad(margin)

body
  pad(padding margin, 10px)


//生成
body {
  padding: 5px;
}
body {
  margin: 5px;
}
body {
  padding: 10px;
  margin: 10px;
}
```

实例检查 `is a`
Stylus提供一个二元运算符叫做is a, 用做类型检查。
```
15 is a 'unit'
// => true

#fff is a 'rgba'
// => true

15 is a 'rgba'
// => false
```

变量定义 ： is defined 

```
foo is defined
// => false

foo = 15px
foo is defined
// => true

#fff is defined
// => 'invalid "is defined" check on non-variable #fff'
```

另外可以利用`look up(name)`方法进行动态查找。

```
name = 'blue'
lookup('light-' + name)
// => null

light-blue = #80e2e9
lookup('light-' + name)
// => #80e2e9
```

#### 铸造

unit方法可以用来强制后缀。

```
body
  n = 5
  foo: (n)em
  foo: (n)%
  foo: (n + 5)%
  foo: (n * 5)px
  foo: unit(n + 5, '%')
  foo: unit(5 + 180 / 2, deg)
```

#### 颜色操作

```
#0e0 + #0e0
// => #0f0

#888 + 50%
// => #c3c3c3

#888 - 50%
// => #444

#f00 + 50deg
// => #ffd500
```

#### 格式化字符串

格式化字符串模样的字符串`%`可以用来生成字面量值，通过传参给s()方法。

```
'X::Microsoft::Crap(%s)' % #fc0
// => X::Microsoft::Crap(#fc0)

```

多个值的处理

```
'-webkit-gradient(%s, %s, %s)' % (linear (0 0) (0 100%))
// => -webkit-gradient(linear, 0 0, 0 100%)
```


## 混合书写(Mixins)

#### 混入

混入和函数定义方法一直，应用却不一样。

```
border-radius(n)
  -webkit-border-radius n
  -moz-border-radius n
  border-radius n

form input[type=button]
  border-radius(5px)


//编译后
form input[type=button] {
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
```

#### 父级引用

混合书写可以利用父级引用字符&, 继承父业而不是自己筑巢。

```
stripe(even = #fff, odd = #eee)
 tr
   background-color odd
   &.even
   &:nth-child(even)
       background-color even


table
  stripe()
  td
    padding 4px 10px

table#users
  stripe(#303030, #494848)
  td
    color white
``` 

如果愿意，也可以把`stripe()` 当属性来使用、

#### 混合书写中的混合书写

```
inline-list()
  li
    display inline

comma-list()
  inline-list()
  li
    &:after
      content ', '
    &:last-child:after
      content ''

ul
  comma-list(
```

```
ul li:after {
  content: ", ";
}
ul li:last-child:after {
  content: "";
}
ul li {
  display: inline;
}
```




d
