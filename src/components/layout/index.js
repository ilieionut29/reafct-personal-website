import React, { useEffect, useState } from "react";
import { ThemeProvider } from "../../context";
import Navigation from "components/navigation/navigation";
import ScrollLock from "react-scrolllock";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../web/style/_style.scss"
var scrollToElement = require("scroll-to-element");

const WebsiteLayout = (props) => {
  const [height, setHeight] = useState(0);
  const [mobile, setMobile] = useState(false);
  const [scrolllock, setScrolllock] = useState(0);
  const [width, setWidth] = useState(0);

  const sections = [
    "home",
    "about",
    "services",
    "portfolio",
    "testimonials",
    "contact",
  ];

  let section_id = 0;
  let scrolling = false;
  // let changeSection3 = this.changeSection.bind(this)
  const setDefaults = () => {
    setHeight(window.innerWidth < 992 ? "auto" : window.innerHeight);
    setMobile(window.innerWidth < 992 ? true : false);
    setScrolllock(window.innerWidth < 992 ? false : true);
    setWidth(window.innerWidth);
  };
  const updateDimensions = () => {
    if (width !== window.innerWidth) {
      window.location.reload();
    }
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
    if (window.innerWidth < 992) {
      setScrolllock(false);
  
      if (window.innerWidth < 992) {
        setMobile(true);
      }
    } else {
      
      setMobile(false);
      setScrolllock(true);
    }
  };

  

  useEffect(() => {
    setDefaults();
    window.addEventListener('resize', updateDimensions)

    return () => {
      window.removeEventListener('resize', updateDimensions)
    }
}, [])

  const changeSection = (id) => {
    section_id = id;
  }

  

  const wheel = (e) => {
    if (!scrolling && !mobile) {
      scrolling = true
      if (e.deltaY < 0) {
        if (sections[(section_id + sections.length - 1) % sections.length] !== sections[sections.length - 1])
          section_id =(section_id + sections.length - 1) % sections.length
          console.log("1")
        } else {
          if (section_id !== sections.length - 1)
            section_id = (section_id + 1) % sections.length
          console.log("2")

        }
      const el = document.getElementById(sections[section_id])
      scrollToElement(el, {
        offset: 0,
        ease: 'in-out-expo',
        duration: 2000,
      }).on('end', () => {
        scrolling = false
      })
    }
  }

  const {children} = props;

  return (
    <React.Fragment>
            <Navigation onChange={changeSection} />
            <ThemeProvider value={{ height: mobile ? "auto" : height }}>
      <div id="eventHandler" onWheel={(e) => wheel(e)}>{children}</div>
      <ScrollLock isActive={scrolllock} />
    </ThemeProvider>
    </React.Fragment>
  
  );
};

export default WebsiteLayout;
