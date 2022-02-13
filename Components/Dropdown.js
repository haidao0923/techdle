import React, {useState} from "react";
import "../CSS/Dropdown.css"

function Dropdown(props) {
  return (
    <div>
      <div className="dropdowns">
        <div className="dropdown-component major">
          <p className="text">Major</p>
          <select onChange={e => props.setMajor(e.target.value.replace("\r",""))}>
            <option disabled selected value> --select-- </option>
            {props.majors.map(i => {
              return (<option value={i}>{i}</option>);
            })}
          </select>
        </div>
        <div className="dropdown-component course-number">
          <p className="text">Course Number</p>
          <input
            placeholder="4 digits"
            min={1000}
            max={9999}
            type='number'
            onChange={e => {
              e.target.value = e.target.value.replace(/^0+(?!$)/, "");
              props.setCourseNumber(e.target.value);
          }} />
        </div>
        <div className="dropdown-component credit-hour">
          <p className="text">Credit Hour</p>
          <input
            placeholder="1 digit"
            min={0}
            max={9}
            type='number'
            onChange={e => {
              e.target.value = e.target.value.replace(/^0+(?!$)/, "");
              props.setCreditHour(e.target.value);
          }} />
        </div>
      </div>
    </div>
  )
}

export default Dropdown;