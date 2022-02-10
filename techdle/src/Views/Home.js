import React, {useState} from "react";
import Dropdown from "../Components/Dropdown";
import "../CSS/Home.css";
import course_list from "../Data/course_list";
import major_list from "../Data/major_list";
function Home(props) {
	var courses = course_list;
	const majors = major_list;
  const [major, setMajor] = useState(majors[0]);
  const [courseNumber, setCourseNumber] = useState(0);
  const [selected, setSelected] = useState([]);
  return (
    <div>
      <Dropdown className='dropdown' majors={majors} setMajor={setMajor} setCourseNumber={setCourseNumber}/>
      <div className="button">
        <p>You clicked {selected[0] + "; " + selected[1]} times</p>
        <button onClick={() => {
          CheckInput();
        }}>ENTER</button>
      </div>
    </div>
  );

	function CheckInput() {
		if (courseNumber < 1000 || courseNumber > 9999) {
			alert("Please input a valid course number between 1000 and 9999.")
		} else {
			setSelected([major, courseNumber]);
		}
	}
}

export default Home;