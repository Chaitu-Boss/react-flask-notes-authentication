import React,{useState} from 'react'
import axios from 'axios'
const Signup = () => {
    function handleSubmit(e) {
        e.preventDefault();
        axios.post("http://localhost:5000/signup", {
            "email": e.target.email.value,
            "password": e.target.password.value,
            "user_name": e.target.user_name.value
        })
            .then(res => {
                alert("User Created");
                e.target.reset();
            })
            .catch(err => {
                if (err.response && err.response.status === 409) {
                    alert("User Already Exists");
                    e.target.reset();
                }
                else if (err.response && err.response.status === 400) {
                    alert("All fields are required");
                    e.target.reset();
                }
                else {
                    alert("An error occurred");
                }
            })
            
    }
      const [fieldType, setFieldType] = useState("password");
        const [classType, setClassType] = useState("bi bi-eye icon");
        function handleClick(){
            if(fieldType==="password"){
              setFieldType("text")
              setClassType("bi bi-eye-slash icon")
            }
            else{
              setFieldType("password")
              setClassType("bi bi-eye icon")
            }
          }
    return (
        <div>
            <form onSubmit={handleSubmit} className='w-96 mx-auto pt-10'>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Username</label>
                    <input type="" className="form-control" name="user_name"id="" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <div className='flex'>
                    <input type={fieldType} className="form-control" name="password" id="exampleInputPassword1" />
                    <span className='relative right-6 top-2 cursor-pointer'> <i class={classType} onClick={handleClick}></i></span>
                    </div>
                   
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
