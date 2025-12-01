import './components/todo/todo.css';
import TodoNew from './components/todo/TodoNew';
import TodoList from './components/todo/TodoList';
import emptyImage from './assets/images/empty-list.jpg';

const App = () => {
  const name = 'Victor Tran';
  return (
    <div className="todo-container">
      <div className="todo-title">TODO LIST</div>
      <TodoNew />
      <TodoList 
        name={name}
      />
      <div className='todo-empty'>
        <img src={emptyImage} className='logo' alt="Todo List Empty" />
      </div>
    </div>
  )
}

export default App
