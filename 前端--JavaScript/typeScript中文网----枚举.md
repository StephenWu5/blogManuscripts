
使用枚举我们定义一些常量，清晰表达意图或者有区别的用例。常见的有数字或者字符串。

## 数字枚举

```javascript
//我们定义了一个数字枚举， Up使用初始化为 1。 其余的成员会从 1开始自动增长。 换句话说， Direction.Up的值为 1， Down为 2， Left为 3， Right为 4。
enum Direction {
    up = 1,
    down,
    left,
    right
}

//现在， Up的值为 0， Down的值为 1等等。 当我们不在乎成员的值的时候，这种自增长的行为是很有用处的，但是要注意每个枚举成员的值都是不同的。
enum Direction {
    up,
    down,
    left,
    right
}
```

使用枚举很简单，使用枚举的属性类访问成员，和枚举的名字来访问枚举类型。

```javascript
enum Response {
    No = 0,
    Yes = 1,
}

function respond(recipient: string, message: Response): void {
    // ...
}

respond("Princess Caroline", Response.Yes)
```

## 字符串枚举

字符串枚举的概念简单，必须使用字符串字面量，或者另外一个字符串枚举成员进行初始化。

```javascript
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}
``

字符串枚举没有自增长的行为，字符串枚举可以很好的序列化。如果正在调试并且要读一个数字枚举的运行时的值。这个枚举允许你提供一个有意义的值。字符串枚举允许你提供一个运行时有意义的并且可读的值，独立于枚举成员的名字。


## 异构枚举

枚举可以混合字符串和数字成员。一般不建议那样做

```javascript
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}
```

## 计算的和常量成员

每个枚举成员都带有一个值，他是常量或者计算出来的。枚举成员被当作是常量。

```javascript
enum FileAccess {
    // constant members
    None,
    Read    = 1 << 1,
    Write   = 1 << 2,
    ReadWrite  = Read | Write,
    // computed member
    G = "123".length
}
```

## 联合枚举与枚举成员的类型
以后再往下看吧

