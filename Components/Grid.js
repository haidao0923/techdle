import React from "react";
import "../CSS/Grid.css";

function Grid(props) {

  return (
    <div className="grid" style={{gridTemplateColumns: getColumnAmount(props.difficultyLength[props.difficulty])}}>
      {props.boxArray.map((element, index) => {
        return(<div
          className="box"
          style={{backgroundColor: convertColor(props.boxColor[index])}}>{element}
        </div>)
      })}
    </div>
  )

  function convertColor(color) {
    if (color == "gold") {
      return "#A28D5B";
    } else {
      return color;
    }
  }

  function getColumnAmount(columnAmount) {
    return '1fr '.repeat(columnAmount);
  }
}



export default Grid;