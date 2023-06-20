import React, {useState , useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash , faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Alert } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
const Listing = (props) => {
    const [users,setUsers] = useState(null);
    const [deleteTimes,setDeleteTimes] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/Users')
        .then((response) => {
          console.log(response.data);
          console.log(response.status);
          console.log(response.statusText);
          console.log(response.headers);
          console.log(response.config);
        if(response.status == 200 && response.statusText == "OK") {
          console.log("EEEEE",response.data.users);
          setUsers(response.data.users);
        }
        }).catch((error) => {
        console.log(error.message);
        });
        },[props.changes,deleteTimes]);
    
const deleteUser = (data) => {
  axios.delete(`http://localhost:5000/Users/deleteUser/${data}`)
  .then((response) => {
  if(response.status == 200 && response.statusText == "OK") {
  setDeleteTimes(deleteTimes + 1);
  toast.success('Deleted successfully !', {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 5000
  });
  }
  }).catch((error) => {
  console.log(error.message);
  });
};


const updateUser = (data) => {
  navigate("/session-timed-out");
}

return (
<>
<table id="customers">
  <thead>

  <tr>
    <th>Name</th>
    <th>Description</th>
    <th>Gender</th>
    <th>Email</th>
    <th>Date Of Birth</th>
    <th>Degree And Certificates</th>
    <th>Sports Interest</th>
    <th>Profile Image</th>
    <th>Country</th>
    <th>Phone Number</th>
    <th>Interests</th>
    <th>Actions</th>
  </tr>
 
  
  </thead>
  <tbody>

  


  {
   users != null ? users[0].map((user,index) => {
    return (
    <tr>
    <td>{user.name}</td>
    <td>{user.comment}</td>
    <td>{user.Gender}</td>
    <td>{user.Email}</td>
    <td>{user.dateofbirth}</td>
    <td><ul>{user.degreeandcertificates.split(',').map((user) => { return <li><img src={`http://${user}`} width={150}  /> </li>}) }</ul></td>
    <td><ul>{user.sportsInterest.split(',').map((user) => { return <li>{user}</li>}) }</ul></td>
    <td><img src={`http://${user.profileImage}`} width={150}/></td>
    <td>{user.country}</td>
    <td>{user.PhoneNo}</td>
    <td><ul>{user.interest.split(',').map((user) => { return <li>{user}</li>}) }</ul></td>
    <td><button> <FontAwesomeIcon icon={faTrash} onClick={() => { deleteUser(user.id)  }} /> </button> || <button><FontAwesomeIcon  onClick={() => { updateUser(user.id)  }}  icon={faPenToSquare} /></button> </td>
  </tr>
    )
   }) : <h2>Loading</h2>
   } 


  

  </tbody>
  </table>   
  <ToastContainer />
</>
)

}


 export default Listing;