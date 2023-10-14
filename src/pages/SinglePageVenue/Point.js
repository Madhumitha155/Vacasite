import React from 'react';
function Point(props){
    const desc=props.pointdesc.find((point)=>point.pointTitle===props.point)
        return(
            <div>
              <div className="point-title"> {props.point} </div> 
              <div className="point-desc">{desc.text}</div>
            </div>
         )    
}
export default Point;