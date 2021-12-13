import React, { useState } from "react";
import Typewriter from "typewriter-effect";
import { AiFillGithub, AiFillYoutube, AiOutlineCloseCircle } from "react-icons/ai";
import { FiMail, FiPhoneCall, FiMenu } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import igi from "./navigation.module.scss";
import logo from "../../../public/img/logo.png";

var scrollToElement = require("scroll-to-element");

const Navigation = (props) => {
  const menuSections = [
    {
      name: "Home",
      desc: "back to homepage",
    },
    {
      name: "About",
      desc: "who i am?",
    },
    {
      name: "Services",
      desc: "what i do",
    },
    {
      name: "Portfolio",
      desc: "take a look at my work",
    },
    {
      name: "Testimonials",
      desc: "what clients say",
    },
    {
      name: "Contact",
      desc: "send me a message",
    },
  ];

  const [show, setShow] = useState(false);

  const isMobile = useMediaQuery({
    query: "(max-width: 991px)",
  });

  const isDekstop = useMediaQuery({
    query: "(min-width: 992px)",
  });

  const email = "ilie.ionut29@yahoo.com";
  const phoneNumber = "0768272273";
  const linkedinLink = "www.linkedin.com/in/ilieionut";
  const githubLink = "www.github.com/ilieionut29";

  const setShowHolder = () => {
    if (show === true) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  const navScroll = (element, index) => {
    setShow(false);
    const section = document.getElementById(element);
    scrollToElement(section, {
      offset: 0,
      ease: "in-out-expo",
      duration: 1500,
    });
  };

  return (
    <React.Fragment>
      {isMobile && (
        <nav className={`${igi.nav} ${igi.mobile}`}>
          <div className={igi.logo}>
            <img src={logo} alt="igi" height="31" />
          </div>
          <div className={igi.open}>
            <FiMenu size={25} onClick={setShowHolder} />
          </div>
          <div className={`${igi.menu} ${show ? igi.active : ""}`}>
            <section className={igi.header}>
              <div className={igi.close}>
                <AiOutlineCloseCircle
                  className={igi.icon}
                  size={45}
                  onClick={setShowHolder}
                />
              </div>
            </section>
            <ul className={igi.sections}>
              {menuSections.map((value, index) => {
                return (
                  <li key={index} onClick={() => navScroll(value.name.toLowerCase(), index)}>
                    {value.name}
                    <span>{value.desc}</span>
                  </li>
                );
              })}
            </ul>
            <section className={igi.footer}>
              <div className={igi.footer_logo}></div>
              <div className={igi.footer_info}>
                <span className={igi.text}>
                  do you need something &nbsp;
                  <Typewriter
                    options={{
                      strings: ["cool? 😎", "unique? 🤩", "special? 🙀"],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </span>
              </div>
              <div className={igi.footer_links}>
                <div className={igi.footer_links_box}>
                  <a href={"mailto:" + email}>
                    <FiMail size={24} />
                  </a>
                </div>
                <div className={igi.footer_links_box}>
                  <a href={"tel+4" + phoneNumber}>
                    <FiPhoneCall size={24} />
                  </a>
                </div>
                <div className={igi.footer_links_box}>
                  <a href={githubLink}>
                    <AiFillYoutube size={24} />
                  </a>
                </div>
                <div className={igi.footer_links_box}>
                  <a href={linkedinLink}>
                    <FaLinkedin size={24} />
                  </a>
                </div>
                <div className={igi.footer_links_box}>
                  <a href={linkedinLink}>
                    <AiFillGithub size={24} />
                  </a>
                </div>
              </div>
            </section>
          </div>
        </nav>
      )}
      {isDekstop && (
        <nav className={`${igi.nav} ${igi.desktop}`}>
          <div className={igi.logo}>
            <img src={logo} alt="igi" height="31" />
          </div>
          <ul className={igi.sections}>
            {menuSections.map((value, index) => {
              return (
                <li key={index} onClick={() => navScroll(value.name.toLowerCase(), index)}>
                  {value.name}
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </React.Fragment>
  );
};

export default Navigation;