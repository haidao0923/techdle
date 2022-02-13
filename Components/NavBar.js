import React from "react";
import "../CSS/NavBar.css";

function NavBar(props) {
  const difficultyString = (props.difficulty == 0) ? "Current Mode: Easy" : "Current Mode: Hard";
  const difficultyColor = (props.difficulty == 0) ? "green" : "red";
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
        <button
          className="nav-button"
          style={{backgroundColor: `${difficultyColor}`}}
          onClick={() => {
            props.setDifficulty(1 - props.difficulty);
            props.resetGame();
        }}>{difficultyString}</button>
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