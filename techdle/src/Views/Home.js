import React, {useState, useEffect} from "react";
import NavBar from "../Components/NavBar";
import Dropdown from "../Components/Dropdown";
import Grid from "../Components/Grid";
import Popup from "../Components/Popup";
import "../CSS/Home.css";
import course_list from "../Data/course_list.txt";
import major_list from "../Data/major_list.txt";

import Test from "../Components/Test";

function Home(props) {
  const [courses, setCourses] = useState([]);
  const [majors, setMajors] = useState([]);
  LoadCourses();
  LoadMajors();
  const [welcomePopup, setWelcomePopup] = useState(true);
  const [instructionPopup, setInstructionPopup] = useState(true);
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

  useEffect(() => {
    if (correctNumberString == undefined) {
      return;
    }
    UpdateGrid();
    console.log("test");
    console.log(boxArray);
    console.log(boxColor);
    console.log(correctNumberString);
  }, [selectedMajor, selectedNumberString])

  return (
    <div className="background">
      <NavBar setInstructionPopup={setInstructionPopup}/>
      <Dropdown
        className='dropdown'
        majors={majors}
        setMajor={setMajor}
        setCourseNumber={setCourseNumber}
        setCreditHour={setCreditHour}/>
      <div className="button">
        <button onClick={() => CheckInput()}>ENTER</button>
        <p className="text">You clicked {correctMajor + " " + correctNumberString} times</p>
      </div>
      <Grid boxArray={boxArray} boxColor={boxColor}/>
      <Popup
        className="instruction"
        isActive={instructionPopup}>
          <h3>Instruction</h3>
          <button
            className="close-btn"
            onClick={() => setInstructionPopup(false)}>Close
          </button>
      </Popup>
      <Popup
        className="welcome"
        isActive={welcomePopup}>
          <h3>Welcome to Techdle</h3>
          <button
            className="start-btn"
            onClick={() => {
              setWelcomePopup(false);
              GetCorrectValue();
            }}>Start Game
          </button>
      </Popup>
      <Test></Test>
    </div>
  );

	function CheckInput() {
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

	function UpdateGrid() {

    var tempBoxArray = Array.from({length: 6}).fill("");
    var tempBoxColorArray = Array.from({length: 6}).fill("black");
    tempBoxArray[0] = selectedMajor;
    console.log(tempBoxArray[0] == correctMajor);
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
    for (var i = 0; i < correctNumberString.length; i++) {
      tempBoxArray[i + 1] = selectedNumberString.charAt(i);
      if (correctNumberString.charAt(i) == selectedNumberString.charAt(i)) {
        tempBoxColorArray[i + 1] = "green";
      } else {
        for (var j = 0; j < selectedNumberString.length; j++) {
          if (selectedNumberString.charAt(j) == correctNumberString.charAt(i)) {
            if (tempBoxColorArray[j + 1] == "black") {
              tempBoxColorArray[j + 1] = "gold";
              break;
            }
          }
        }
      }
    }
    setBoxArray([...boxArray, ...tempBoxArray]);
    setBoxColor([...boxColor, ...tempBoxColorArray]);
	}

  function CheckVictory() {

  }

  function GetCorrectValue() {
    var random = courses[parseInt(Math.random() * courses.length)];
    setCorrectMajor(random.split(" ")[0]);
    const correctCourseNumber = random.split(" ")[1];
    setCorrectCourseNumber(correctCourseNumber);
    const correctCreditHour = random.charAt(random.length - 2);
    setCorrectCreditHour(correctCreditHour);
    setCorrectNumberString(correctCourseNumber.toString() + correctCreditHour);
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