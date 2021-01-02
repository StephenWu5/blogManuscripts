### 类型推论是什么

**typescript会在没有明确的指定类型的时候推测出一个类型，这就是类型推论**

```ts
let Number = 'seven';
Number = 7;

//实际上等价于
let Number: string = 'seven';
Number = 7;
```

如果定义的时候没有赋值，都会被认为是`any	`

```ts
let myFavoriteNumber;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```
