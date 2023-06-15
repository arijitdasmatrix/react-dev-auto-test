import React, {useState , useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash , faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

  


const Listing = (props) => {
    const [users,setUsers] = useState(null);

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
        },[props.changes]);
      
     //   console.log("usersss",users[0],props.changes);

     function myFunction(data) {
       console.log("data",data);
       
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
    <th>Sports Interest</th>
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

<td>{  

   
   myFunction(user.sportsInterest)

}</td>


    <td>B-tech</td>
    <td><button> <FontAwesomeIcon icon={faTrash} /> </button> || <button><FontAwesomeIcon icon={faPenToSquare} /></button> </td>
  </tr>
    )
   }) : <h2>Loading</h2>
   } 


  

  </tbody>
  </table>   
</>
)

}


 export default Listing;