import { Component } from 'react';
import './SinglePageVenue.css';
import axios from 'axios';
import Point from './Point';
import '../Home/SearchBox.css';
import {connect} from 'react-redux';
import openModal from '../../actions/openModal';
import { bindActionCreators } from 'redux';
import Login from '../Login/Login';
import moment from 'moment';
import swal from 'sweetalert';
import loadScript from '../../utilityFunctions/loadScript';
class SinglePageVenue extends Component {
  state = {
    singleVenue: {},
    points: [],
    guests: 0,
    adultCount: 0,
    childrenCount: 0,
    infantsCount: 0,
    showDropdown: false,
    checkIn:"",
    checkOut:""
  };
  changeCheckIn=(e)=>{this.setState({checkIn:e.target.value})}
  changeCheckOut=(e)=>{this.setState({checkOut:e.target.value})}
  reserveNow=async()=>{
    const startDayMoment =moment(this.state.checkIn)
    const endDayMoment =moment(this.state.checkOut)
    const difference=endDayMoment.diff(startDayMoment,"days");
    if(difference<1){
        swal({
          title:"Incorrect Dates",
          icon:'error',
        })
    }else if(isNaN(difference)){
      swal({
        title:"Invalid Dates",
        icon:'error',
      })
    }
    else{
      const pricePerNight=this.state.singleVenue.pricePerNight;
      const totalPrice=pricePerNight*difference;
      const scriptUrl='https://js.stripe.com/v3'
      const stripePublicKey = 'pk_test_5198HtPL5CfCPYJ3X8TTrO06ChWxotTw6Sm2el4WkYdrfN5Rh7vEuVguXyPrTezvm3ntblRX8TpjAHeMQfHkEpTA600waD2fMrT';
      await loadScript(scriptUrl);
      const stripe=window.Stripe(stripePublicKey);
      const stripeSessionUrl=`${window.apiHost}/payment/create-session`;
      const data={
        venueData:this.state.singleVenue,
        totalPrice,
        diffDays:difference,
        pricePerNight,
        checkIn:this.state.checkIn,
        checkOut:this.state.checkOut,
        token:this.props.auth.token,
        numberOfGuest: this.state.guests,        
        currency:'USD',
      }
        const sessionVar = await axios.post(stripeSessionUrl, data);
        stripe.redirectToCheckout({
          sessionId:sessionVar.data.id,
        }).then((res)=>{
            console.log(res)
        })
        
    }
  }

  toggleDropdown = () => {
    this.setState((prevState) => ({
      showDropdown: !prevState.showDropdown,
    }));
  };

  increment = (category, event) => {
    event.preventDefault();
    this.setState((prevState) => ({
      [category + 'Count']: prevState[category + 'Count'] + 1,
      guests: prevState.guests + 1,
    }));
  };

  decrement = (category, event) => {
    event.preventDefault();
    if (this.state[category + 'Count'] > 0) {
      this.setState((prevState) => ({
        [category + 'Count']: prevState[category + 'Count'] - 1,
        guests: prevState.guests - 1,
      }));
    }
  };

  async componentDidMount() {
    const vId = this.props.match.params.vid;
    const singleVenueUrl = `${window.apiHost}/venue/${vId}`;
    const axiosRes = await axios.get(singleVenueUrl);
    const singleVenue = axiosRes.data;
    const pointsUrl = `${window.apiHost}/points/get`;
    const pointsAxiosResponse = await axios.get(pointsUrl);
    const points = singleVenue.points.split(',').map((point, i) => {
      return <Point key={i} pointdesc={pointsAxiosResponse.data} point={point} />;
    });
    this.setState({
      singleVenue,
      points,
    });
  }

  render() {
    const sv = this.state.singleVenue;
    return (
      <div className="row single-venue">
        <div className="col s12 center size">
          <img src={this.state.singleVenue.imageUrl} alt="" />
        </div>
        <div className="col s8 location-details offset-s2">
          <div className="col s8 left-details">
            <div className="location">{sv.location}</div>
            <div className="title">{sv.title}</div>
            <div className="guests">{sv.guests} guests</div>
            <div className="divider"></div>
            {this.state.points}
            <div className="details">{sv.details}</div>
            <div className="amenities">{sv.amenities}</div>
          </div>
          <div className="col s4 right-details">
            <div className="inp">
            <div className="price-per-day">${sv.pricePerNight} <span> / day</span></div>
            <div className="check-in-container rating"> <i className="material-icons star align-icon">star</i>{sv.rating}</div>
            </div>
            <div className="col s6">
            <div className="check-in-container">
              <b>Check-In</b><i className="material-icons align-icon">arrow_forward</i>
              </div>
              <input type="date" className=" inp " onChange={(e)=>{this.changeCheckIn(e)}}/>
            </div>
            <div className="col s6">
            <div className="check-in-container">
              <b>Check-Out</b> <i className="material-icons align-icon">arrow_back</i>
            </div>
              <input type="date" className=" inp" onChange={(e)=>{this.changeCheckOut(e)}}/>
            </div>
            <div className="col s12">
              <div className="check-in-container" ><b>Guests</b> <i className="material-icons align-icon">group</i></div>
              <input
                className=" inp"
                value={this.state.guests}
                type="text"
                onClick={this.toggleDropdown}
                readOnly
              />
              {this.state.showDropdown && (
                <div className="dropDown-content" id="dropDownContent">
                  <div className="category-container">
                    <div className="category-text">Adult:</div>
                    <div className="category-buttons">
                      <button onClick={(e) => this.increment('adult', e)} className='category'>+</button><span id="adultCount">{this.state.adultCount}</span>
                      <button onClick={(e) => this.decrement('adult', e)}>-</button>
                    </div>
                  </div>
                  <div className="category-container">
                    <div className="category-text">Infants:</div>
                    <div className="category-buttons">
                      <button onClick={(e) => this.increment('children', e)} className='category'>+</button> <span id="childrenCount">{this.state.childrenCount}</span>
                      <button onClick={(e) => this.decrement('children', e)}>-</button>
                    </div>
                  </div>
                  <div className="category-container">
                    <div className="category-text">Children:</div>
                    <div className="category-buttons">
                      <button onClick={(e) => this.increment('infants', e)} className='category'>+</button><span id="infantsCount">{this.state.infantsCount}</span>
                      <button onClick={(e) => this.decrement('infants', e)}>-</button>
                    </div>
                  </div>
                </div>
              )}
              <div className="btn-container">
                {this.props.auth.token ?
                <button onClick={this.reserveNow} className="btn">Reserve</button>
                :
                <div>You must  <span className="text-link" onClick={()=>{this.props.openModal("open",<Login />)}}>Log in</span> to reserve</div>
              }
                  
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state){
  return{
    auth:state.auth,
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
     openModal
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(SinglePageVenue);

