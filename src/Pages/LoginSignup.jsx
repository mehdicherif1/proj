import React, {useState} from 'react'
import './CSS/LoginSignup.css'



const LoginSignup = () => {

  const [state,setState] = useState("Login");

  
   const [formData,setFormData] = useState({
    username:"",
    password:"",
    email:""
   })

   const changeHandler = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
   }

  
  const login = async () =>{
    console.log("Login Function Executed",formData);
    let responseData;
    await fetch('http://localhost:4000/login',{
      method:'Post',
      headers:{
        Accept:'application/form-data',
        'content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response)=> response.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auh-token',responseData.token);
      window.location.replace("/");
    }
  }
  const signup = async () => {
    console.log("Signup Function Executed", formData);
    let responseData;
    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      responseData = await response.json();
      
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
      } else {
        console.error("Signup failed:", responseData.errors);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  }
  


  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Sign Up"?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' />:<></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
          <input type="password" placeholder='confirm password'/>
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        {state==="Sing Up"? <p className="loginsignup-login">Already have an account? <span onClick={()=>{setState("Login")}}>login here</span></p>:<p className="loginsignup-login">Create an account? <span onClick={()=>{setState("Signup")}}>Click here</span></p>}
        
        
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>by continuing, i agree to the terms of use and privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
