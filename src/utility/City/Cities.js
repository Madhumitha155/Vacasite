import React from 'react';
import City from './City';
import SlickSlider from '../Slider/Slider'
function Cities(props){
    const cities= props.cities.map((city,i)=>{
        return(
            <div key={i} className="col s3">
              <City city={city} />
            </div>
        )
     })
     return(
      <>
        <h4 className="main-header-text">{props.header}</h4>
        <SlickSlider elements={cities}/>
        </>
        )
}
export default Cities;