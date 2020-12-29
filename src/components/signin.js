import React from "react";
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,Redirect,
  Link
} from "react-router-dom";
import {Emailvalidate,Validpassword} from '../common/validate.js';
import { ToastContainer, toast  } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css'

toast.configure()
class Signin extends React.Component{
     constructor(props){
    super(props);
    this.state = {
      name              : '',
      lastname          : '',
      email             : '',
      password          : '',
      contact           : '',
      contacterror      : false,
      nameError         : false,
      lastnameError     : false,
      emailError        : false,
      passwordError     : false,
      zipcodeError      : false,
      validmailError    : "",
      validpasswordError: "",
      emailvalue        : false,
      passwordvalue     : false,
      disable           : false,
      redirect:false
    }
    this.validlogin         = this.validlogin.bind(this);
  }

  ///validation()
  validlogin(){
    const name              = this.state.name;
    const lastname          = this.state.lastname;
    const mail              = this.state.email;
    const password          = this.state.password;
    const contact           = this.state.contact;
    var emailcheck=0;
    var passwordcheck=0;
    if(name){
      this.setState({nameError:false})
    }
    else {
      this.setState({nameError:true})
    }
    if(lastname){
      this.setState({lastnameError:false})
    }
    else {
      this.setState({lastnameError:true})
    }
    if(contact) {
      this.setState({contacterror:false});
    } else {
        this.setState({contacterror:true});
    }
    if(mail){
          if(!Emailvalidate(mail)){
            emailcheck=0;
          }
          else{
            emailcheck=1;
          }
    }
    if(mail){
      this.setState({emailError:false})
    }
    else {
      this.setState({emailError:true})
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
        this.setState({passwordError:false});
    }
    else {
        this.setState({passwordError:true})
    }
    if(name && lastname  && mail && password && passwordcheck && emailcheck&&contact){
      const signupFromData = {
        name             : name,
        lastname         : lastname,
        email            : mail,
        password         : password,
        contact          : contact,
      }

      console.log("signin",signupFromData);
      axios.post("https://bdd98d5588f4.ngrok.io/api/v1/users/accountCreation",signupFromData)
      .then((response) => {
        if(response.data.status){
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
      if(name==="name"){
        if(value){
          this.setState({name:value,nameError:false})
          this.setState({disable:false});
        }else{
          this.setState({name:value,nameError:false})
          this.setState({disable:false});
        }
      }
      if(name==="lastname"){
        if(value){
          this.setState({lastname:value,lastnameError:false})
          this.setState({disable:false});
        }else{
          this.setState({lastname:value,lastnameError:false})
          this.setState({disable:false});
        }
      }
      
      if(name ==='email'){
       const isvalidEmail=Emailvalidate(value);
       if(isvalidEmail){
        this.setState({email:value,emailError:false,validmailError:"",emailvalue:true})
        this.setState({disable:false});
        }
      else{
        this.setState({email:value,emailError:true,validmailError:"Please Enter Valid Email;",emailvalue:false})
        this.setState({disable:false});
        }
       this.setState({email:value,emailError:false})
       this.setState({disable:false});
       }

       if(name ==='password'){
        const isvalidpassword = Validpassword(value);
        if(isvalidpassword){
         this.setState({password:value,passwordError:false,validpasswordError:"",passwordvalue:true})
         this.setState({disable:false});
         }
       else{
         this.setState({password:value,passwordError:true,validpasswordError:"Password Should Contain Atleast 6 Character",passwordvalue:false})
         this.setState({disable:false});
         }
        this.setState({password:value,passwordError:false})
        this.setState({disable:false});
        }
        if(name === 'contact') {
          if(value){
                  this.setState({contact:value , contacterror:false })
          }else {
                this.setState({contact:value , contacterror:true})
          }
      }
    }
	render(){
    if(this.state.redirect){
       return <Redirect to='/login'/>
    }
        return(
            <div className="container register">
                <div className="row">
                    <div className="col-md-3 register-left">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
                        <h3>Welcome</h3>
                        <p>Get inTo Touch</p>
                        <span>Already an user?</span>
                        <Link to="/login"><input type="button" name="" value="Login"/></Link><br/>
                    </div>
                    <div className="col-md-9 register-right">
                                <h3  className="register-heading">Start The Journey</h3>
                                <div className="row register-form">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Enter First Name" name="name" value={this.state.name} onChange={(e)=>this.onChangevalue(e)}/>
                          {this.state.nameError?<label style={{color:"red"}}>Name is Required</label>:""} 
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Enter Last Name" name="lastname" value={this.state.lastname} onChange={(e)=>this.onChangevalue(e)}/>
                          {this.state.lastnameError?<label style={{color:"red"}}>Lastname is Required</label>:""}
                                        </div>
                                        <div className="form-group">
                                            <input type="email" className="form-control"  placeholder="Enter Email" name="email" value={this.state.email} onChange={(e)=>this.onChangevalue(e)}/>
                          {this.state.emailError?<label style={{color:"red"}}>Email is Required</label>:""}
                          {this.state.validmailError!=="" && !this.state.emailError?<label style={{color:"red"}}>{this.state.validmailError}</label>:""}
                                        </div>
                                        <div className="form-group">
                                            <input type="text" maxlength="10" minlength="10" className="form-control"  placeholder="Enter contact Code" name="contact" value={this.state.contact} onChange={(e)=>this.onChangevalue(e)}/>
                          {this.state.contacterror ? <label style={{color:'red'}}>Phone Number is Required</label> : ""}
                                        </div>


                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="password" className="form-control" placeholder="Enter Password" name="password" value={this.state.password} onChange={(e)=>this.onChangevalue(e)}/>
                          {this.state.passwordError?<label style={{color:"red"}}>Password is Required</label>:""}
                          {this.state.validpasswordError!=="" && !this.state.passwordError?<label style={{color:"red"}}>{this.state.validpasswordError}</label>:""}
                                        </div>
                                        <input type="button" className="btnRegister"onClick={this.validlogin}  value="Register"/>
                                    </div>
                                </div>
                            </div>
                        
                    </div>
                </div>

            

        )
    }
}
export default Signin;
