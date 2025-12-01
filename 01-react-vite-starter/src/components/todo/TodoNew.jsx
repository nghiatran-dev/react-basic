import { useState } from 'react';
import PropTypes from 'prop-types';

const TodoNew = (props) => {
  const { addNewItem } = props;

  // useState hook (getter + setter)
  const [valueInput, setValueInput] = useState('');

  const handleClickAdd = () => {
    addNewItem(valueInput);
    setValueInput('');
  };

  // option 1:
  // const handleOnchangeInput1 = (event) => {
  //   console.log(`Input change value: ${event.target.value}`);
  // };

  // option 2:
  const handleOnchangeInput = (inputValue) => {
    setValueInput(inputValue);
  };

  return (
    <div className='todo-new'>
        {/* option 1 */}
        {/* <input onChange={handleOnchangeInput} type="text" /> */}
        {/* option 2 */}
        <input value={valueInput} onChange={ (event) => handleOnchangeInput(event.target.value) } type="text" />
        <button onClick={handleClickAdd}>Add</button>
    </div>
  );
};

TodoNew.propTypes = {
  addNewItem: PropTypes.func.isRequired,
};

export default TodoNew;