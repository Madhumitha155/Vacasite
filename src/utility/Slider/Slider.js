import { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Slider.css'
import SlickSlider from 'react-slick';
class Slider extends Component{
     render(){
     const slidesToShow = this.props.elements.length < 4 ? this.props.elements.length : 4;
     const settings={
          dots: false,
          infinite: true,
          speed: 500,
          arrows:true,
          slidesToShow: slidesToShow,
          slidesToScroll: 1
     } 
        return(
              <div className="slick">
               <SlickSlider {...settings}>
                   {this.props.elements}
               </SlickSlider>
            </div>  
            )
     }
}
export default Slider;