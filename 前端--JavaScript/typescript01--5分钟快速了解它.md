### 安装TypeScirpt

npm 用户可以选择`npm install -g typesciprt`

### 写好第一个TypeScript文件

在`greeter.ts`文件里: 

```javascript
function greeter(person){
  return "Hello, " + person; 

}

let user = 'Jane User';

let namet = 'wtf';

document.titie = 'hello title';
```

### 编译代码(其实很简单,没那么复杂)

在powershell命令行上,运行TypeScript编辑器: 

```javascript
tsc greeter.zs
```

你会发现在同一个文件夹下多出了一个`greeter.js`文件。

### 类型注解

TypeScript里的类型注解是一种轻量级的为函数或变量添加约束的方式。就好像函数的参数可以注解为字符串参数。

```javascript
function greeter(person: string) {
    return "Hello, " + person;
}

let user = [0, 1, 2];

document.body.innerHTML = greeter(user);
```

这时候肯定出现警告的，因为person的类型约束为`string`，你穿个数组，会看到警告的。

### 接口

我们可以使用接口来描述一个`firstName`和`lastName`字段的对象。其实说白了接口可以快速的约束数值类型。

代码如下：

```javascript
interface Person{
   firstName: string,
   lastName: string
}

function greeter(person: Person) {
    return "Hello, " + person;
}

let user = {firstName: 'Jane',lastName: 'User'};

document.body.innerHTML = greeter(user);

```

### 类


使用类就是支持类的面向对象编程。

可以创建一个`Student`类，她带有一个构建函数和一些公共字段：类和接口可以一起工作，程序员可以自行决定抽象的复杂程度。

可以在参数上使用`public`创建了同名的成名变量。

```javascript
class Student {
    fullName: string;
    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

document.body.innerHTML = greeter(user);

```
重新运行`tsc greeter.ts`你可以看到生成的javascript代码和原来的一模一样。

### 运行TypeScript Web应用

新建一个html，输入内容：


```html
<!DOCTYPE html>
<html>
    <head><title>TypeScript Greeter</title></head>
    <body>
        <script src="greeter.js"></script>
    </body>
</html>
```

### gulp 

gulp中使用 
https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/tutorials/Gulp.html

### react与webpack

react与webpack中使用
https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/tutorials/React%20&%20Webpack.html
