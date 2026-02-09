
import { Component } from "react"


import {Link} from "react-router-dom"
import { Eye, EyeOff, Mail, Lock, Github, Chrome } from 'lucide-react';
import "./index.css"
// import { Navigate, redirect, useNavigate } from "react-router-dom";
class Registerpage extends Component {
 state = {
    name: "",
    email: "",
    password: "",
    message:"",
    redirect:false,
    passwordValid: "" // live validation message
  }

  onChangename = (event) => {
this.setState({name:event.target.value})
  }

  handleChangeemail = event => {
    this.setState({email:event.target.value})
  }



passwordValidation = (pwd) => {
  // At least 7 chars, one number, one special char
  // const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{7,}$/;
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
  return regex.test(pwd);
}

  onChangepassword = event => {
    const password = event.target.value
    const passwordValid = this.passwordValidation(password)
    this.setState({password,passwordValid})

  }




formSubmit = async(event) => {
    event.preventDefault()
    const {name,email,password} = this.state 
 
    if(!name || !email || !password){
        this.setState({message: "All fields are required!"})
        return
    }

   const passwordValid = this.passwordValidation(password)
   if(!passwordValid){
   this.setState({message:passwordValid})
   return
   } 


    const formData = {
     name,
     email,
     password
    }
    const url ="http://localhost:3000/users/register"
    const option = {
        method:"POST",
        headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify(formData)
}

try{
  const response = await fetch(url,option)
 const data = await response.text();

console.log(data)
if (response.ok){
    this.setState({message:response.statusText,redirect:true,name:"",email:"",password:"",passwordValid:""})
   
}else{
  
    this.setState({ message: data.error || "Registration failed." })
}

}catch(error){
  this.setState({ message: `Network error :${error}. Please try again.` })
}

}




rendergithubfiled = () => {
    return (
      
        <div className="field">
  <span className="field__icon" aria-hidden="true">
    <Github className="field__icon_svg"/>
  </span>
  <input type="text" placeholder="Continue with GitHub" required className="field__input" />
</div>
    )
}

rendergooglefiled = () => {
    return (
      
        <div className="field">
  <span className="field__icon" aria-hidden="true">
    <Chrome className="field__icon_svg"/>
  </span>
  <input type="text" placeholder="Continue with Google" required className="field__input"/>
</div>
    )
}


rendernamefiled = () => {
    const {name} = this.state
    return (
      
        <div className="field">
  <span className="field__icon" aria-hidden="true">
    <Mail className="field__icon_svg" />
  </span>
  <input type="text" placeholder="Full Name" required className="field__input" onChange={this.onChangename} value={name}/>
</div>
    )
}


renderemailfiled = () => {
    const {email} = this.state
    return (
      
        <div className="field">
  <span className="field__icon" aria-hidden="true">
    <Mail className="field__icon_svg" />
  </span>
  <input type="text" placeholder="Email Address" required className="field__input" onChange={this.handleChangeemail} value={email}/>
</div>
    )
}

renderpasswordfiled = () => {
    const {password,passwordValid} = this.state
  
    return (
<>
<div className="field field--password is-hidden">
  <span className="field__icon" aria-hidden="true">
    <Lock className="field__icon_svg"/>
  </span>

  <input id="pwd" type="password" placeholder="Password" required className="field__input" onChange={this.onChangepassword} value={password} title="Minimum 7 characters, include at least one number and one special character"/>

  <button 
  type="button" 
  className="field__toggle" 
  aria-controls="pwd"  

>
    <Eye className="field__toggle-svg field__toggle--show"/>
    <EyeOff className="field__toggle-svg field__toggle--hide"/> 
  </button>
  
</div>

 {/*  Live validation message */}
        {!password && passwordValid && (
          <p className="password-hint">
            Password must be at least 6 characters and include a number and a
            special character.
          </p>
        )}
</>
    )
}



render(){
    const {message,redirect,passwordValid} = this.state

 return (
        <div className="form-card" >
   
    <div className="">
   <img src="/abcderegisterllogo.jpg" alt="Register illustration" className="imagegen"/>
    </div> 
        <h1>Create Account</h1>
        <p>Join us today and get started</p>
    
    <div className="emailfiledrender">{this.rendergooglefiled()}</div>
    <div className="emailfiledrender">{this.rendergithubfiled()}</div>
        <div className="dividerline">
  <span>or continue with email</span>
</div>
<form onSubmit={this.formSubmit} className="formcss">
        <div className="emailfiledrender">{this.rendernamefiled()}</div>
        
        <div className="emailfiledrender">{this.renderemailfiled()}</div>
        <div className="passwordfiledrender">{this.renderpasswordfiled()}</div>
   
      
    <button className="buttonsgin" type="submit"   disabled={!passwordValid} // only disabled if password invalid
    >
  <span className="buttonsgin__label">Create Account</span>
  <span className="buttonsgin__icon" aria-hidden="true">→</span>
</button>


{redirect && <p className="successmessage">*{message} Email and password are registered</p>}
<p>Already have an account  <span className="signspan">
    <Link to="/login" className="linksign" >→ Sign in</Link>
    </span></p>
</form>
        </div>
    )
}
    }
   

export default Registerpage
 





