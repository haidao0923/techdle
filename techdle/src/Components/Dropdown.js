import React, {useState} from "react";
import "../CSS/Dropdown.css"

function Dropdown(props) {
  return (
    <div>
      <div className="dropdowns">
        <div className="dropdown">
          <p>Major</p>
          <select onChange={selected => props.setValue1(selected.target.value)}>
            {props.majors.map(function(i) {
              return (<option value={i}>{i}</option>);
            })}
          </select>
        </div>
        <div className="dropdown">
          <p>Course Number</p>
          <select onChange={selected => props.setValue2(selected.target.value)}>
            {props.option2.map(function(i) {
              return (<option value={i}>{i}</option>);
            })}
          </select>
        </div>
      </div>
    </div>
  )
}

export default Dropdown;