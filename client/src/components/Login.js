import React, {useState} from "react";
import {axiosWithAuth} from '../utils/axiosWithAuth';
import {useHistory} from 'react-router-dom';

const Login = (props) => {
     
  // set the state for credentials
   const [creds, setCreds] = useState({
     username:"",
     password: ""
   })

   let history = useHistory()

   // create the handleChanges
   const handleChanges = (e) =>{
     setCreds({...creds, [e.target.name]: e.target.value})
   }

  // make a post request to retrieve a token from the api
   const handleSubmit = (e) => {
   e.preventDefault()
   axiosWithAuth()
   .post("/api/login", creds)
   .then(res=>{
    console.log("I am response from login", res)
    window.localStorage.setItem("token", res.data.payload)
    // when you have handled the token, navigate to the BubblePage route
     props.history.push('/protected')
  })
   .catch(err=>console.log(err))
 }

  


  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      {/* build the login page here */}
      
      <form onSubmit = {handleSubmit}>
                <div>
                    <input 
                    type ="text"
                    name = "username"
                    placeholder ="username"
                    value= {creds.username}
                    onChange = {handleChanges}
                    />
                </div>
                <div>
                    <input 
                    type ="password"
                    name = "password"
                    placeholder ="password"
                    value= {creds.password}
                    onChange = {handleChanges}
                    />
                </div>
                <button type = "submit">Login</button>                
            </form>
    </>
  );
};

export default Login;
