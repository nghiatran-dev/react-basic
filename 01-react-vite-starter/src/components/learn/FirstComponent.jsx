// JSX
// Fragment
// component = html + css + js

import './style.css';

const FirstComponent = () => {
  return (
    <>
      {/* React Fragment:
        - option 1: use <React.Fragment></React.Fragment>
        - option 2: use <></> (recommendations)
      */}
      <div className="child-1">1st component</div>

      {/* inline style */}
      <div style={{borderRadius: "5px", border: "1px solid black"}}>1.1 component</div>
    </>
  );
}

export default FirstComponent;