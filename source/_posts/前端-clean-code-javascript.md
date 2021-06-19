---
layout: post
title: Javascript 整洁之道
date: 2017-08-22 10:16:58
categories: 前端
---
# Javascript整洁之道

## 简介

## 变量
1. 使用有意义的和声明式的变量名

<!-- more -->

<font style="font-weight:bold">Bad:</font>

```js
const yyyymmdstr = moment.format('YYYY/MM/DD');
```

<font style="font-weight:bold;">Good:</font>

```js
const currentDate = moment.format('YYYY/MM/DD');
```
2. 对同样的变量类型使用相同的词汇

<font style="font-weight:bold">Bad:</font>

```js
getUserInfo();
getClientData();
getCustomerRecord();
```
<font style="font-weight:bold;">Good:</font>

```js
getUser();
```

3. 使用可检索的变量名
我们读的代码多于写的代码。所以代码的课可读性和可检索性非常重要。使用无意义的变量命名会为我们理解程序带来一定的困难。请确保你的变量名可搜索。类似于[buddy.js](https://github.com/danielstjules/buddy.js)和[ESLint](https://github.com/eslint/eslint/blob/660e0918933e6e7fede26bc675a0763a6b357c94/docs/rules/no-magic-numbers.md)可以检查这些没有命名的常量

<font style="font-weight:bold">Bad:</font>

```js
//864000000到底是什么意思
setTimeout(blastOff, 86400000);
```

<font style="font-weight:bold">Good:</font>

```js
//将它声明为常量
const MILLSECONDS_IN_A_DAY = 86400000;
setTimeout(blastOff, MILLSECONDS_IN_A_DAY);
```
4. 使用解释性的变量

<font style="font-weight:bold">Bad:</font>

```js
const address = 'One Infinite Loop , Cupertino 95014';
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
saveCityZipCode(address.match(cityZipCodeRegex)[1], address.match(cityZipCodeRegex)[2]);
```

<font style="font-weight:bold;">Good:</font>

```js
const address = 'One Infinite Loop, Cupertino 95014';
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
//利用数组的解构，返回的变量
const [, city, zipCode] = address.match(cityZipCodeRegex) || [];
saveCityZipCode(city, zipCode);
```

5. 详诉优于概述

<font style="font-weight:bold">Bad:</font>

```js
const locations = ['Austin', 'New York', 'San Francisco'];
      locations.forEach((l) => {
      doStuff();
      doSomeOtherStuff();
      // ...
      // ...
      // ...
      // Wait, what is `l` for again?
      dispatch(l);
});
```
<font style="font-weight:bold;">Good:</font>

```js
const locations = ['Austin', 'New York', 'San Francisco'];
      locations.forEach((location) => {
      doStuff();
      doSomeOtherStuff();
      // ...
      // ...
      // ...
      dispatch(location);
});
```
6. 不要增加不需要的上下文

如果你的类或者对象已经有语义，不用在变量名中重复这些

<font style="font-weight:bold">Bad:</font>

```js
const Car = {
    carMake: 'Honda',
    carModel: 'Accord',
    carColor: 'Blue'
};
function paintCar(car) {
    car.carColor = 'Red';
}
```

<font style="font-weight:bold;">Good:</font>

```js
const Car = {
    make: 'Honda',
    model: 'Accord',
    color: 'Blue'
};
function paintCar(car) {
    car.color = 'Red';
}
```

6. 使用默认参数代替短路判读或者条件判断

> 默认的参数总是比短路赋值活着条件语句更加简洁。注意，你使用他们的时候，你的函数将会为未定义的参数提供一个默认值。其他的错误的值，类似于‘’、”“、false、null、0、and NAN将不会被默认值取代

<font style="font-weight:bold">Bad:</font>

```js
function createMicrobrewery(name) {
    const breweryName = name || 'Hipster Brew Co.';
    // ...
}
```
<font style="font-weight:bold;">Good:</font>

```js
function createMicrobrewery(breweryName = 'Hipster Brew Co.') {
    // ...
}
```

## 函数

1. 函数参数:

理想情况下：两个或者更少。减少函数的参数越来越重要了，因为它会让你测试你的函数变得简单。拥有超过三个的参数会导致你的函数的测试用例爆炸式地增加（这么强=.=）.

一个或者两个参数是理想的情况，三个就应该避免。超过三个就应该整合一下。通常， 如果你有超过两个以上的参数，你的函数就会尝试着做很多的事。大多数情况下，一个高阶的对象作为一个参数就满足了。

因为在js中，什么都是对象。没有类的样板。如果你需要一大串参数，你可以使用对象。

为了使函数期望的类型更加明显，你可以使用ES2015/ES6的解构语法，它有几点好处：

* 当某人一旦看到这个函数声明，就会明白什么属性会被用到。

* 解构同样克隆参数对象的一些基本类型的值给函数，这个可以排除一些副作用。注意：对象和数组从函数参数对象中不会被克隆
* Linter 也可以警告你什么属性没有被用到。哪个属性将不会被解构

<font style="font-weight:bold">Bad:</font>

```js
function createMenu(title, body, buttonText, cancellable) {
    // ...
}
```

<font style="font-weight:bold;">Good:</font>

```js
function createMenu({ title, body, buttonText, cancellable }) {
      // ...
}
createMenu({
  title: 'Foo',
  body: 'Bar',
  buttonText: 'Baz',
  cancellable: true
});
```

2. 函数应该只做一件事

这是软件工程最重要的事，当函数做的事超过了一件。它们会变得越来越难以维护、测试。当你的函数从只做一件事脱离出来，它们可以轻易地被重构，你的代码可读性也会变得很高。

<font style="font-weight:bold">Bad:</font>

```js
function emailClients(clients) {
    clients.forEach((client) => {
        const clientRecord = database.lookup(client);
            if (clientRecord.isActive()) {
                email(client);
            }
    });
}

```
<font style="font-weight:bold;">Good:</font>

```js
function emailActiveClients(clients) {
  clients.filter(isActiveClient)
  .forEach(email);
}
function isActiveClient(client) {
    const clientRecord = database.lookup(client);
    return clientRecord.isActive();
}
```

3. 函数名应该告诉他们在做什么

<font style="font-weight:bold">Bad:</font>

```js
function addToDate(date, month) {
  // ...
}
const date = new Date();
  // 难以从函数名分辨出什么被添加了
addToDate(date, 1);
```
<font style="font-weight:bold;">Good:</font>

```js
function addMonthToDate(month, date) {
	// ...
}
const date = new Date();
addMonthToDate(1, date);
```

4. 函数应该只有一个级别的抽象

> 当函数有多个级别的抽象时，分割函数可以使代码可读和更容易测试。

<font style="font-weight:bold">Bad:</font>

```js
function parseBetterJSAlternative(code) {
	const REGEXES = [];
	const statements = code.split(' ');
	const tokens = [];
	REGEXES.forEach((REGEX) => {
		statements.forEach((statement) => {// ...});
	});
	const ast = [];
	tokens.forEach((token) => {// lex...});
	ast.forEach((node) => {// parse...});
}
```

<font style="font-weight:bold;">Good:</font>

```js
function tokenize(code) {
	  const REGEXES = [// ...];
	  const statements = code.split(' ');
	  const tokens = [];
	  REGEXES.forEach((REGEX) => {
	      statements.forEach((statement) => { tokens.push( /* ... */ );});});
	      return tokens;
	  }
	  function lexer(tokens) {
	      const ast = [];
	      tokens.forEach((token) => { ast.push( /* ... */ );});
	      return ast;
	  }
}
function parseBetterJSAlternative(code) {
	const tokens = tokenize(code);
	const ast = lexer(tokens);
	ast.forEach((node) => {// parse...});
}
```

5. 去掉重复的代码

尽量不要复制代码。复制的代码意味着当你修改一个逻辑时，需要更改多个逻辑。假设你经营着一家餐馆，你的库存有的番茄，洋葱，咖喱等等。当你的多张库存表单都有这些东西，当上了一道菜之后，所有的库存表单都需要更新。如果你只有一张表，你就只需要更新一张表。

很多时候，你复制代码因为你有两个或多个不同细微的东西。他们分享了很多共同的东西，但是它们迫使你分离两个或者更多的函数，但是却做着同样的事情。删除一些重复的代码意味着创造出抽象的部分，只用函数/模块/类来解决一系列的问题。

让抽象的部分做正确的工作是至关重要的。不要重复你自己，否则你会发现你自己你想改变一个地方的时候需要更新很多地方。

<font style="font-weight:bold">Bad:</font>

```js
function showDeveloperList(developers{developers.forEach((developer) => {
	const expectedSalary = developer.calculateExpectedSalary();
	const experience = developer.getExperience();
	const githubLink = developer.getGithubLink();
	const data = {
		expectedSalary,
		experience,
		githubLink
	};
	render(data););
}

function showManagerList(managers) {
	managers.forEach((manager) => {
		const expectedSalary = manager.calculateExpectedSalary();
		const experience = manager.getExperience();
		const portfolio = manager.getMBAProjects();
		const data = {
			expectedSalary,
			experience,
			portfolio
		};
		render(data);
	});
}
```

<font style="font-weight:bold;">Good:</font>

```js
function showEmployeeList(employees) {
    employees.forEach((employee) => {
        const expectedSalary = employee.calculateExpectedSalary();
        const experience = employee.getExperience();
        const data = {
              expectedSalary,
              experience
    };
    switch (employee.type) {
        case 'manager':
            data.portfolio = employee.getMBAProjects();
        break;
        case 'developer':
            data.githubLink = employee.getGithubLink();
        break    ;
    }
    render(data);
  });
}
```

6. 为 Object.assign 设置默认的对象

<font style="font-weight:bold">Bad:</font>

```js
const menuConfig = {
    title: null,
    body: 'Bar',
    buttonText: null,
    cancellable: true
};
function createMenu(config) {
    config.title = config.title || 'Foo';
    config.body = config.body || 'Bar';
    config.buttonText = config.buttonText || 'Baz';
    config.cancellable = config.cancellable !== undefined ? config.cancellable : true;
}
createMenu(menuConfig);
```
<font style="font-weight:bold;">Good:</font>

```js
const menuConfig = {
    title: 'Order',
    // User did not include 'body' key
    buttonText: 'Send',
    cancellable: true
};
function createMenu(config) {
    config = Object.assign({
        title: 'Foo',
        body: 'Bar',
        buttonText: 'Baz',
        cancellable: true}, config);
        // config now equals: {title: "Order", body: "Bar", buttonText: "Send", cancellable: true}
        // ...
}
createMenu(menuConfig);
```

7. 不要将flag设置为函数的参数

flag告诉了你的用户，这个函数做了不止一件事情，函数应该只做一件事。如果像下面的代码，路径决定于不同的布尔值，就将它们拆分出来。

<font style="font-weight:bold">Bad:</font>

```js
function createFile(name, temp) {
    if (temp) {
        fs.create(`./temp/${name}`);
    } else {
        fs.create(name);
    }
}
```
<font style="font-weight:bold;">Good:</font>

```js
function createFile(name) {
    fs.create(name);
}
function createTempFile(name) {
    createFile(`./temp/${name}`);
}
 ```

8.  避免副作用
*  一个函数接收了一个参数返回了其他的值或数组。这个副作用可能改变全局变量，或者奇怪地将你口袋里的钱给一个陌生人。

	现在，你确实需要将这些副作用写进你的代码。像之前的例子，你可能会写一个文件。你需要做的是将这些集中起来。不要将几个函数或类写一个特定的文件。一个来写的工作就够了，有且只有一个。

	这个主要的点是在于避免常见的陷阱，比如一些没有结构的对象共享一些状态，使用无数据类型可以被随意赋值，记住将这些副作用集中起来。

<font style="font-weight:bold">Bad:</font>

```js
// 全局的变量将被下面的函数引用
// 如果另外一个函数使用这个名字，现在它会变成一个数组
let name = 'Ryan McDermott';
function splitIntoFirstAndLastName() {
    name = name.split(' ');
}
splitIntoFirstAndLastName();
console.log(name); // ['Ryan', 'McDermott'];
```

<font style="font-weight:bold;">Good:</font>

```js
function splitIntoFirstAndLastName(name) {
  	return name.split(' ');
}
const name = 'Ryan McDermott';
const newName = splitIntoFirstAndLastName(name);
console.log(name); // 'Ryan McDermott';
console.log(newName); // ['Ryan', 'McDermott'];
```

*  在JS中，基本类型的通过值传递。对象和数组通过引用传递。在这些对象和数组中，如果你改变购物车中的数组，通过购买一些商品，然后其他的函数可能使用被这些影响了的`cat` 数组。这可能很棒，但是考虑一下情况：

* 用户点击了购买的按钮, 按钮需要调用一个购买的函数。这个函数可能会发送一个网络请求，然后将购物车的数组发送给服务器。在网络极差的情况下，这个购买函数会不断地发送请求。现在在网络请求真正发送之前，用户突然点击`Add to Cart`的按钮。这个购买函数将会发送意外的数据，因为它有对这个购物车数组的引用。

* 一个好的解决思路是`addItemToCart`函数总是克隆这个`cart`，编辑它，然后返回克隆。这个保证了没有其他函数保持对这个购物车保持引用，排除了一些意外的影响。

注意：

1. 这里存在确实想要改变输入框对象的情况，但是当你适应了这种编程方式你会发现这种方式弥足珍贵。为了没有副作用大多数的代码可以被重构。

2. 介于克隆一个大的对象在性能表现上代价非常昂贵。幸运的是在实践中，这不是一个很大的问题。因为有大量的[库](https://facebook.github.io/immutable-js/)允许这种编程方式又快又好。不需要你去手动克隆对象和数组。

10. 不要写全局的函数

污染全局是非常不好的实践，污染全局变量在JavaScript中是一个不好的做法，因为可能会与另一个库冲突，并且使用你的API用户在生产环境中遇到异常之前不会更明智。让我们来想一个例子：如果你想扩展JavaScript的原生的Array，让两个数组显示出不同的diff函数。你可以在Array.prototype上进行扩展，但是可能会与尝试执行相同操作的另一个库冲突。如果其他库只是使用diff来找到数组的第一个和最后一个元素之间的区别呢？这就是为什么只使用ES2015 / ES6类并且只是扩展Array全局更好。

<font style="font-weight:bold">Bad:</font>

```js
Array.prototype.diff = function diff(comparisonArray) {
    const hash = new Set(comparisonArray);
    return this.filter(elem => !hash.has(elem));
};
```

<font style="font-weight:bold;">Good:</font>

```js
class SuperArray extends Array {
    diff(comparisonArray) {
        const hash = new Set(comparisonArray);
        return this.filter(elem => !hash.has(elem));
    }
}
```
10.  面向函数编程而不要急于编程

JavaScript不是像Haskell的函数式编程语言。但是它却有函数式的味道，函数式语言是比较容易干净和测试的。尽你的可能去尝试这种编程方式。

<font style="font-weight:bold">Bad:</font>

```js
const programmerOutput = [{
    name: 'Uncle Bobby',
    linesOfCode: 500
  }, {
    name: 'Suzie Q',
    linesOfCode: 1500
  }, {
    name: 'Jimmy Gosling',
    linesOfCode: 150
  }, {
   name: 'Gracie Hopper',
   linesOfCode: 1000
 }
];

let totalOutput = 0;
for (let i = 0; i < programmerOutput.length; i++) {
    totalOutput += programmerOutput[i].linesOfCode;
}
```

<font style="font-weight:bold;">Good:</font>

```js
const programmerOutput = [{
    name: 'Uncle Bobby',
    linesOfCode: 500
  }, {
    name: 'Suzie Q',
    linesOfCode: 1500
  }, {
    name: 'Jimmy Gosling',
    linesOfCode: 150
  }, {
   name: 'Gracie Hopper',
   linesOfCode: 1000
 }
];
const INITIAL_VALUE = 0;
const totalOutput = programmerOutput
      .map((programmer) => programmer.linesOfCode)
      .reduce((acc, linesOfCode) => acc + linesOfCode, INITIAL_VALUE)；
```
10.  概括条件

<font style="font-weight:bold">Bad:</font>

```js
if (fsm.state === 'fetching' && isEmpty(listNode)) {
     // ...
}
```
<font style="font-weight:bold;">Good:</font>

```js
function shouldShowSpinner(fsm, listNode) {
    return fsm.state === 'fetching' && isEmpty(listNode);
}
if (shouldShowSpinner(fsmInstance, listNodeInstance)) {
      // ...
}
```
10.  避免否定条件

<font style="font-weight:bold">Bad:</font>

```js
function isDOMNodeNotPresent(node) {
      // ...
}
if (!isDOMNodeNotPresent(node)) {
      // ...
}
```
<font style="font-weight:bold;">Good:</font>

```js
function isDOMNodePresent(node) {
      // ...
}
if (isDOMNodePresent(node)) {
       // ...
}
```
14.  避免多条件

这个看起来像是不可完成的任务。
当第一次听到这个的时候，人们都会说：「没有 `if` 我能够做什么？」。
这个回答是：「你可以在不同的情况下使用多态完成相同的任务」。

第二个问题通常是：「听起来不错，可是为什么我被希望要求做这个？」。

答案是我们之前学到过的概念：函数只应该做一件事。当你的 `class` 和 `function`	有了条件判断，你在告诉你的用户，你的函数在做不止一件事。

记住，函数只做一件事。

<font style="font-weight:bold">Bad:</font>

```js
class Airplane {
	// ...
	getCruisingAltitude() {
        switch (this.type) {
            case '777':
                return this.getMaxAltitude() - this.getPassengerCount();
            case 'Air Force One':
                return this.getMaxAltitude();
            case 'Cessna':
                return this.getMaxAltitude() - this.getFuelExpenditure();
        }
    }
}
```

<font style="font-weight:bold;">Good:</font>

```js
class Airplane {
    // ...
}
class Boeing777 extends Airplane {
      // ...
    getCruisingAltitude() {
        return this.getMaxAltitude() - this.getPassengerCount();
    }
}
class AirForceOne extends Airplane {
    // ...
    getCruisingAltitude() {
        return this.getMaxAltitude();
    }
}
class Cessna extends Airplane {
    // ...
    getCruisingAltitude() {
        return this.getMaxAltitude() - this.getFuelExpenditure();
    }
}
```

15. 避免多条件地查询

* JavaScript是无类型的语言，这意味着你可以使用任何类型来作为参数。有时候你会被这种自由反咬一口，然后尝试着在函数中做类型检测。这里有很多方法去避免这种情况，首先要考虑的是现有的API

<font style="font-weight:bold">Bad:</font>

```js
function travelToTexas(vehicle) {
    if (vehicle instanceof Bicycle) {
        vehicle.pedal(this.currentLocation, new Location('texas'));
    } else if (vehicle instanceof Car) {
        vehicle.drive(this.currentLocation, new Location('texas'));
    }
}
```

Good :

```js
function travelToTexas(vehicle) {
      vehicle.move(this.currentLocation, new Location('texas'));
}
```

* 如果你使用的是像字符串和整数这种基本类型的值，但是你不使用多态但是依旧感觉到做类型检测很有必要，你可以考虑 `TypeScript`。他是`JavaScript`非常卓越的替代品。它提供了在JS语法基础上的静态类型检测。手动检查普通类型的 JavaScript，需要额外多的代码，这种人造的类型安全使代码丧失了可读性。让代码整洁，书写好的测试用例，才会有好的 code  review。否则，用 TypeScript 来弥补这个缺失。

<font style="font-weight:bold">Bad:</font>

```js
function combine(val1, val2) {
      if (typeof val1 === 'number' && typeof val2 === 'number' ||
          typeof val1 === 'string' && typeof val2 === 'string') {
              return val1 + val2;
          }
      throw new Error('Must be of type String or Number');
}
```
<font style="font-weight:bold;">Good:</font>

```js
function combine(val1, val2) {
    return val1 + val2;
}
```
16. 不要过度优化
现代浏览器在底层运行时做了很多的优化。很多时候你在优化代码只是在浪费时间。这里有很多好的[资源](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers)来查看哪些底层的优化是缺失的。

<font style="font-weight:bold">Bad:</font>

```js
// On old browsers, each iteration with uncached `list.length` would be costly
// because of `list.length` recomputation. In modern browsers, this is optimized.
for (let i = 0, len = list.length; i < len; i++) {
      // ...
}
```

<font style="font-weight:bold;">Good:</font>

```js
for (let i = 0; i < list.length; i++) {
      // ...
}
```
17. 移除无用的代码
无用的代码和复制来的代码一样不好，你的代码库没有理由去保留它。如果没有被调用过，清除它。如果你始终需要它就让它存在在历史版本中。

<font style="font-weight:bold">Bad:</font>

```js
function oldRequestModule(url) {
    // ...
}
function newRequestModule(url) {
    // ...
}
const req = newRequestModule;
inventoryTracker('apples', req, 'www.inventory-awesome.io');
```

<font style="font-weight:bold;">Good:</font>

```js
function newRequestModule(url) {
    // ...
}
const req = newRequestModule;
inventoryTracker('apples', req, 'www.inventory-awesome.io');
```
## 对象和数据结构
1.  使用 getter 和 setter

<font style="font-weight:bold">Bad:</font>

```js
function makeBankAccount() {
 // ...
  return {
  	balance: 0,
  	// ...
  };
}
const account = makeBankAccount();
account.balance = 100;
```

<font style="font-weight:bold;">Good:</font>

```js
function makeBankAccount() {
	 //这是一个私有的属性
	 let balance = 0;
	 // a "getter",通过下面的返回对象使之成为公有。
	 function getBalance() {
	 		return balance;
	 }
	  // a "setter", 通过下面的返回对象使之成为公有。
	  function setBalance(amount) {
	  	// ... validate before updating the balance
	  	balance = amount;
	  }
	  return {
	 	 // ...
	  	getBalance,
		  setBalance,
	  };
}
const account = makeBankAccount();
account.setBalance(100);
```

2.  使用 getter 和 setter

