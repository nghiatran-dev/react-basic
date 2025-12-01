import { useState } from 'react';
import './components/todo/todo.css';
import TodoNew from './components/todo/TodoNew';
import TodoList from './components/todo/TodoList';
import emptyImage from './assets/images/empty-list.jpg';

const App = () => {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'Learn ReactJS' },
    { id: 2, title: 'Learn VueJS' },
    { id: 3, title: 'Learn Angular' },
    { id: 4, title: 'Learn Typescript' }
  ]);

  const addNewTodo = (item) => {
    alert(`Add new item: ${item}`);
  };

  return (
    <div className="todo-container">
      <div className="todo-title">TODO LIST</div>
      <TodoNew addNewTodo={addNewTodo}/>
      <TodoList 
        todoList={todoList}
      />
      <div className='todo-empty'>
        <img src={emptyImage} className='logo' alt="Todo List Empty" />
      </div>
    </div>
  )
}

export default App
