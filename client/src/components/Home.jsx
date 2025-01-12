import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home= () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2 className='pt-28 pl-10 pb-3'>Welcome to authentication using flask</h2>
      <button type="button" class="btn btn-outline-primary ml-10 mr-6" onClick={() => navigate("/login")}>Login</button>
      <button type="button" class="btn btn-outline-primary" onClick={() => navigate("/signup")}>Signup</button>
    </div>
  )
}

export default Home
