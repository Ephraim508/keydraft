import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Index.css";
const Login = () => {
    const [credentials,setCredentials]=useState({
        "username":"",
        "password":""
    })
    const navigate=useNavigate()

    const checkCredentials=()=>{
        if(credentials.username==="barath"){
            if(credentials.password==="12345"){

            navigate("/home")
            }
        }
    }
  return (
    <div>
        <img
        src="https://res.cloudinary.com/dgq6hbukw/image/upload/v1735733538/jln18rm5xcasgnj8cbvt.png"
        alt="logo"
        style={{
          width: "55%",
          height: "80%",
          position: "fixed",
          top: "30%",
          zIndex: -1,
          filter: "blur(10px)",
        }}
      />
        <div className="login-container">
      

      <div className="login-main-container">
        <div className="login-main-logos">
          <img
            src="https://res.cloudinary.com/dgq6hbukw/image/upload/v1735732932/hcocak9gk7lyteem8khp.png"
            alt="main-logo"
            style={{height:"55px"}}
          />
          <img
            src="https://res.cloudinary.com/dgq6hbukw/image/upload/v1735732932/wco08my40zihqqa6eurb.png"
            alt="digltrac"
            style={{height:"50px"}}
          />
        </div>
        <h1>Login</h1>
        <form onSubmit={checkCredentials()}>
        <div className="login-username">
        <input 
  type="text" 
  placeholder="Username" 
  className="login" 
  autoComplete="off" 
  value={credentials.username}  
  onChange={(e) => {
    setCredentials({ ...credentials, username: e.target.value });
  }} 
/>

        </div>
        <div className="login-password">
           <input type="password" placeholder="Password" className="password" autoComplete="off" value={credentials.password} 
           onChange={(e)=>{
            setCredentials({...credentials,password:e.target.value})
           }}/>
        </div>
        <button className="login-button"  type="submit">Login</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;

