// JSX
// Fragment
// component = html + css + js

import './style.css';

const FirstComponent = () => {

  // *** [Primitive data types] ***
  // const name = 'Victor Tran';
  // const age = 32;
  // const isAMen = true;
  // const undefinedValue = undefined;
  // const nullValue = null;

  // *** [Reference data types] ***
  // const arr = [1, 2, 3, 4, 5];
  const personInfo = {
    name: 'Victor Tran',
    age: 32,
    isAMen: true
  };
  return (
    <>
      {/* React Fragment:
        - option 1: use <React.Fragment></React.Fragment>
        - option 2: use <></> (recommendations)
      */}
      <div className="child-1">Variable Value: {JSON.stringify(personInfo)}</div>
      <div>{console.log('>>> Test code js in html <<<')}</div>

      {/* inline style */}
      <div style={{borderRadius: "5px", border: "1px solid black"}}>1st component</div>
    </>
  );
}

export default FirstComponent;