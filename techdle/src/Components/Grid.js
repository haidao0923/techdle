import React from "react";
import "../CSS/Grid.css";

function Grid(props) {

  return (
    <div className="grid">
      {props.boxArray.map((element, index) => {
        return(<div
          className="box"
          style={{backgroundColor: ConvertColor(props.boxColor[index])}}>{element}
        </div>)
      })}
    </div>
  )

  function ConvertColor(color) {
    if (color == "gold") {
      return "#A28D5B";
    } else {
      return color;
    }
  }
}



export default Grid;