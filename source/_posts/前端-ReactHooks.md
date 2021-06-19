---
layout:
title: 用React Hooks 搭一个 TodoList
date: 2019-01-22 12:46:47
tags: React
categories: 前端
---

# 用 React Hooks 搭一个 TodoList
作为一个爱折腾的前端，今天讲点新东西: React Hooks
<!-- more -->
## 什么是Hooks?
Hooks简单来说就是一系列的函数。你可以不用ES6的 classes component的语法；在function component(纯函数)同样可以获取到同样可以获取到React的一些特性，比如state和生命周期，excited？所以呢，我们不叫这些组件叫「无状态组件」了，「函数组件」is preferable～

### Hooks类型

* State hooks
Hooks简单来说就是一系列的函数。你可以不用ES6的 classes component的语法；在function component(纯函数)同样可以获取到同样可以获取到React的一些特性，比如state和生命周期，excited？所以呢，我们不叫这些组件叫`无状态组件`了，`函数组件`is preferable～

### Hooks类型

* State hooks
* Effect hooks
* Custom hooks

### 讲讲优势

*  隔离了有状态的业务逻辑，更利于测试
*  不用 render props 或者通过 Hoc(higher-order components) 包装，也可以共享有状态的业务逻辑
*  函数组件没有生命周期
*  避免了ES6 的 class 语法，jsx 的 class 很诡异，并不是真正意义上的「类」。

更多细节请参考：[Hooks简介](https://reactjs.org/docs/hooks-intro.html)

### 在 prod 环境暂不要使用

Hooks 还在 alpha 阶段，他们的 API 随时都有可能变。在稳定之前，你可以跑跑Demo，边缘项目玩一玩~

##  来 Build 一个 Todo List
我们只要做一下事情就好了
*  展示你的Todos
*  新增一个Todo
*  删除一个Todo

easy?

### Setup

1. 使用「create-react-app」初始化项目

```shell
create-react-app todo-hooks
```

2. 升级 package.json 的 react 和 react-dom，这里使用了 antd，让我们的 TodoUI 更加好看。Antd 的具体配置请移步[antd文档](https://ant.design/docs/react/use-with-create-react-app-cn)

package.json:

```json
"dependencies": {
  "antd": "^3.12.4",
  "react": "16.7.0-alpha.0 - next",
  "react-dom": "16.7.0-alpha.0 - next",
  "react-scripts": "2.1.3"
}
```

2. 升级package.json的 react 和 react-dom，这里使用了antd，让我们的TodoUI更加好看。Antd 的具体配置请移步[antd文档](https://ant.design/docs/react/use-with-create-react-app-cn)

package.json:

```json
"dependencies": {
  "antd": "^3.12.4",
  "react": "16.7.0-alpha.0 - next",
  "react-dom": "16.7.0-alpha.0 - next",
  "react-scripts": "2.1.3"
}
```
### 写一个 TodoForm 的组件

之前就说过，Hooks就是一个函数。来，开始我们的第一个Hooks：

```js
import React from 'react';
import { Form, Button, Input } from 'antd';

const TodoForm = ({ saveTodo }) => {

  return (
    <Form layout="inline">
      <Form.Item>
        <Input  style={{ width: 300 }} placeholder="Add todo"/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" >Add</Button>
      </Form.Item>
    </Form>
  );
};
export default TodoForm;

```

这看起来和「无状态」的组件没什么两样，接下来为这个 Hooks 添砖加瓦:

### useState

```jsx
import { useState } from 'react';
const [value, setValue] = useState('');
```

useState是一个函数，它可以返回state的初始状态并且返回一个数组。数组的第一项返回了当前的state值，第二项是正在更新的函数。用ES6的解构复制为它们命名: value,和setValue。

### 在 Forms 中使用 useState

```js
import React, { useState } from 'react';
import { Form, Button, Input } from 'antd';

const TodoForm = ({ saveTodo }) => {
  const [value, setValue] = useState('');

  return (
    <Form
      layout="inline"
      onSubmit={event => {
        event.preventDefault();
        saveTodo(value);
    }}>
      <Form.Item>
        <Input
          style={{ width: 300 }}
          placeholder="Add todo"
          onChange={event => {
            setValue(event.target.value);
          }}
          value={value}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" >Add</Button>
      </Form.Item>
    </Form>
  );
};
export default TodoForm;
```

### 在 Todos中 使用useState

我们的 todos 也需要状态。在 index.js中 初始化 todo，最开始的状态应该是一个空数组：

```js
import React, { useState } from 'react';
import './App.css';
import TodoForm from './TodoFroms';

const App =()=> {
  const [todos, setTodos] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <TodoForm />
      </header>
    </div>
  );
}

export default App;
```

### TodoList 组件

```js
const TodoList = ({ todos, deleteTodo }) => (
  <div className="ant-col-12 code-boxes-col-1-1">
    <List
      bordered
      itemLayout="horizontal"
      dataSource={todos}
      renderItem={(todo)=> (
        <List.Item>
          <div>{todo}</div>
        </List.Item>)}
    />
  </div>
);

```
Todo List接受两个props:

* todos: 用来展示todo的数组
* deleteTodo: 点击删除按钮可以触发这个函数，通过index 值来找到将要被删除的todo

加入你的 app

```jsx
<TodoForm />
<TodoList todos={todos}/>
```

### 增加 Todo

在appjs文件中，为 TodoForm 增加 saveTodo 的 props

```jsx
 <TodoForm saveTodo={value => {
  	const todoText = value.trim();
  	if (todoText) {
  		setTodos([...todos, todoText]);
  	}
  }
/>
```
### 删除 Todo

```jsx
  <div>
    {todo}
    <Button
      onClick={() => {deleteTodo(index);}}
      icon="delete" type="primary">Delete
    </Button>
  </div>
```

在父组件注册

```jsx
...
<TodoList
  todos={todos}
  deleteTodo={todoIndex => {
    const newTodos = todos
      .filter((_, index) => index !== todoIndex);
      setTodos(newTodos);
  }}
/>
```
看起来和一般的组件也没什么两样?

### Abstracting Form Input useState
开始改造我们的 form

新建一个 useInputState.js 的文件

```jsx
import { useState } from 'react';

export default initialValue => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    onChange: event => {
      setValue(event.target.value);
    },
    reset: () => setValue('')
  };
};
```

现在我们的`TodoForm.js`:

```js
import React from 'react';
import { Form, Button, Input } from 'antd';
import useInputState from './useInputState';

const TodoForm = ({ saveTodo }) => {
   const { value, onChange } = useInputState('');

  return (
    <Form
      layout="inline"
      onSubmit={event => {
        event.preventDefault();
        saveTodo(value);
      }}>
      <Form.Item>
        <Input
          style={{ width: 300 }}
          placeholder="Add todo"
          onChange={event => {
            onChange(event.target.value);
          }}
          value={value}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" >Add</Button>
      </Form.Item>
    </Form>
  );
};

export default TodoForm;
```
## other
当然除了 userState，Hooks 还提供了 `useEffect`、 `useContext `、 `useRef `
Enjoy：）



