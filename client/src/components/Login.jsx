import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:5000/login",{
            "email":email,
            "password":password
        },{
            withCredentials:true
        })
        .then(res=>{
            alert("Login Successfull");
            setEmail("");
            setPassword("");
            navigate("/notes");
        })
        .catch(err => {
            if (err.response && err.response.status === 404) {
                alert("User does not exist");
                e.target.reset();
            }
            else if (err.response && err.response.status === 401) {
                alert("Password is incorrect");
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
        <div className='w-96 mx-auto pt-10'>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={email} id="exampleInputEmail1"  onChange={(e)=>setEmail(e.target.value)} name="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <div className='flex'>
                    <input type={fieldType} className="form-control"   value={password} onChange={(e)=>setPassword(e.target.value)} name="password" id="exampleInputPassword1" />
                    <span className='relative right-6 top-2 cursor-pointer'> <i class={classType} onClick={handleClick}></i></span>
                    </div>
                    
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default Login
