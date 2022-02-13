import React, {useState, useEffect} from "react";
import NavBar from "../Components/NavBar";
import Dropdown from "../Components/Dropdown";
import Grid from "../Components/Grid";
import Popup from "../Components/Popup";
import "../CSS/Home.css";
import course_list from "../Data/course_list.txt";
import major_list from "../Data/major_list.txt";

function Home(props) {
  const [courses, setCourses] = useState([]);
  const [majors, setMajors] = useState([]);
  LoadCourses();
  LoadMajors();
  const [welcomePopup, setWelcomePopup] = useState(true);
  const [instructionPopup, setInstructionPopup] = useState(false);
  const [major, setMajor] = useState();
  const [courseNumber, setCourseNumber] = useState(0);
  const [creditHour, setCreditHour] = useState();
  const [selectedMajor, setSelectedMajor] = useState();
  const [selectedNumberString, setSelectedNumberString] = useState();
  const [correctMajor, setCorrectMajor] = useState();
  const [correctCourseNumber, setCorrectCourseNumber] = useState();
  const [correctCreditHour, setCorrectCreditHour] = useState();
  const [correctNumberString, setCorrectNumberString] = useState();

  const [boxArray, setBoxArray] = useState([]);
  const [boxColor, setBoxColor] = useState([]);
  const [victoryPopup, setVictoryPopup] = useState(false);
  const [losePopup, setLosePopup] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);
  const [shareString, setShareString] = useState();

  const difficultyLength = [9, 6];
  const [difficulty, setDifficulty] = useState(0);

  useEffect(() => {
    if (correctNumberString == undefined) {
      return;
    }
    updateGrid();
    checkVictory();
  }, [selectedMajor, selectedNumberString])

  return (
    <div className="background">
      <NavBar
        setInstructionPopup={setInstructionPopup}
        resetGame={resetGame}
        getPreviousShareString={getPreviousShareString}
        difficulty={difficulty}
        setDifficulty={setDifficulty}/>
      <Dropdown
        className='dropdown'
        majors={majors}
        setMajor={setMajor}
        setCourseNumber={setCourseNumber}
        setCreditHour={setCreditHour}/>
      <div>
        <button  className="enter-btn" disabled={gameEnd} onClick={() => checkInput()}>ENTER</button>
        <p className="text-description">The list of courses is taken from <a className="text-description" href="https://catalog.gatech.edu/coursesaz/" target="_blank">https://catalog.gatech.edu/coursesaz/</a></p>
        <p className="text-description">Only courses with 4-digit course numbers are considered</p>
      </div>
      <Grid
        boxArray={boxArray}
        boxColor={boxColor}
        difficulty={difficulty}
        difficultyLength={difficultyLength}/>
      <div>
        <button
          className="give-up-btn"
          onClick={() => {
            setGameEnd(true);
            setLosePopup(true);
        }}>I Give Up</button>
      </div>
      <Popup
        className="instruction"
        isActive={instructionPopup}>
          <h1>Instruction</h1>
          <p className="instruction-caption">Guess the randomly chosen course among a list of over 5000 courses.</p>
          <p className="instruction-caption">As you make guesses, you will receive hints in the form of highlighted letter or digit.</p>
          <img width="80%" src={require("../Images/Instruction_Row_1.png")}/>
          <h5 className="instruction-caption">Black highlight means that the letter or digit <u>does not exist</u> in the answer.</h5>
          <img width="80%" src={require("../Images/Instruction_Row_2.png")}/>
          <h5 className="instruction-caption">Yellow highlight means that the letter or digit <u>exist</u> in the answer but in the <u>wrong</u> place.</h5>
          <img width="80%" src={require("../Images/Instruction_Row_3.png")}/>
          <h5 className="instruction-caption">Green highlight means that the letter or digit <u>exist</u> in the answer and in the <u>right</u> place.</h5>
          <img width="80%" src={require("../Images/Instruction_Row_4.png")}/>
          <h5 className="instruction-caption">Try your best to get the correct answer in as few guesses as possible!</h5>
          <img width="80%" src={require("../Images/Instruction_Hard_Mode.png")}/>
          <h4 className="instruction-caption">In hardmode, the major section is condense into 1 column and it will be highlighted if at least one letter is in the correct answer! Don't be discouraged, because you can still narrow it down with process of elimination.</h4>
          <button
            className="close-btn"
            onClick={() => setInstructionPopup(false)}>Close
          </button>
      </Popup>
      <Popup
        className="welcome"
        isActive={welcomePopup}>
          <h1>Welcome to Techdle</h1>
          <p className="welcome-text">Techdle is a variation on the Wordle game based upon a scraped list of over 5000 Georgia Tech courses.</p>
          <p>Made by <i>Hai Dao</i></p>
          <button
            className="start-btn"
            onClick={() => {
              setWelcomePopup(false);
              setInstructionPopup(true);
              getCorrectValue();
            }}>Start Game
          </button>
      </Popup>
      <Popup
        className="victory"
        isActive={victoryPopup}>
          <h1>You win!</h1>
          <img src={require("../Images/beekeeper_gif.gif")}/>
          <br /><br />
          <button
            className="share-btn"
            onClick={() => {
              getShareString();
            }}>Share
          </button>
          <button
            className="close-btn"
            onClick={() => {
              setVictoryPopup(false);
            }}>Close
          </button>
      </Popup>
      <Popup
        className="lose"
        isActive={losePopup}>
          <h1>You lose!</h1>
          <h4>The correct course was</h4>
          <h4>Major: {correctMajor}</h4>
          <h4>Course Number: {correctCourseNumber}</h4>
          <h4>Credit Hour: {correctCreditHour}</h4>
          <button
            className="reset-btn"
            onClick={() => {
              setLosePopup(false);
              resetGame();
            }}>Reset
          </button>
          <button
            className="close-btn"
            onClick={() => {
              setLosePopup(false);
            }}>Close
          </button>
      </Popup>
    </div>
  );

	function checkInput() {
		if (major == undefined) {
      alert("Please select a major.");
    } else if (courseNumber < 1000 || courseNumber > 9999) {
			alert("Please input a valid course number between 1000 and 9999.");
		} else if (creditHour == undefined || creditHour < 0 || creditHour > 9) {
      alert("please input a valid credit hour between 0 and 9.")
    } else {
			setSelectedMajor(major);
      setSelectedNumberString(courseNumber.toString() + creditHour.toString());
		}
	}

	function updateGrid() {

    var tempBoxArray = Array.from({length: difficultyLength[difficulty]}).fill("");
    var tempBoxColorArray = Array.from({length: difficultyLength[difficulty]}).fill("black");

    if (difficulty == 1) {
      tempBoxArray[0] = selectedMajor;
      if (tempBoxArray[0] == correctMajor) {
        tempBoxColorArray[0] = "green";
      } else {
        for (var i = 0; i < correctMajor.length; i++) {
          for (var j = 0; j < tempBoxArray[0].length; j++) {
            if (correctMajor.charAt(i) == tempBoxArray[0].charAt(j)) {
              tempBoxColorArray[0] = "gold";
              break;
            }
          }
        }
      }
    } else {
      const paddedCorrectMajor = correctMajor.padStart(4, " ");
      const paddedSelectedMajor = selectedMajor.padStart(4, " ");

      for (var i = 0; i < paddedCorrectMajor.length; i++) {
        tempBoxArray[i] = paddedSelectedMajor.charAt(i);
        if (paddedCorrectMajor.charAt(i) == paddedSelectedMajor.charAt(i)) {
          tempBoxColorArray[i] = "green";
        } else {
          for (var j = 0; j < paddedSelectedMajor.length; j++) {
            if (paddedSelectedMajor.charAt(j) == paddedCorrectMajor.charAt(i)) {
              if (tempBoxColorArray[j] == "black") {
                tempBoxColorArray[j] = "gold";
                break;
              }
            }
          }
        }
      }
    }
    var offset = difficultyLength[difficulty] - 5;
    for (var i = 0; i < correctNumberString.length; i++) {
      tempBoxArray[i + offset] = selectedNumberString.charAt(i);
      if (correctNumberString.charAt(i) == selectedNumberString.charAt(i)) {
        tempBoxColorArray[i + offset] = "green";
      } else {
        for (var j = 0; j < selectedNumberString.length; j++) {
          if (selectedNumberString.charAt(j) == correctNumberString.charAt(i)) {
            if (tempBoxColorArray[j + offset] == "black") {
              tempBoxColorArray[j + offset] = "gold";
              break;
            }
          }
        }
      }
    }
    setBoxArray([...boxArray, ...tempBoxArray]);
    setBoxColor([...boxColor, ...tempBoxColorArray]);
	}

  function checkVictory() {
    if (selectedMajor == correctMajor && selectedNumberString == correctNumberString) {
      setGameEnd(true);
      setVictoryPopup(true);
    }
  }

  function getCorrectValue() {
    var random = courses[parseInt(Math.random() * courses.length)];
    setCorrectMajor(random.split(" ")[0]);
    const correctCourseNumber = random.split(" ")[1];
    const correctCreditHour = random.charAt(random.length - 2);
    setCorrectCourseNumber(correctCourseNumber);
    setCorrectCreditHour(correctCreditHour);
    setCorrectNumberString(correctCourseNumber.toString() + correctCreditHour);
  }

  function getShareString() {
    var returnString = "Techdle"
      + "\nhttps://haidao0923.github.io/techdle/"
      + "\nMajor: " + correctMajor
      + "\nCourse Number: " + correctCourseNumber
      + "\nCredit Hour: " + correctCreditHour;
    returnString += (difficulty == 0) ? "\nMode: Easy" : "\nMode: Hard";
    for (var i = 0; i < boxColor.length; i++) {
      if (i %  difficultyLength[difficulty] == 0) {
        returnString += "\n";
      }
      if (boxColor[i] == "black") {
        returnString += "⬛";
      } else if (boxColor[i] == "gold") {
        returnString += "🟨";
      } else {
        returnString += "🟩";
      }
    }
    setShareString(returnString);
    navigator.clipboard.writeText(returnString).then(() => {
      alert("Text copied to clipboard.");
    });
  }

  function getPreviousShareString() {
    if (shareString == undefined) {
      alert("No previous word completed.");
    } else {
      navigator.clipboard.writeText(returnString).then(() => {
        alert("Text copied to clipboard.");
      });
    }
  }

  function resetGame() {
    setGameEnd(false);
    getCorrectValue();
    setBoxArray([]);
    setBoxColor([]);
  }

  function LoadCourses() {
    useEffect(() => {
      fetch(course_list)
      .then((response) => response.text())
      .then((textContent) => {
        setCourses(textContent.split('\n'));
      })
    }, [])
  }

  function LoadMajors() {
    useEffect(() => {
      fetch(major_list)
      .then((response) => response.text())
      .then((textContent) => {setMajors(textContent.split('\n'))})
    }, [])
  }

}

export default Home;