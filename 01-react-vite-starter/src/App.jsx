import { useState } from 'react';
import './components/todo/todo.css';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import TodoNew from './components/todo/TodoNew';
import TodoList from './components/todo/TodoList';
import emptyImage from './assets/images/empty-list.jpg';
import { Outlet } from 'react-router-dom';

const App = () => {
  const [itemEdit, setItemEdit] = useState(null);
  const [todoList, setTodoList] = useState([
    { id: 1, content: 'Learn VueJS' },
    { id: 2, content: 'Learn ReactJS' },
    { id: 3, content: 'Learn Angular' },
    { id: 4, content: 'Learn Typescript' }
  ]);

  const handleAddNewItem = (item) => {
    if (itemEdit) {
      // CASE: update item to todoList
      updateItem(itemEdit.id, item);
      setItemEdit(null);
    } else {
      // CASE: add new item to todoList
      setTodoList([...todoList, { id: randomId(1, 1000), content: item }]);
    }
  };

  const handleEditItem = (item) => {
    setItemEdit(item);
  }

  const handleDeleteItem = (id) => {
    const newTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(newTodoList);
  }

  const updateItem = (id, newContent) => {
    const newTodoList = todoList.map((item) => {
      if (item.id === id) {
        return { ...item, content: newContent };
      }
      return item;
    });
    setTodoList(newTodoList);
  };

  const randomId = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <>
      <Header />

      <div className="todo-container">
        <div className="todo-title">TODO LIST</div>
        <TodoNew itemEdit={itemEdit} handleAddNewItem={handleAddNewItem} />
        {
          todoList.length > 0 ?
            <TodoList todoList={todoList} handleUpdateItem={handleEditItem} handleDeleteItem={handleDeleteItem} /> :
            <div className='todo-empty'>
              <img src={emptyImage} className='logo' alt="Todo List Empty" />
            </div>
        }
      </div>
      <Outlet />

      <Footer />
    </>
  )
}

export default App
