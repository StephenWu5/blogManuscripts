## 方法

方法和混合书写一样，多了返回值这一部分。 如果没有写`return`，就默认是最后一个`return`;

```
//定义
add(a, b)
  a + b
//使用
body 
  padding add(10px, 5)

//渲染
body {
  padding: 15px;
}

```

#### 默认参数

可选参数往往有个默认的给定表达。在Stylus中，我们甚至可以超越默认参数。
可以通过`unit()`把每个参数的对应单位改为`px`; 

#### 多个返回值

你可以利用数组的类似取值

```
sizes()
 15px 10px

sizes()[0]
// => 15px
```

#### 条件

也可以写一下if else 语句

#### 别名
```
plus = add

plus(1, 2)
// => 3
```

#### 变量函数

变量函数就是把一个函数当成参数传给一个函数，如下图所示：

```
invoke(a, b, fn)
  fn(a, b)

add(a, b)
  a + b

body
  padding invoke(5, 10, add)
  padding invoke(5, 10, sub)


//渲染
body {
  padding: 15;
  padding: -5;
}
```

#### 参数

`arguments`是所有函数体都有的局部变量，包含传递的所有参数。

```
sum()
  n = 0
  for num in arguments
    n = n + num

sum(1,2,3,4,5)
// => 15
```

#### 一个哈希的例子

这个例子暂时是用不到的，不过可以后面有使用场景，所以呢，就使用呗。

```
//定义
get(hash, key)
  return pair[1] if pair[0] == key for pair in hash


//使用
hash = (one 1) (two 2) (three 3)
get(hash, two)
// => 2
get(hash, three)
// => 3
get(hash, something)
// => null
```

## 内置方法

#### red 

返回`color中红色`的比重。

```
red(#c00)
// => 204
```

返回color中的绿色比重。

```
green(#0c0)
// => 204
```
返回color中的蓝色比重。

```
blue(#00c)
// => 204
```

返回color中的透明度比重。

```
alpha(#fff)
// => 1

alpha(rgba(0,0,0,0.3))
// => 0.3
```

dark(color)
检查color是否是暗色。
```
dark(black)
// => true

dark(#005716)
// => true

dark(white)
// => false
```

light(color)
检查color是否是亮色。

```
light(black)
// => false

light(white)
// => true

light(#00FF40)
// => true
```

hue(color)
返回给定color的色调。

```
hue(hsla(50deg, 100%, 80%))
// => 50deg
```

saturation(color)
返回给定color的饱和度

```
saturation(hsla(50deg, 100%, 80%))
// => 100%
``` 

lightness(color)
返回给定color的亮度。

```
lightness(hsla(50deg, 100%, 80%))
// => 80%
```

push(expr, args…)     别名是append
后面推送给定的args给expr.

```
nums = 1 2
push(nums, 3, 4, 5)

nums
// => 1 2 3 4 5
```

unshift(expr, args…)    别名是prepend
起始位置插入给定的args给expr.

```
nums = 4 5
unshift(nums, 3, 2, 1)

nums
// => 1 2 3 4 5
```

keys(pairs)
返回给定pairs中的键。

```
pairs = (one 1) (two 2) (three 3)
keys(pairs)
// => one two three
```

values(pairs)
返回给定pairs中的值。

```
pairs = (one 1) (two 2) (three 3)
values(pairs)
// => 1 2 3
```

typeof(node)
字符串形式返回node类型。

```
type(12)
// => 'unit'

typeof(12)
// => 'unit'

typeof(#fff)
// => 'rgba'

type-of(#fff)
// => 'rgba'
```

unit(unit[, type])
返回unit类型的字符串或空字符串，或者赋予type值而无需单位转换。

```
unit(10)
// => ''

unit(15in)
// => 'in'

unit(15%, 'px')
// => 15px

unit(15%, px)
// => 15px
```

match(pattern, string)
检测string是否匹配给定的pattern.

```
atch('^foo(bar)?', foo)
match('^foo(bar)?', foobar)
// => true

match('^foo(bar)?', 'foo')
match('^foo(bar)?', 'foobar')
// => true

match('^foo(bar)?', 'bar')
// => false
```

abs(unit)
绝对值。

ceil(unit)
向上取整。

floor(unit)
向下取整。

round(unit)
四舍五入取整。

min(a, b)
取较小值。

max(a, b)
取较大值。

even(unit)
是否为偶数。

```
even(6px)
// => true
```

odd(unit)
是否为奇数。
```
odd(5mm)
// => true
```

sum(nums)
求和。

avg(nums)
求平均数。

join(delim, vals…)
给定vals使用delim连接。

rgb(color | r,g,b)
从r,g,b通道返回RGBA或生成一个RGBA节点。
```
rgb(255,204,0)
// => #ffcc00

rgb(#fff)
// => #fff
```

