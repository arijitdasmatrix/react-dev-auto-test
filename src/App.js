import React, { useState, useRef } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash , faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import FormInputText from './components/FormInput/formInputText';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import FormAlertMutedText from './components/mutedText/mutedText';
import Col from 'react-bootstrap/Col';
import Multiselect from 'multiselect-react-dropdown';

function App() {
  const [inputValue, setInputValue] = useState({ name: "", description: "", gender :"",dateofbirth:"",country:""});
  const [interestOptions,setInterestOptions] = useState(["Sports","Study","Music","Dance"]);
  const [MultiSelectData,setMultiSelectData] = useState([]);
  const [sportsInterestData,setSportsInterestData] = useState([]);
  const multiselectRef = useRef(null);
  const handleChange = (e) => {
  const { name, value } = e.target;
  setInputValue((prev) => ({
  ...prev,
  [name]: value,
  }));
  console.log(name, value);
  };


  const sportsInterestDataHadleing = (e) => {
  const {value , checked } = e.target;
  if(checked) {
    setSportsInterestData([...sportsInterestData,value]);
  } else {
    setSportsInterestData(sportsInterestData.filter((e) => e !== value));
  }
  }

  console.log("multiselectRef",MultiSelectData);  
  return (
  <div className="App">
  <div className='slot-button' >     
  <button className='add-button-style'> Add </button> 
  </div> 
  <Container>
  <Row>
  <Col>
  <Form className='form-body' action="/action_page.php">
 
 
  <FormInputText type="text" placeholder="Enter Your Name" lebel="Name :"  className="form-input" name="name" onChange={handleChange} value={inputValue.name}/>
  
  
  <FloatingLabel controlId="floatingTextarea2" label="Comments">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          name="description"
          value={inputValue.description}
          style={{ height: '100px',width:"100%" }}
          onChange={handleChange}
        />
  </FloatingLabel> 
  <FormAlertMutedText />
  
  
  
  
  <Form.Group className='RadioButtonDesign'>
  <p>Gender :</p>  
  <Form.Check
   value="Male"
   type="radio"
   aria-label="radio 1"
   label="Design"
   onChange={handleChange}
   name="gender"
   checked={inputValue.gender == "Male" ? true : false}
   />
   <Form.Check
   value="Female"
   type="radio"
   aria-label="radio 2"
   label="Food"
   name="gender"
   onChange={handleChange}
   checked={inputValue.gender == "Female" ? true : false}
   />
   </Form.Group>
   
   <Form.Group>
   <FormAlertMutedText /> 
  </Form.Group>


  <FormInputText type="date"  lebel="Date Of Birth :"   className='form-input' onChange={handleChange} name="dateofbirth" value={inputValue.dateofbirth}/>
 
 
  <Form.Group className='RadioButtonDesign'>
  <p inline >Sports Interest :   </p>  
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
  <Form.Check type="checkbox" label="Football" value="Football" name="sportsInterest"  inline onChange={sportsInterestDataHadleing} />
  <Form.Check type="checkbox" label="Cricket" value="Cricket"  name="sportsInterest"  inline onChange={sportsInterestDataHadleing}/>
  <Form.Check type="checkbox" label="Basketball" value="Basketball"  name="sportsInterest"  inline onChange={sportsInterestDataHadleing}/>
  </Form.Group>
  </Form.Group>
  <Form.Group>
  <FormAlertMutedText />
  </Form.Group>
  
  
  <Form.Group controlId="selectCountry" className="mb-3">
  <label  for="country"   >Choose Your country:</label>
  <Form.Select aria-label="Default select example" style={{width:"100%"}} name="country" value={inputValue.country} onChange={handleChange} id="country">
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
    <option value="opel">Opel</option>
    <option value="audi">Audi</option>
  </Form.Select>
  <FormAlertMutedText />
  </Form.Group>

<Form.Group controlId="formFile" className="mb-3">
<Form.Label>PLease Upload Your Degree and Certificates</Form.Label>
<Form.Control type="file" multiple />
<FormAlertMutedText />
</Form.Group>
<Multiselect
  isObject={false}
  onRemove={(e) => {setMultiSelectData(Array.isArray(e) ? e.map(x => x) : []);}}
  onSelect={(e) => {setMultiSelectData(Array.isArray(e) ? e.map(x => x) : []);}}
  options={interestOptions}
  
/>

<Form.Group  className="mb-3">
  <Button variant="primary" type="submit">
    Submit
  </Button>
  </Form.Group>
  </Form>
  </Col>
  </Row>
</Container>
  <div  >
  
  </div> 
  <table id="customers">
  <thead>
  <tr>
    <th>Name</th>
    <th>Father's Name</th>
    <th>Mothers's Name</th>
    <th>Gender</th>
    <th>Date Of Birth</th>
    <th>Education</th>
    <th>Actions</th>
  </tr>
  </thead>
  <tbody>
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
  </tbody>
</table>
 </div>
  );
}

export default App;
