### 联合类型

联合类型就是表示取值为多种类型的一种。

联合类型使用`|`分隔每个类型，允许这个变量为这类型中的一种。

```ts
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

```ts
let myFavoriteNumber: string | number;
myFavoriteNumber = true;

// index.ts(2,1): error TS2322: Type 'boolean' is not assignable to type 'string | number'.
//   Type 'boolean' is not assignable to type 'number'.
```

### 访问联合类型的属性和方法

当`TypeScript`不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问次联合类型的所有类型里的共有的属性和方法。如果不是共有的话，就会报错。

