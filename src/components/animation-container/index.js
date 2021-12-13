import React, { useState, useEffect } from "react";
import handleViewport from "react-in-viewport";
import "animate.css/animate.css";

const Animation_Container = (props) => {
  const [inViewport, setInViewport] = useState(false);
  const [animation_complete, setanimation_complete] = useState(false);
  const [classChange, setClassChange] = useState(false);
  const changeClass = () => {
    const { delay } = props;
    setTimeout(() => {
      setClassChange(true);
    }, delay);
  };

  useEffect(() => {
    if (inViewport !== props.inViewport && !animation_complete) {
      setInViewport(props.inViewport);
      setanimation_complete(true);
      changeClass();
    }
  }, [props.inViewport, inViewport, animation_complete, changeClass]);
  // this is my functional component.

  const { children, animation, id, height, forwardedRef } = props;

  return (
    <div
      ref={forwardedRef}
      className={classChange ? `animated ${animation}` : ""}
      style={{ opacity: classChange ? 1 : 0, height: height ? height : "auto" }}
      id={id}
    >
      {children}
    </div>
  );
};

const AnimationContainer = handleViewport(Animation_Container);

export default AnimationContainer;
