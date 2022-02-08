import React, {useState} from "react";
import "../CSS/Dropdown.css"

function Dropdown(props) {
  var option1 = [1,2,3,4,5];
  var option2 = ["A","B","C","D","E"]
  const [value1, setValue1] = useState(option1[0]);
  const [value2, setValue2] = useState(option2[0]);
  const [selected, setSelected] = useState([]);
  return (
    <div>
      <div className="dropdowns">
        <div className="dropdown">
          <p>My value is {value1}</p>
          <select onChange={selected => setValue1(selected.target.value)}>
            {option1.map(function(i) {
              return (<option value={i}>{i}</option>);
            })}
          </select>
        </div>
        <div className="dropdown">
          <p>My value is {value2}</p>
          <select onChange={selected => setValue2(selected.target.value)}>
            {option2.map(function(i) {
              return (<option value={i}>{i}</option>);
            })}
          </select>
        </div>
      </div>
      <div className="button">
        <p>You clicked {selected[0] + "; " + selected[1]} times</p>
        <button onClick={() => {
          setSelected([value1, value2]);
        }}>Click me</button>
      </div>
    </div>
  )
}

export default Dropdown;