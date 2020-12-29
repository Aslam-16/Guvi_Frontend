import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,Redirect
} from "react-router-dom";
import axios from 'axios'
import {Emailvalidate,Validpassword} from '../common/validate';
import { ToastContainer, toast  } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css'


class Login extends React.Component{
     constructor(props){
    super(props);
    this.state = {
      email                 : '', 
      password              : '',
      emailerror            : false,
      passworderror         : false,
      validmailerror        : "",
      validpassworderror    : "",
      emailvalue            : false,
      passwordvalue         : false,
      redirect:false
    }
    this.validlogin         = this.validlogin.bind(this)
  }
  validlogin(){
    const mail              = this.state.email;
    const password          = this.state.password;
    var emailcheck=0;
    var passwordcheck=0;
    if(mail){
          if(!Emailvalidate(mail)){
            emailcheck=0;
          }
          else{
            emailcheck=1;
          }
    }
    if(mail){
      this.setState({emailerror:false})
    }
    else {
      this.setState({emailerror:true})
    }
    if(password){
          if(!Validpassword(password)){
            passwordcheck=0;
          }
          else{
            passwordcheck=1;
          }
    }
    if(password){
        this.setState({passworderror:false});
    }
    else {
        this.setState({passworderror:true})
    }
    if(mail && password && passwordcheck && emailcheck ){
      const formdata={
        email:mail,
        password:password
      }
      axios.post("http://localhost:3001/api/v1/users/isAuth",formdata)
      .then((response) => {
        if(response.data.status){
          localStorage.setItem("id",response.data.data._id)
          toast.success(response.data.message,{position:toast.POSITION.TOP_RIGHT});
          this.setState({redirect:true})
         
        }
        else{
          toast.error(response.data.message,{position:toast.POSITION.TOP_RIGHT});
        }
	    
  });
  
  }
  }
  //onchange values
    onChangevalue(event){
      const name        = event.target.name;
      const value       = event.target.value;
      if(name ==='email'){
       const isvalidEmail=Emailvalidate(value);
       if(isvalidEmail){
        this.setState({email:value,emailerror:false,validmailerror:"",emailvalue:true})
        }
      else{
        this.setState({email:value,emailerror:true,validmailerror:"Enter valid Mail",emailvalue:false})
        }
       this.setState({email:value,emailerror:false})
       }

       if(name ==='password'){
        const isvalidpassword = Validpassword(value);
        if(isvalidpassword){
         this.setState({password:value,passworderror:false,validpassworderror:"",passwordvalue:true})
         }
       else{
         this.setState({password:value,passworderror:true,validpassworderror:"Enter valid Password",passwordvalue:false})
         }
        this.setState({password:value,passworderror:false})
        }
       
    }

	render(){
    if(this.state.redirect){
       return <Redirect to='/home'/>
    }
        return(
 
    <div id="logreg-forms">
        <form class="form-signin">
            <h1 class="h3 mb-3 font-weight-normal" > Login</h1>
            <input type="email" id="inputEmail" class="form-control"  name="email" value={this.state.email} placeholder="Enter Email Address" onChange={(e)=>this.onChangevalue(e)}/>
            {this.state.emailerror?<label style={{color:"red"}}>Enter Mail</label>:""}
            {this.state.validmailerror!=="" && !this.state.emailerror?<label style={{color:"red"}}>{this.state.validmailerror}</label>:""}
            <input type="password" id="inputPassword" class="form-control"name="password"  value={this.state.password} placeholder="Enter Password" onChange={(e)=>this.onChangevalue(e)}/>
            {this.state.passworderror?<label style={{color:"red"}}>Enter Password</label>:""}
            {this.state.validpassworderror!=="" && !this.state.passworderror?<label style={{color:"red"}}>{this.state.validpassworderror}</label>:""}
            <button class="btn btn-success btn-block" type="button"onClick={this.validlogin}><i class="fas fa-sign-in-alt"></i> Log in</button>
            <hr/>
             <p>Don't have an account!</p>  
            <Link to="/"><button class="btn btn-primary btn-block" type="button" id="btn-signup"><i class="fas fa-user-plus"></i> Sign up New Account</button></Link>
            </form> 
    </div>
        )
    }
}
export default Login;