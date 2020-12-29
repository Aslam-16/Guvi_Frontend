import React from "react";
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,Redirect
} from "react-router-dom";
import {Emailvalidate,Validpassword} from '../common/validate.js';
import { ToastContainer, toast  } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css'

class Home extends React.Component{
     constructor(props){
    super(props);
    this.state = {
      name              : '',
      lastname          : '',
      email             : '',
      contact           : '',
      age               : '',
      dob               : '',
      location          : '',
      contacterror      : false,
      nameError         : false,
      lastnameError     : false,
      dobError          : false,
      locationError     : false,
      ageError          : false,
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
    const location          = this.state.location;
    const age               = this.state.age;
    const dob               = this.state.dob;
    const ID                =localStorage.getItem("id")
   
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
     if(age){
      this.setState({ageError:false})
    }
    else {
      this.setState({ageError:true})
    }
     if(location){
      this.setState({locationError:false})
    }
    else {
      this.setState({locationError:true})
    }
     if(dob){
      this.setState({dobError:false})
    }
    else {
      this.setState({dobError:true})
    }
    if(contact) {
      this.setState({contacterror:false});
    } else {
        this.setState({contacterror:true});
    }
    if(name && lastname &&contact && dob && age && location){
      const signupFromData = {
          id             :ID,
        name             : name,
        lastname         : lastname,
        email            : mail,
        contact          : contact,
        dob              : dob,
        location         : location,
        age              : age,
              
      }
      
      
      axios.post("https://bdd98d5588f4.ngrok.io/api/v1/users/edituser",signupFromData)
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
componentDidMount(){
        const option=this;
        const id=localStorage.getItem("id")
        axios.post('https://bdd98d5588f4.ngrok.io/api/v1/users/viewuser',
        {id:id})
        .then((response) => {
            
         option.setState({name:response.data.data.name,lastname:response.data.data.lastname,
        email:response.data.data.email,contact:response.data.data.contact,location:response.data.data.location,
        age:response.data.data.age,dob:response.data.data.dob})
  });
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
      if(name==="location"){
        if(value){
          this.setState({location:value,locationError:false})
          this.setState({disable:false});
        }else{
          this.setState({location:value,ocationeError:false})
          this.setState({disable:false});
        }
      }
      if(name==="age"){
        if(value){
          this.setState({age:value,ageError:false})
          this.setState({disable:false});
        }else{
          this.setState({age:value,ageError:false})
          this.setState({disable:false});
        }
      }
      if(name==="dob"){
        if(value){
          this.setState({dob:value,dobError:false})
          this.setState({disable:false});
        }else{
          this.setState({dob:value,dobError:false})
          this.setState({disable:false});
        }
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
        return(
            <div className="container register">
                <div className="row">
                    <div className="col-md-3 register-left">
                       <Link to="/login"> <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/></Link>
                        <h3>Click To Logout</h3>
                    </div>
                    <div className="col-md-9 register-right">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 className="register-heading">Update Your Profile</h3>
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
                                            <input type="text" className="form-control" placeholder="DOB *"name="dob" value={this.state.dob} onChange={(e)=>this.onChangevalue(e)}/>
                          {this.state.dobError?<label style={{color:"red"}}>Dob is Required</label>:""}
                                        </div>
                                        <div className="form-group">
                                            <input type="number" className="form-control"  placeholder="Age *"name="age" value={this.state.age} onChange={(e)=>this.onChangevalue(e)}/>
                          {this.state.ageError?<label style={{color:"red"}}>Age is Required</label>:""}
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control"  placeholder="Location *"name="location" value={this.state.location} onChange={(e)=>this.onChangevalue(e)}/>
                          {this.state.locationError?<label style={{color:"red"}}>Location is Required</label>:""}
                                            </div>

                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="email" className="form-control" placeholder="Enter Email" name="email" value={this.state.email} />
                         
                                        </div>
                                        <div className="form-group">
                                            <input type="text" minlength="10" maxlength="10" name="txtEmpPhone" className="form-control" placeholder="Enter contact Code" name="contact" value={this.state.contact} onChange={(e)=>this.onChangevalue(e)}/>
                          {this.state.contacterror ? <label style={{color:'red'}}>Phone Number is Required</label> : ""}
                                        </div>
                                        
                                        <input type="button" className="btnRegister" onClick={this.validlogin} value="Update"/>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}
export default Home;
