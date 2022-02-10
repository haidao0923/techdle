import React, {useState} from "react";
import "../CSS/Dropdown.css"

function Dropdown(props) {
  return (
    <div>
      <div className="dropdowns">
        <div className="dropdown">
          <p>Major</p>
          <select onChange={e => props.setMajor(e.target.value)}>
            <option disabled selected value> --select-- </option>
            {props.majors.map(function(i) {
              return (<option value={i}>{i}</option>);
            })}
          </select>
        </div>
        <div className="dropdown">
          <p>Course Number</p>
          <input placeholder="1000-9999" type='number' onChange={e => props.setCourseNumber(e.target.value)} />
        </div>
      </div>
    </div>
  )
}

export default Dropdown;