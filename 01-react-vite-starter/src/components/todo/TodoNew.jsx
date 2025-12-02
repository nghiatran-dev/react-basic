import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TodoNew = (props) => {
  const { itemEdit, handleAddNewItem } = props;

  // useState hook (getter + setter)
  const [valueInput, setValueInput] = useState('');

  const handleClickAddButton = () => {
    handleAddNewItem(valueInput);
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

  React.useEffect(() => {
    if (itemEdit) {
      setValueInput(itemEdit.content);
    }
  }, [itemEdit]);

  return (
    <div className='todo-new'>
        {/* option 1 */}
        {/* <input onChange={handleOnchangeInput} type="text" /> */}
        {/* option 2 */}
        <input value={valueInput} onChange={ (event) => handleOnchangeInput(event.target.value) } type="text" />
        <button onClick={handleClickAddButton}>{itemEdit ? 'Update' : 'Add'}</button>
    </div>
  );
};

TodoNew.propTypes = {
  handleAddNewItem: PropTypes.func,
  itemEdit: PropTypes.object,
};

export default TodoNew;