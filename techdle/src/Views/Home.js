import React, {useState} from "react";
import Dropdown from "../Components/Dropdown";
import "../CSS/Home.css";
import course_list from "../Data/course_list";
import major_list from "../Data/major_list";
function Home(props) {
	var courses = course_list;
	const majors = major_list;
  const option2 = ["A","B","C","D","E"]
  const [value1, setValue1] = useState(majors[0]);
  const [value2, setValue2] = useState(option2[0]);
  const [selected, setSelected] = useState([]);
  return (
    <div>
      <Dropdown className='dropdown' majors={majors} option2={option2} setValue1={setValue1} setValue2={setValue2}/>
      <div className="button">
        <p>You clicked {selected[0] + "; " + selected[1] + courses[2]} times</p>
        <button onClick={() => {
          CheckInput();
        }}>ENTER</button>
      </div>
    </div>
  );

	function CheckInput() {
		setSelected([value1, value2]);
	}
}

export default Home;