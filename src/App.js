import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash , faPenToSquare } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
  <div className="App">
  <div className='slot-button' >  
  <button className='add-button-style'> Add </button> 
  </div> 
  <table id="customers">
  <tr>
    <th>Name</th>
    <th>Father's Name</th>
    <th>Mothers's Name</th>
    <th>Gender</th>
    <th>Date Of Birth</th>
    <th>Education</th>
    <th>Actions</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
    <td>Male</td>
    <td>20-01-1995</td>
    <td>B-tech</td>
    <td><button> <FontAwesomeIcon icon={faTrash} /> </button> || <button><FontAwesomeIcon icon={faPenToSquare} /></button> </td>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
    <td>Male</td>
    <td>20-01-1995</td>
    <td>B-tech</td>
    <td><button> <FontAwesomeIcon icon={faTrash} /> </button> || <button><FontAwesomeIcon icon={faPenToSquare} /></button> </td>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
    <td>Male</td>
    <td>20-01-1995</td>
    <td>B-tech</td>
    <td><button> <FontAwesomeIcon icon={faTrash} /> </button> || <button><FontAwesomeIcon icon={faPenToSquare} /></button> </td>
  </tr>
</table>
 </div>
  );
}

export default App;
