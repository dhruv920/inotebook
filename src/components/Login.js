import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"", password:""})
    let navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credentials.email, password:credentials.password}) 
     
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
            //Save the auth token on local storage
            localStorage.setItem('token',json.authtoken);
            navigate("/");
            props.showAlert('Login Successfully',"success")
          }else{
            props.showAlert("invalid Details", "danger");
          }

    }
    const handleChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" name="email"  onChange={handleChange}  value={credentials.email} id="email" className="form-control" aria-describedby="emailHelp" />
            <div id="emailHelp"  className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" name="password" onChange={handleChange} value={credentials.password} id="password" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
    </div>
  )
}

export default Login
