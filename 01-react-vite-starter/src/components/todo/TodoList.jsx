import PropTypes from 'prop-types';
import deleteIcon from '../../assets/delete.png';
import editIcon from '../../assets/edit.png';

const TodoList = (props) => {
    const { todoList } = props;
    return (
        <div className='todo-list'>
            {todoList.map((item) => {
                return (
                    <div className="todo-list--item" key={item.id}>
                        <div>{item.content}</div>
                        <div className='item--action'>
                            <img src={editIcon} className='icon action--edit' alt="Edit item" />
                            <img src={deleteIcon} className='icon action--delete' alt="Delete item" />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

TodoList.propTypes = {
    todoList: PropTypes.array
};

export default TodoList;