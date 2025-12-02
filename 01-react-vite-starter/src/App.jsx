import { useState } from 'react';
import './components/todo/todo.css';
import TodoNew from './components/todo/TodoNew';
import TodoList from './components/todo/TodoList';
import emptyImage from './assets/images/empty-list.jpg';

const App = () => {
  const [todoList, setTodoList] = useState([
    { id: 1, content: 'Learn VueJS' },
    { id: 2, content: 'Learn ReactJS' },
    { id: 3, content: 'Learn Angular' },
    { id: 4, content: 'Learn Typescript' }
  ]);

  const addNewItem = (item) => {
    // update todoList state
    setTodoList([...todoList, { id: randomId(1, 1000), content: item }]);
  };

  const randomId = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div className="todo-container">
      <div className="todo-title">TODO LIST</div>
      <TodoNew addNewItem={addNewItem} />
      {
        todoList.length > 0 ?
          <TodoList todoList={todoList} /> :
          <div className='todo-empty'>
            <img src={emptyImage} className='logo' alt="Todo List Empty" />
          </div>
      }
    </div>
  )
}

export default App
