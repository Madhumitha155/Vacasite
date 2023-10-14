import React,{Component} from 'react';
//import lazy,Suspense from 'react
import {BrowserRouter as Router,Route} from 'react-router-dom'
import NavBar from './utility/NavBar/NavBar';
import Home from './pages/Home/Home';
import './App.css'
import Search from './pages/Search/Search';
import Account from './pages/Account/Account';
import Modal from './utility/Modal/Modal'
import SinglePageVenue from './pages/SinglePageVenue/SinglePageVenue';
import CityVenues from './pages/CityVenues/CityVenues';
import PaymentSuccess from './pages/PaymentSuccess/PaymentSuccess';
//const Search =lazy(()=>import('./pages/Search/Search'));
//It will render the compnent only when the user needs it and unless time=>Optimization
class App extends Component{
  render(){
  return (
    <Router>
    <Route path='/' component={NavBar}></Route>
    <Route exact path='/' component={Home}></Route>
    <Route exact path='/venue/:vid' component={SinglePageVenue}></Route>
    <Route exact path='/city/:cityName' component={CityVenues}></Route>
    <Route exact path='/payment-success/:token' component={PaymentSuccess}></Route>
    <Route path='/' component={Modal}></Route>
    <Route path='/search/:searchTerm' component={Search}/>
    <Route path='/account' component={Account}></Route>
    </Router>
  )
  }
}

export default App;
