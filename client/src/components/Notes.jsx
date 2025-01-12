import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Notes = () => {
    const [user,setUser]=useState(null)
    const navigate = useNavigate();
    useEffect(() => {
        axios
        .get("http://localhost:5000/@me",{withCredentials:true})
        .then(res =>{console.log(res.data)
          setUser(res.data)
        } )
        .catch((err) => console.log(err)); 
    },[navigate])
        
    const handleLogout = () => {
        axios
        .get("http://localhost:5000/logout", { withCredentials: true })
        .then(() => {
          setUser(null);
          navigate("/"); 
        })
        .catch((err) => {
          console.error("Logout failed:", err);
        });
    }
  return (
    <div>
        <h1 className='text-3xl pt-10 pl-14'>Notes</h1>
        <h2 className='text-xl pt-2 pl-14'>{user ? (
        <h2>Hello, {user.user_name}</h2>
      ) : (
        <h2>Loading user data...</h2>
      )}</h2>
      <button type="button" class="btn btn-outline-danger ml-16 mt-7" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Notes
