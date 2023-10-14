import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'; 
import { library } from '@fortawesome/fontawesome-svg-core';
import './Login.css'
import axios from 'axios';
import regAction from '../../actions/regAction'
import swal from 'sweetalert';
import openModal from '../../actions/openModal';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import SignUp from './SignUp';
library.add(faGoogle);
library.add(faFacebook);
class Login extends Component{
    changeEmail=(e)=>{this.setState({
        email:e.target.value
      })}
      changePassword=(e)=>{this.setState({
        password:e.target.value
      })}
    submitLogin=async(e)=>{
        e.preventDefault();
        const url=`${window.apiHost}/users/login`;
    const data={
      email:this.state.email,
      password:this.state.password
    }
    const res=await axios.post(url,data);
    if (res.data.msg==="badPass"){
      swal({
        title: "Incorrect Password",
        text: "The password you provided is incorrect. Please try another.",
        icon: "error"
      })}
    else if(res.data.msg==="noEmail"){
      swal({
        title: "User not found",
        text: "Please register with your Email",
        icon: "error"
      })
    }
      else{
        swal({
          title: "Success!",
          text: "Successfully logged in",
          icon: "success"
        })
        this.props.regAction(res.data);
      }
      }
    
    render(){
        return(
            <div className="login-form">
                <form onSubmit={this.submitLogin}>
                    <button className="facebook-login"><FontAwesomeIcon icon={faFacebook} /> Connect With Facebook</button>
                    <button className="google-login"><FontAwesomeIcon icon={faGoogle} /> Connect With Google</button>
                    <div className="login-or center">
                        <span>or</span>
                        <div className="or-divider"></div>
                    </div>
                    <input type="text" className="browser-default input" placeholder="Email address" onChange={this.changeEmail}/>
                    <input type="password" className="browser-default input" placeholder="Password" onChange={this.changePassword}/>
                    <button className="sign-up-button" onClick={this.submitLogin}>Login</button>
                    <div className="divider"></div>
                    <div>Don't have an account? <span className="pointer" onClick={()=>{this.props.openModal("open",<SignUp />)}}>Sign Up</span></div>
                </form>
            </div>
        )
    }

}
function mapDispatchToProps(dispatcher){
    return bindActionCreators({
           openModal:openModal,
           regAction:regAction
    },dispatcher)
}
export default connect(null,mapDispatchToProps)(Login);