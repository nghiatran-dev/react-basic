const TodoList = (props) => {
    console.log('>>> Check props todoList: ', JSON.stringify(props.todoList));
    return (
        <div className='todo-list'>
            <div className="todo-list--item">Learning ReactJS 1</div>
            <div className="todo-list--item">Learning ReactJS 2</div>
        </div>
    );
};

export default TodoList;