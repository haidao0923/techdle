import React, {useState, useEffect} from "react";
import Dropdown from "../Components/Dropdown";
import Grid from "../Components/Grid";
import "../CSS/Home.css";
import course_list from "../Data/course_list.txt";
import major_list from "../Data/major_list.txt";
function Home(props) {
  const [courses, setCourses] = useState([]);
  const [majors, setMajors] = useState([]);
  const [major, setMajor] = useState();
  LoadCourses();
  LoadMajors();
  const [courseNumber, setCourseNumber] = useState(0);
  const [selected, setSelected] = useState([]);

  return (
    <div>
      <Dropdown className='dropdown' majors={majors} setMajor={setMajor} setCourseNumber={setCourseNumber}/>
      <Grid />
      <div className="button">
        <button onClick={() => {
          CheckInput();
        }}>ENTER</button>
        <p>You clicked {selected[0] + "; " + selected[1] + courses[2]} times</p>
      </div>
    </div>
  );

	function CheckInput() {
		if (major == undefined) {
      alert("Please select a major.");
    } else if (courseNumber < 1000 || courseNumber > 9999) {
			alert("Please input a valid course number between 1000 and 9999.");
		} else {
			setSelected([major, courseNumber]);
			UpdateGrid();
      CheckVictory();
		}
	}

	function UpdateGrid() {

	}

  function CheckVictory() {

  }

  function LoadCourses() {
    useEffect(() => {
      fetch(course_list)
      .then((response) => response.text())
      .then((textContent) => {setCourses(textContent.split('\n'))})
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