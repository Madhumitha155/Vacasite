import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'; 
import { library } from '@fortawesome/fontawesome-svg-core';
import openModal from '../../actions/openModal';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import Login from './Login';
import regAction from '../../actions/regAction'
import './Login.css'
import axios from 'axios'
import swal from 'sweetalert';
library.add(faGoogle);
library.add(faFacebook);


class SignUp extends Component {
  state={
    lowerPartOfForm:"",
  }
  componentDidMount(){
    this.setState({
      lowerPartOfForm:<button type="button" onClick={this.showInputs} className="sign-up-button">Sign up with email</button>
    })
  }
  changeEmail=(e)=>{this.setState({
    email:e.target.value
  })}
  changePassword=(e)=>{this.setState({
    password:e.target.value
  })}
  showInputs=()=>{
     this.setState({
      lowerPartOfForm:<SignUpInput changeEmail={this.changeEmail} changePassword={this.changePassword}/>
     })
  }
  submitLogin=async (e)=>{
    e.preventDefault();
    const url=`${window.apiHost}/users/signup`;
    const data={
      email:this.state.email,
      password:this.state.password
    }
    const res=await axios.post(url,data);
    //const token=res.data.token;
    if (res.data.msg==="userExists"){
      swal({
        title: "Email exists",
        text: "Email you provided is already registered. Please try another.",
        icon: "error"
      })}
    else if(res.data.msg==="invalidData"){
      swal({
        title: "Invalid email / password",
        text: "Please provide a valid email and password",
        icon: "error"
      })
    }
      else{
        swal({
          title: "Success!",
          text: "Successfully registered",
          icon: "success"
        })
        this.props.regAction(res.data);
      }

  }
  render() {
    return (
      <div className="login-form">
        <form onSubmit={this.submitLogin}>
          <button className="facebook-login">
            <FontAwesomeIcon icon={faFacebook} /> Connect With Facebook
          </button>
          <button className="google-login">
            <FontAwesomeIcon icon={faGoogle} /> Connect With Google
          </button>
          <div className="login-or center">
            <span>or</span>
            <div className="or-divider"></div>
          </div>
          {this.state.lowerPartOfForm}
          <div className="divider"></div>
          <div>Already have an account? <span className="pointer" onClick={()=>{this.props.openModal("open",<Login />)}}>Login</span></div>
        </form>
      </div>
    );
  }
}
function mapStateToProps(state){
  return{
    auth:state.auth
  }
}
function mapDispatchToProps(dispatcher){
    return bindActionCreators({
           openModal:openModal,
           regAction:regAction
    },dispatcher)
}
export default connect(mapStateToProps,mapDispatchToProps)(SignUp);

const SignUpInput=(props)=>{
    return(<div className="sign-up-wrapper">
        <div className="col m12">
            <div className="input-field" id="email">
              <div className="form-label">Email</div>
              <input type="text" placeholder="Email" onChange={props.changeEmail}/>
            </div>
        </div>
        <div className="col m12">
            <div className="input-field" id="password">
              <div className="form-label">Password</div>
              <input   type="password" placeholder="Password" onChange={props.changePassword} />
            </div>
        </div>
        <div className="col m12">
        <button className="btn red accent-2" type="submit">Sign Up</button>
        </div>
    </div>)
}