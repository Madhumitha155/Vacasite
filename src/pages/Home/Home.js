import React, { Component } from 'react';
import './Home.css'
import Cities from '../../utility/City/Cities';
import Venues from '../../utility/Venues/Venues';
import axios from 'axios';
import SearchBox from './SearchBox';
import Spinner from '../../utility/Spinner/Spinner';
import Activities from '../../utility/Activity/Activities';

class Home extends Component {
    state = {
        cities: [],
        europeCities: {},
        asiaCities: {},
        exoticCities: {},
       // beachCities: {},
        activities: [],
        activitiesAnimals: [],
        activitiesScenery: [],
        activitiesBaking: [],
        activitiesDiving: [],
        venuesRecommended:{},
        venuesSuperHost:{}
    }
    async componentDidMount() {
        const CitiesUrl = `${window.apiHost}/cities/recommended`;
        const europeCitiesUrl = `${window.apiHost}/cities/europe`;
        const asiaCitiesUrl = `${window.apiHost}/cities/asia`;
        const exoticCitiesUrl = `${window.apiHost}/cities/exotic`;
       // const beachCitiesUrl = `${window.apiHost}/cities/beach`;
        const citiesPromises = []
        citiesPromises.push(axios.get(CitiesUrl));
        citiesPromises.push(axios.get(europeCitiesUrl));
        citiesPromises.push(axios.get(asiaCitiesUrl));
        citiesPromises.push(axios.get(exoticCitiesUrl));
        //citiesPromises.push(axios.get(beachCitiesUrl));
        Promise.all(citiesPromises).then((data) => {
            const recommendedCities = data[0].data;
            const europeCities = data[1].data;
            const asiaCities = data[2].data;
            const exoticCities = data[3].data;
           // const beachCities = data[4].data;
            this.setState(
                {
                    cities: recommendedCities,
                    europeCities: europeCities,
                    asiaCities: asiaCities,
                    exoticCities: exoticCities,
                   // beachCities: beachCities
                }
            );
        })
        const activitiesUrl = `${window.apiHost}/activities/today`;
        const activitiesAnimalsUrl = `${window.apiHost}/activities/animals`;
        const activitiesSceneryUrl = `${window.apiHost}/activities/scenery`;
        const activitiesBakingUrl = `${window.apiHost}/activities/baking`;
        const activitiesDivingUrl = `${window.apiHost}/activities/diving`;
        const ActivitiesPromises = []
        ActivitiesPromises.push(axios.get(activitiesUrl));
        ActivitiesPromises.push(axios.get(activitiesAnimalsUrl));
        ActivitiesPromises.push(axios.get(activitiesSceneryUrl));
        ActivitiesPromises.push(axios.get(activitiesBakingUrl));
        ActivitiesPromises.push(axios.get(activitiesDivingUrl));

        Promise.all(ActivitiesPromises).then((data) => {
            const activities = data[0].data;
            const activitiesAnimals = data[1].data;
            const activitiesScenery = data[2].data;
            const activitiesBaking = data[3].data;
            const activitiesDiving = data[4].data;
            this.setState(
                {
                    activities,
                    activitiesAnimals,
                    activitiesScenery,
                    activitiesBaking,
                    activitiesDiving
                }
            );
        })
        const recommededVenuesUrl = `${window.apiHost}/venues/recommended`;
        const superHostVenuesUrl = `${window.apiHost}/venues/superHost`;
        const VenuePromises=[]
        VenuePromises.push(axios.get(recommededVenuesUrl));
        VenuePromises.push(axios.get(superHostVenuesUrl));
        Promise.all(VenuePromises).then((data) => {
            const venuesRecommended = data[0].data;
            const venuesSuperHost = data[1].data;
            this.setState({
                venuesRecommended,
                venuesSuperHost
            })
    });
    }
    render() {
        if (this.state.cities.length === 0 || !this.state.venuesRecommended.venues || !this.state.venuesSuperHost.venues) {
            return (<Spinner />);
        }

        return (
            <>
                <div className="container-fluid">
                    <div className="row">
                        <div className="home col s12">
                            <div className="upper-fold">
                                <SearchBox history={this.props.history}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid lower-fold">
                    <div className="row">
                        <div className="col s12">
                            <Cities cities={this.state.cities} header="Recommended Cities for You" />
                        </div>
                        <div className="col s12">
                            <Activities activities={this.state.activities} header="Today in your Area" />
                        </div>
                        <div className="col s12">
                            <Cities cities={this.state.europeCities.cities} header={this.state.europeCities.header} />
                        </div>
                        <div className="col s12"><Venues venues={this.state.venuesSuperHost.venues} header={this.state.venuesRecommended.header} />
                            
                        </div>
                        <div className="col s12">
                            <Cities cities={this.state.asiaCities.cities} header={this.state.asiaCities.header} />
                        </div>
                        <div className="col s12">
                            <Venues venues={this.state.venuesSuperHost.venues} header={this.state.venuesSuperHost.header} />
                        </div>
                        <div className="col s12">
                            <Cities cities={this.state.exoticCities.cities} header={this.state.exoticCities.header} />
                        </div>
                        

                        

                    </div>
                </div>
            </>
        )
    }
}
export default Home;