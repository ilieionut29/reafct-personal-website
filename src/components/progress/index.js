import React, { useState, useEffect, useRef } from "react";
import handleViewport from "react-in-viewport";
import CountUp from "react-countup";
import "./styles.scss";

const Progress_Animation = (props) => {
  
  const [value, setValue] = useState(0);
  const [inViewport, setInViewport] = useState(false);
  const [animation_complete, setanimation_complete] = useState(false);
  const { name, forwardedRef } = props;

//   useEffect(() => {
//     console.log("in use effect")
//     if (inViewport !== props.inViewport && !animation_complete) {
//         console.log("in if")
//         setInViewport(props.inViewport);
//         setanimation_complete(true);
//         showProgress();
//     }
//   }, []);

const showProgress = () => {
  setTimeout(() => {
    setValue(props.value);
  }, props.delay);
};

useEffect(() => {

    if (inViewport !== props.inViewport && !animation_complete) {
  
      setInViewport(props.inViewport);
      setanimation_complete(true);
      showProgress();
    }
  }, [props.inViewport, inViewport, animation_complete, showProgress]);
  // this is my functional component.

  

  return (
      
    <div className="progress-container" ref={forwardedRef}>
      <span className="name">{name}</span>
      <span className="value">
        <CountUp start={0} end={inViewport === true ? value : 25} />%
      </span>
      <div className="progress" style={{ width: `${value}%` }}></div>
    </div>
  );
};
const Progress = handleViewport(Progress_Animation);


export default Progress;


