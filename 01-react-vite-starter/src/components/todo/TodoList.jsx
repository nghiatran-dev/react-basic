const TodoList = (props) => {
    return (
        <div className='todo-list'>
            <div className="todo-list--item">My name is: { props.name }</div>
            <div className="todo-list--item">Learning ReactJS 1</div>
            <div className="todo-list--item">Learning ReactJS 2</div>
        </div>
    );
};

export default TodoList;