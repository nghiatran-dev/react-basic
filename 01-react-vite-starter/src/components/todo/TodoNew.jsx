const TodoNew = (props) => {

  const handleClickAdd = () => {
    alert('Click button Add');
  };

  // option 1:
  const handleOnchangeInput = (event) => {
    console.log(`Input change value: ${event.target.value}`);
  };

  // option 2:
  const handleOnchangeInput2 = (newItem) => {
    console.log(`Input change value: ${newItem}`);
  };

  return (
    <div className='todo-new'>
        {/* option 1 */}
        {/* <input onChange={handleOnchangeInput} type="text" /> */}
        {/* option 2 */}
        <input onChange={ (event) => handleOnchangeInput2(event.target.value) } type="text" />
        <button onClick={handleClickAdd}>Add</button>
    </div>
  );
};

export default TodoNew;