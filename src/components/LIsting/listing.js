import React, {useState , useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash , faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

  


const Listing = () => {
    const [users,setUsers] = useState([]);

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
        }
        }).catch((error) => {
        console.log(error.message);
        });
        },[]);
      
      //  console.log("users",users);
return (
<>
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

  { users.length > 0 ?  users.users.map((user,index) => {
 
 return (
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
    <td>Male</td>
    <td>20-01-1995</td>
    <td>B-tech</td>
    <td><button> <FontAwesomeIcon icon={faTrash} /> </button> || <button><FontAwesomeIcon icon={faPenToSquare} /></button> </td>
  </tr>
  )

})
 : "Loading"
}  

  </tbody>
  </table>   
</>
)

}


 export default Listing;