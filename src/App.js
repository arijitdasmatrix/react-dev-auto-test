import React, { useState, useRef , useEffect } from 'react';
import './App.css';

import FormInputText from './components/FormInput/formInputText';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import FormAlertMutedText from './components/mutedText/mutedText';
import Col from 'react-bootstrap/Col';
import Multiselect from 'multiselect-react-dropdown';
import axios from 'axios';
import Listing from "./components/LIsting/listing";
function App() {
  const [user,setUser] = useState();
  const [inputValue, setInputValue] = useState({ name: "",  description: "", gender :"", dateofbirth:"", country:"", email:"", phone:"" });
  const [inputValidError, setInputValidError] = useState({ 
  nameErr: "", 
  descriptionErr: "",
  genderErr :"",
  dateofbirthErr:"",
  countryErr:"",
  interestErr:"",
  sportsInterestErr:"",
  ImageErr:"",
  multipleImageErr:"",
  emailErr:"",
  phoneErr:""
  });
  const [toggle,setToggle] = useState(false);
  const [interestOptions,setInterestOptions] = useState(["Sports","Study","Music","Dance"]);
  const [uploadedImage,setUploadedImage] = useState({profileImage:null,uploadedImage:null});
  const [MultiSelectData,setMultiSelectData] = useState([]);
  const [sportsInterestData,setSportsInterestData] = useState([]);
  const multiselectRef = useRef(null);
  const [multipleImageFiles,setMultipleImageFiles] = useState(null);
  const [profileImage,setProfileImage] = useState(null);
  const handleChange = (e) => {
  const { name, value } = e.target;
  if(name == "name" ) {
    setInputValidError(inputValidError => ({
    ...inputValidError,
    nameErr: "",
    }));
    } else if ( name == "description" ) {
    setInputValidError(inputValidError => ({
    ...inputValidError,
    descriptionErr: "",
    }));
    } else if ( name == "gender" ) {
    setInputValidError(existingValues => ({
    ...existingValues,
    genderErr: "",
    }));  
    } else if ( name == "dateofbirth" ) {
    setInputValidError(inputValidError => ({
    ...inputValidError,
    dateofbirthErr: "",
    }));
    } else if ( name == "country" ) {
    setInputValidError(inputValidError => ({
    ...inputValidError,
    countryErr: "",
    }));
    } else {

    }

    setInputValue((prev) => ({
    ...prev,
    [name]: value,
    }));
    };

    const sportsInterestDataHadleing = (e) => {
    const {value , checked } = e.target;
    setInputValidError(inputValidError => ({
    ...inputValidError,
    sportsInterestErr: "",
    }));
    if(checked) {
    setSportsInterestData([...sportsInterestData,value]);
    } else {
    setSportsInterestData(sportsInterestData.filter((e) => e !== value));
    }
    }
  
  const onImageChange = (event) => {
  if(event.target.files.length > 1) {
  setInputValidError(inputValidError => ({
  ...inputValidError,
  multipleImageErr: "",
  }));
  setMultipleImageFiles(event.target.files);
  } else {
  setInputValidError(inputValidError => ({
  ...inputValidError,
  ImageErr: "",
  }));
  setProfileImage(event.target.files[0]);
  }

  }

  const handleSubmit = (e) => {
  e.preventDefault();
  if(inputValue.name == "") {
  setInputValidError(inputValidError => ({
  ...inputValidError,
  nameErr: "Please Enter Your Name",
  }));
  return;
  } else if (inputValue.description == "" ) {
  setInputValidError(inputValidError => ({
  ...inputValidError,
  descriptionErr: "Please Enter Your Description",
  }));
  return; 
  } else if (inputValue.gender == "" ) {
  setInputValidError(existingValues => ({
  ...existingValues,
  genderErr: "Please Select Your Gender",
  }));  
  return;
  } else if (inputValue.dateofbirth == "") {
  setInputValidError(inputValidError => ({
  ...inputValidError,
  dateofbirthErr: "Please Select Your Date Of Birth",
  }));
  return;
  } else if (inputValue.country == "" ) {
  setInputValidError(inputValidError => ({
  ...inputValidError,
  countryErr: "Please Select Your Country",
  }));
  return;
  } else if (MultiSelectData.length ==  0 ) {
  setInputValidError(inputValidError => ({
  ...inputValidError,
  interestErr: "Please Select Your Interest",
  }));
  return;
  } else if (sportsInterestData.length == 0 ) {
  setInputValidError(inputValidError => ({
  ...inputValidError,
  sportsInterestErr: "Please Select Your Sports Interest",
  }));
  return;
  } 
  else if (multipleImageFiles == null ) {
  setInputValidError(inputValidError => ({
  ...inputValidError,
  multipleImageErr: "Please Upload your certificates",
  }));
  return;
  }   
  else if (profileImage == null ) {
  setInputValidError(inputValidError => ({
  ...inputValidError,
  ImageErr: "Please Upload Your Profile Image",
  }));
  return;
  } else {
   const formData = new FormData();
   Array.from(multipleImageFiles).forEach(image => {
   formData.append("images", image);
   });
   axios.post('http://localhost:5000/multipleUploads', formData, {
   headers: {
   'Content-Type': 'multipart/form-data',
   'Access-Control-Allow-Origin': '*'
   }
   })
   .then((response) => { 
   if(response.data.message == "Image Uploaded successfully") {
   const certificatesresponse = response.data.file;
   console.log("profile_image",profileImage);
   const formData = new FormData();
   formData.append("image",profileImage);
   axios.post('http://localhost:5000/upload', formData, {
   headers: {
   'Content-Type': 'multipart/form-data',
   'Access-Control-Allow-Origin': '*'
   }
   })
   .then((response) => { 
   if(response.data.message == "Image Uploaded successfully") {
   const profileimageresponse =  response.data.file;
  const data =  {
    name:inputValue.name,
    comment:inputValue.description, 
    gender : inputValue.gender, 
    dateofbirth : inputValue.dateofbirth, 
    country: inputValue.country, 
    degreeandcertificates:JSON.stringify(certificatesresponse), 
    interest:JSON.stringify(MultiSelectData), 
    profileImage:profileimageresponse, 
    sportsInterest:JSON.stringify(sportsInterestData),
    email:inputValue.email,
    phone:inputValue.phone
    }
    axios.post('http://localhost:5000/Users', data, {
      headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
      }
      }).then((response) => {
        setToggle(!toggle);  
      console.log("response",response);
      }).catch((error) => {
        console.log("response",error);
      })

   } 
   }).catch((error) => {
   console.log(error.message);
   });

   }
   }, (error) => {
   console.log(error);
   });  
  }  

  }
  console.log("tottle",toggle);
 
  return (
  <div className="App">
  <div className='slot-button' >     
  <button className='add-button-style'> Add </button> 
  </div> 
  <Container>
  <Row>
  <Col>
  <Form className='form-body' onSubmit={handleSubmit} >
  <Form.Group>  
  <Form.Control type="text" placeholder="Enter Your Name" lebel="Name :"  className="form-input" name="name" onChange={handleChange} value={inputValue.name}/>
  <FormAlertMutedText text={inputValidError.nameErr}  />
  </Form.Group>
  <br/>
  <Form.Group>  
  <Form.Control type="text" placeholder="Enter Your Phone No" lebel="Phone No :"  className="form-input" name="phone" onChange={handleChange} value={inputValue.phone}/>
  <FormAlertMutedText text={inputValidError.phoneErr}  />
  </Form.Group>
  <br/>
  <Form.Group>  
  <Form.Control type="text" placeholder="Enter Your Email" lebel="Email :"  className="form-input" name="email" onChange={handleChange} value={inputValue.email}/>
  <FormAlertMutedText text={inputValidError.emailErr}  />
  </Form.Group>
  <br/>
  <Form.Group> 
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
  <FormAlertMutedText text={inputValidError.descriptionErr}  />
  </Form.Group>
  
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
   <FormAlertMutedText text={inputValidError.genderErr}  />
  </Form.Group>

  <Form.Group>
  <Form.Control type="date"  lebel="Date Of Birth :"   className='form-input' onChange={handleChange} name="dateofbirth" value={inputValue.dateofbirth}/>
  <FormAlertMutedText text={inputValidError.dateofbirthErr}  />
  </Form.Group>
 
  <Form.Group className='RadioButtonDesign'>
  <p inline >Sports Interest :   </p>  
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
  <Form.Check type="checkbox" label="Football" value="Football" name="sportsInterest"  inline onChange={sportsInterestDataHadleing} />
  <Form.Check type="checkbox" label="Cricket" value="Cricket"  name="sportsInterest"  inline onChange={sportsInterestDataHadleing}/>
  <Form.Check type="checkbox" label="Basketball" value="Basketball"  name="sportsInterest"  inline onChange={sportsInterestDataHadleing}/>
  </Form.Group>
  <FormAlertMutedText text={inputValidError.sportsInterestErr}  />
  </Form.Group>
  <Form.Group>
  <FormAlertMutedText />
  </Form.Group>
  
  
  <Form.Group controlId="selectCountry" className="mb-3">
  <label  for="country"   >Choose Your country:</label>
  <Form.Select aria-label="Default select example" style={{width:"100%"}} name="country" value={inputValue.country} onChange={handleChange} id="country">
  <option value="">Select Your Country</option>
  <option value="India">India</option>
  <option value="UK">UK</option>
  <option value="USA">USA</option>
  </Form.Select>
  <FormAlertMutedText text={inputValidError.countryErr} />
  </Form.Group>

<Form.Group controlId="formFile" className="mb-3">
<Form.Label>PLease Upload Your Degree and Certificates</Form.Label>
<Form.Control type="file" onChange={onImageChange} multiple />
<FormAlertMutedText text={inputValidError.multipleImageErr} />
</Form.Group>

<Form.Group controlId="formFile" className="mb-3">
<Form.Label>Profile Image</Form.Label>
<Form.Control type="file" onChange={onImageChange}  />
<FormAlertMutedText text={inputValidError.ImageErr} />
</Form.Group>
<Form.Group controlId="formFile" className="mb-3">
<Form.Label>Profile Image</Form.Label>
<Multiselect
  isObject={false}
  onRemove={(e) => {setInputValidError(inputValidError => ({...inputValidError,interestErr: ""})); setMultiSelectData(Array.isArray(e) ? e.map(x => x) : []);}}
  onSelect={(e) => {setInputValidError(inputValidError => ({...inputValidError,interestErr: ""}));  setMultiSelectData(Array.isArray(e) ? e.map(x => x) : []);}}
  options={interestOptions}
/>
<FormAlertMutedText text={inputValidError.interestErr} />
</Form.Group>
<br/>
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
  <Listing changes={toggle}/>
 </div>
  );
}

export default App;
