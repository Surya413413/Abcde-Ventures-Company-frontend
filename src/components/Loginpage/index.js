



import { Component } from "react"

import Cookies from "js-cookie";
import {Link} from "react-router-dom"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Github, Chrome } from 'lucide-react';
import "./index.css"
import { Navigate, redirect, useNavigate } from "react-router-dom";
class Loginpage extends Component {
state = {email:"",password:"",showSubmitError:false,errorMsg:"",redirect:false}

onChangeemail = (event) => {
    this.setState({email:event.target.value})

}
onChangepassword = (event) => {
    this.setState({password:event.target.value})
}

// onSubmittSucvcess = (jwtToken) => {

// Cookies.set("jwtToken", jwtToken,{expires:30})
// this.setState({ redirect: true }); // trigger redirect

// }

onsubmitFailure = (errorMsg) => {
    this.setState({showSubmitError:true,errorMsg})

}
formSubmit = async(event) => {
    event.preventDefault()
    const {email,password} = this.state 
    const userDetails = {email,password}
    const url ="http://localhost:3000/users/login"
    const option = {
        method:"POST",
        headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify(userDetails)
}

const response = await fetch(url,option)
 const data = await response.json()
console.log(data)
if (response.ok){
    // this.onSubmittSucvcess(data.token)
    // Cookies.set("jwtToken", data.token,{expires:30})
    Cookies.set("jwtToken", data.token, { expires: 30 });
this.setState({ redirect: true });
}else{
    this.onsubmitFailure(data.error_msg || "Invalid credentials")
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



renderemailfiled = () => {
    const {email} = this.state
    return (
      
        <div className="field">
  <span className="field__icon" aria-hidden="true">
    <Mail className="field__icon_svg" />
  </span>
  <input type="text" placeholder="Email Address" required className="field__input" onChange={this.onChangeemail} value={email}/>
</div>
    )
}

renderpasswordfiled = () => {
    const {password} = this.state
    return (

<div className="field field--password is-hidden">
  <span className="field__icon" aria-hidden="true">
    <Lock className="field__icon_svg"/>
  </span>

  <input id="pwd" type="password" placeholder="Password" required className="field__input" onChange={this.onChangepassword} value={password}/>

  <button type="button" className="field__toggle" aria-label="Show password" aria-controls="pwd" aria-pressed="false">
    <Eye className="field__toggle_svg field__toggle--show"/>
    <EyeOff className="field__toggle_svg field__toggle--hide"/>
  </button>
</div>


    )
}
render(){
    const {showSubmitError,errorMsg,redirect} = this.state
    const jwtToken = Cookies.get("jwtToken")
    if (jwtToken !== undefined && redirect){
    return <Navigate to="/home" replace/>;
    }

 return (
        <div className="form-card" >
   
    <div className="">
   <img src="/abcdeloginlogo.jpg" className="imagegen"/>
    </div> 
        <h1>Welcome Back</h1>
        <p>Sign in to your account</p>
    <div className="emailfiledrender">{this.rendergooglefiled()}</div>
    <div className="emailfiledrender">{this.rendergithubfiled()}</div>
        <div className="dividerline">
  <span>or continue with email</span>
</div>
<form onSubmit={this.formSubmit} className="formcss">
        <div className="emailfiledrender">{this.renderemailfiled()}</div>
        <div className="passwordfiledrender">{this.renderpasswordfiled()}</div>
        <div className="forgotpassworddiv">
            <Link to="/forgotpassword" className="forgotpassword">Forgot password?</Link>
        </div>
    <button className="buttonsgin" type="submit">
  <span className="buttonsgin__label">Sign In</span>
  <span className="buttonsgin__icon" aria-hidden="true">→</span>
</button>
{showSubmitError && <p className="error-message">*{errorMsg} Email and password Incorrect If you are not register please register</p>}
<p>Don't have an account?  <span className="signspan">
    <Link to="/register" className="linksign" >→ Sign up</Link>
    </span></p>
</form>
        </div>
    )
}
    }
   

export default Loginpage