lighten(color, amount)
给定color增亮amount值。该方法单位敏感，例如，支持百分比，如下：
```
lighten(#2c2c2c, 30)
// => #787878
lighten(#2c2c2c, 30%)
// => #393939
```

darken(color, amount)
给定color变暗amount值。该方法单位敏感，例如，支持百分比，如下：
```
darken(#D62828, 30)
// => #551010

darken(#D62828, 30%)
// => #961c1c
```

desaturate(color, amount)
给定color饱和度减小amount.

```
desaturate(#f00, 40%)
// => #c33
```

saturate(color, amount)
给定color饱和度增加amount.
```
saturate(#c33, 40%)
// => #f00
```

invert(color)
颜色反相。红绿蓝颜色反转，透明度不变。

```
invert(#d62828)
// => #29d7d7
```

unquote(str | ident)
给定str引号去除，返回Literal节点。

```
unquote("sans-serif")
// => sans-serif
unquote(sans-serif)
// => sans-serif
unquote('1px / 2px')
// => 1px / 2px
```

s(fmt, …)
s()方法类似于unquote()，不过后者返回的是Literal节点，而这里起接受一个格式化的字符串，非常像C语言的sprintf(). 目前，唯一标识符是%s.

```
s('bar()');
// => bar()

s('bar(%s)', 'baz');
// => bar("baz")

s('bar(%s)', baz);
// => bar(baz)

s('bar(%s)', 15px);
// => bar(15px)

s('rgba(%s, %s, %s, 0.5)', 255, 100, 50);
// => rgba(255, 100, 50, 0.5)

s('bar(%Z)', 15px);
// => bar(%Z)

s('bar(%s, %s)', 15px);
// => bar(15px, null)
```

operate(op, left, right)
在left和right操作对象上执行给定的op.

```
op = '+'
operate(op, 15, 5)
// => 20
```

length([expr])
括号表达式扮演元组，length()方法返回该表达式的长度。

```
length((1 2 3 4))
// => 4

length((1 2))
// => 2

length((1))
// => 1

length(())
// => 0

length(1 2 3)
// => 3

length(1)
// => 1

length()
// => 0
```

warn(msg)
使用给定的`error`警告，并不退出。

```
warn("oh noes!")
```

error(msg)
伴随着给定的错误msg退出。

```
add(a, b)
  unless a is a 'unit' and b is a 'unit'
    error('add() expects units')
  a + b
```

last(expr)
返回给定expr的最后一个值。

```
nums = 1 2 3
last(nums)
last(1 2 3)
// => 3

list = (one 1) (two 2) (three 3)
last(list)
// => (three 3)
```

p(expr)   ------------这个就是他M的打印
检查给定的expr.

```
fonts = Arial, sans-serif
p('test')
p(123)
p((1 2 3))
p(fonts)
p(#fff)
p(rgba(0,0,0,0.2))

add(a, b)
  a + b

p(add)

//输出如下
inspect: "test"
inspect: 123
inspect: 1 2 3
inspect: Arial, sans-serif
inspect: #fff
inspect: rgba(0,0,0,0.2)
inspect: add(a, b)
```

opposite-position(positions)
返回给定positions相反内容。

```
opposite-position(right)
// => left

opposite-position(top left)
// => bottom right

opposite-position('top' 'left')
// => bottom right
```

image-size(path)----这个很可能有应用场景
返回指定path图片的width和height. 向上查找路径的方法和@import一样，paths设置的时候改变。

```
width(img)
  return image-size(img)[0]
height(img)
  return image-size(img)[1]
image-size('tux.png')
// => 405px 250px
image-size('tux.png')[0] == width('tux.png')
// => true
```


add-property(name, expr)
使用给定的expr为最近的块域添加属性name。
```
something()
  add-property('bar', 1 2 3)
  s('bar')

body
  foo: something()


//编译
body {
  bar: 1 2 3;
  foo: bar;
}

//配合使用
p(current-property)
// => "foo" (foo __CALL__ bar baz)
p(current-property[0])
// => "foo"
p(current-property[1])
// => foo __CALL__ bar baz
```

使用current-property我们可以让例子走得更远点，使用新值复制该属性，且确保功能的条件仅在属性值中使用。

```
something(n)
  if current-property
    add-property(current-property[0], s('-webkit-something(%s)', n))
    add-property(current-property[0], s('-moz-something(%s)', n))
    s('something(%s)', n)
  else
    error('something() must be used within a property')

body {
  foo: something(15px) bar;
}


//编译
body {
  foo: -webkit-something(15px);
  foo: -moz-something(15px);
  foo: something(15px) bar;
}
```

未定义方法

```
stop(pos, rgba)
  rgba-stop(pos, rgba)

stop(50%, orange)
// => rgba-stop(50%, #ffa500)
```













