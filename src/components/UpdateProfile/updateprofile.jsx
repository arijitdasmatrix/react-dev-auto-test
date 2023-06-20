import React from "react";   
import { Routes, Route, useParams } from 'react-router-dom';


const UpdateProfile = () => {
    let { userId } = useParams();
    useEffect(() => {
    axios.get(`http://localhost:5000/Users/userdetails/${userId}`)
    .then((response) => {
    if(response.status == 200 && response.statusText == "OK") {
    console.log("EEEEE",response.data.users);
    // setUsers(response.data.users);
    }
    }).catch((error) => {
    console.log(error.message);
    });
    },[]);


return (
    <div>
    

    </div>
 )    

}  

export default UpdateProfile;