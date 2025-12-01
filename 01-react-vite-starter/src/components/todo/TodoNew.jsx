import { useState } from 'react';

const TodoNew = (props) => {

  // useState hook (getter + setter)
  const [newItem, setNewItem] = useState('Victor Tran');

  const handleClickAdd = () => {
    console.log(`Check input value: ${newItem}`);
  };

  // option 1:
  const handleOnchangeInput = (event) => {
    console.log(`Input change value: ${event.target.value}`);
  };

  // option 2:
  const handleOnchangeInput2 = (inputValue) => {
    setNewItem(inputValue);
    console.log(`Input change value: ${inputValue}`);
  };

  return (
    <div className='todo-new'>
        {/* option 1 */}
        {/* <input onChange={handleOnchangeInput} type="text" /> */}
        {/* option 2 */}
        <input onChange={ (event) => handleOnchangeInput2(event.target.value) } type="text" />
        <button onClick={handleClickAdd}>Add</button>
        <div>My text input = {newItem}</div>
    </div>
  );
};

export default TodoNew;