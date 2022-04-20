import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"", email:"", password:"",cpassword:""})
    let navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, password}) 
     
          });
          const json = await response.json();
          console.log(json);
          
          if(json.success){
            //Save the auth token on local storage
            localStorage.setItem('token',json.authtoken);
            navigate("/");
            props.showAlert('Account Created Successfully',"success")
          }else{
              props.showAlert("invalid Credentials", "danger");
          }

    }

    const handleChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div className='container'>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" onChange={handleChange}id="name" name="name" />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" name="email" className="form-control" onChange={handleChange}id="email" aria-describedby="emailHelp"/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" name="password" onChange={handleChange}className="form-control" id="password" />
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" name="cpassword" className="form-label">Confirm Password</label>
                <input type="password" name="cpassword" onChange={handleChange}className="form-control" id="cpassword" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
    </div>
  )
}

export default Signup