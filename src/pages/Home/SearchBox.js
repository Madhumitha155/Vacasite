import { Component } from "react";
import './SearchBox.css'
class SearchBox extends Component {
    state = {
        where: "",
        checkIn: "",
        checkOut: "",
        guests: 0,
        adultCount: 0,
        childrenCount: 0,
        infantsCount: 0,
        showDropdown:false
    }
    toggleDropdown = () => {
        this.setState((prevState) => ({
            showDropdown: !prevState.showDropdown
        }));
    }
    increment = (category,event) => {
        event.preventDefault();
        this.setState((prevState) => ({
            [category + 'Count']: prevState[category + 'Count'] + 1,
            guests: prevState.guests + 1,
        }) );
    }
    decrement = (category,event) => {
        event.preventDefault(); 
        if (this.state[category + 'Count'] > 0) {
          this.setState((prevState) => ({
            [category + 'Count']: prevState[category + 'Count'] - 1,
            guests: prevState.guests - 1,
          }));
        }
      }

    changeWhere = (e) => {
        this.setState({ where: e.target.value });
    }
    changecheckIn = (e) => {
        this.setState({ checkIn: e.target.value });
    }
    changecheckOut = (e) => {
        this.setState({ checkOut: e.target.value });
    }
    submitSearch=(e)=>{
        e.preventDefault();
        this.props.history.push(`/search/${this.state.where}`)
    }
    render() {

        return (
            <div className="home-search-box col m4">
                <h1>Book unique places to stay and things to do</h1>
                <form onSubmit={this.submitSearch} className="search-box-form">
                    <div className="col m12">
                        <div className="form-label">where</div>
                        <div className="input-field" id="where">
                            <input className="browser-default" onChange={this.changeWhere} value={this.state.where} type="text" placeholder="Anywhere" />
                        </div>
                    </div>
                    <div className="col m6">
                        <div className="form-label">CHECK-IN</div>
                        <div className="input-field" id="check-in">
                            <input className="date browser-default" onChange={this.changecheckIn} value={this.state.checkIn} type="date" />
                        </div>
                    </div>
                    <div className="col m6">
                        <div className="form-label">CHECK-OUT</div>
                        <div className="input-field" id="check-out">
                            <input className=" date browser-default" onChange={this.changecheckOut} value={this.state.checkOut} type="date" />
                        </div>
                    </div>
                    <div className="col m12">
                        <div className="form-label">GUESTS</div>
                        <div className="input-field" id="guests">
                            <input
                                className="browser-default"
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
                                        <button onClick={(e) => this.decrement('adult',e)}>-</button>
                                    </div>
                                    </div>
                                    <div className="category-container">
                                    <div className="category-text">Infants:</div>
                                    <div className="category-buttons">
                                        <button onClick={(e) => this.increment('children', e)} className='category'>+</button> <span id="childrenCount">{this.state.childrenCount}</span>
                                        <button onClick={(e) => this.decrement('children',e)}>-</button>
                                    </div>
                                    </div>
                                    <div className="category-container">
                                    <div className="category-text">Children:</div>
                                    <div className="category-buttons">
                                        <button onClick={(e) => this.increment('infants', e)} className='category'>+</button><span id="infantsCount">{this.state.infantsCount}</span>
                                        <button onClick={(e) => this.decrement('infants',e)}>-</button>
                                    </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col m4 submit-btn right">
                        <div className="input-field" id="submit-btn">
                            <button className="waves-effect waves-light red accent-2 btn" type="submit" name="action">Search
                                <i> </i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
export default SearchBox;
