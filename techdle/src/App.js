import logo from './logo.svg';
import './App.css';
import Dropdown from './Components/Dropdown';
import ReactDropdown from 'react-dropdown';

const options = [
  'one', 'two', 'three'
];
const defaultOption = options[0];

function App() {
  return (
    <div className="App">
      <Dropdown className='dropdown'/>
    </div>
  );
}

export default App;
