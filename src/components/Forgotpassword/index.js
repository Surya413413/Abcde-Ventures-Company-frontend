
import { Component } from "react"

import {Link} from "react-router-dom"
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import "./index.css"
import { Navigate, redirect, useNavigate } from "react-router-dom";
class Forgotpassword extends Component {
state = {email:"",redirect:false}

onChangeemail = (event) => {
    this.setState({email:event.target.value})

}

renderemailfiled = () => {
    const {email} = this.state
    return (
      
        <div className="field">
  <span className="field__icon" aria-hidden="true">
    <Mail className="field__icon_svg" />
  </span>
  <input type="text" placeholder="Enter Your Email Address" required className="field__input" onChange={this.onChangeemail} value={email}/>
</div>
    )
}

render(){
    const {redirect} = this.state
   

 return (
        <div className="form-card" >
   
    <div className="">
   <img src="/abcdeforgotpassword.jpg" className="imagegen"/>
    </div> 
        <h1>Forgot Password?</h1>
        <p>No worries! Enter your email address and we'll send you a link to reset your password.</p>
   
<form onSubmit={this.formSubmit} className="formcss">
        <div className="emailfiledrender">{this.renderemailfiled()}</div>
       
    <button className="buttonsgin" type="submit">
  <span className="buttonsgin__label">Send Reset Link</span>
  <span className="buttonsgin__icon" aria-hidden="true">→</span>
</button>

<p> <span className="signspan">
    <Link to="/login" className="linksign" >Back to Sgin In →</Link>
    </span></p>
</form>
        </div>
    )
}
    }
   

export default Forgotpassword