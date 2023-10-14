import { Component } from "react";
import './Search.css'
import '../Home/Home.css'
import axios from 'axios';
import Cities from '../../utility/City/Cities';
import Venues from '../../utility/Venues/Venues';
import Spinner from '../../utility/Spinner/Spinner';
import Activities from '../../utility/Activity/Activities';
class Search extends Component {
    state={
        activities:[],
        cities:[],
        venues:[],
        apiResponse:false
    }
    async componentDidMount(){
        const searchTerm=this.props.match.params.searchTerm;
        //console.log(searchTerm);
        const url=`${window.apiHost}/search/${searchTerm}`;
        const resp=await axios.get(url);
        this.setState({
        activities:resp.data.activities,
        cities:resp.data.cities,
        venues:resp.data.venues,
        apiResponse:true
        }
        )
    }
    render() {
        if(!this.state.apiResponse){
            return <Spinner/>
        }
        return (
        <div>
            <div className="container-fluid lower-fold">
            Search results<h1></h1> 
                    <div className="row">
                    {(this.state.cities.length!==0)?
                        <div className="col s12">
                        <Cities cities={this.state.cities} header="Cities matching your search" />
                        </div>:<></>
                    }   
                    {(this.state.activities.length!==0)?         
                        <div className="col s12">
                        <Activities activities={this.state.activities} header="Activities matching your search" />
                        </div>:<></>
                    }  
                    {(this.state.venues.length!==0)?         
                        <div className="col s12">
                            <Venues venues={this.state.venues} header="Venues matching your search" />
                        </div>
                    :<></>
                    }
                </div>
            </div>
        </div>)
    }

}
export default Search;