import React,{Component} from 'react'
import swal from 'sweetalert'
import axios from 'axios'
class ChangePassword extends Component {
  state={
    password:"",
    cpassword:""
  }
  changenew=(e)=>{
    this.setState({
      password:e.target.value
    })
  }
  changec=(e)=>{
    this.setState({
      cpassword:e.target.value
    })
  }
  handleSubmit=async()=>{
     const {cpassword,password}=this.state;
     if(cpassword!==password){
      swal({
        title:"Passwords don't match",
        icon:"Error"
      })
     }
     else{
        const url=`${window.apiHost}/users/change-password`;
        const data={
          token:this.props.token,
          newPassword:password
        }
        const resp=await axios.post(url,data);
        console.log(resp.data)
        if(resp.data.msg==="passUpdated"){
          swal({
            title:"Password changed successfully",
            icon:"success"
          })
        }
     }
  }
  render(){
  return (
    <div className="col m12">
            <div className="input-field" id="password">
              <div className="form-label">Enter your new password</div>
              <input type="password" onChange={this.changenew}placeholder="New Password" />
            </div>
            <div className="input-field" id="cpassword">
              <div className="form-label">Confirm your password</div>
              <input type="password"onChange={this.changec} placeholder="Confirm Password" />
            </div>
            <div className="col m12">
        <button className="btn red accent-2" type="submit" onClick={this.handleSubmit}>Change password</button>
        </div>
    </div>
  )
}
}
export default ChangePassword;