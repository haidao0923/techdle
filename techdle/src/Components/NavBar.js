import React from "react";
import "../CSS/NavBar.css";

function NavBar(props) {
  return (
    <div className="nav-background">
      <div className="nav-left">
        <button
          className="nav-button"
          onClick={() => props.setInstructionPopup(true)}>Instruction
        </button>
        <button
          className="nav-button"
          onClick={() => props.resetGame()}>Reset</button>
        <button
          className="nav-button"
          onClick={() => props.getPreviousShareString()}>Share Previous Word</button>
      </div>
      <div className="nav-center">
        <h1 className="nav-title">Techdle</h1>
        <h3 className="nav-title">A wordle variation based on all Georgia Tech courses</h3>
      </div>
      <div className="nav-right" />
    </div>
  )
}

export default NavBar;