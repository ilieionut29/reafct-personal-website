import React, { useState, useContext } from "react";
import "./styles.scss";
import { Row, Col } from "react-bootstrap";
import AnimationContainer from "components/animation-container";
import BaffleText from "components/baffle-text";
import ThemeContext from "../../context";

const Contact = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  const context = useContext(ThemeContext);

  const setNameHolder = (e) => {
    setName(e.target.value);
  };

  const setEmailHolder = (e) => {
    setEmail(e.target.value);
  };

  const setPhoneHolder = (e) => {
    setPhone(e.target.value);
  };

  const setMesssageHolder = (e) => {
    setMessage(e.target.value);
  };

  const showHolder = () => {
    setShow(true);
  };

  const check = (val) => {
    if (error && val === "") {
      return false;
    } else {
      return true;
    }
  };

  const submit = () => {
    if (name === "" || email === "" || message === "") {
      setError(true);
    } else {
      setError(false);
      console.log("submitting");
    }
  };
  const form = () => {
    if (show || context.height === "auto") {
      return (
        <AnimationContainer delay={0} animation="fadeInUp fast">
          <div className="form-container">
            <div className="line-text">
              <h4>Get In Touch</h4>
              <AnimationContainer delay={50} animation="fadeInUp fast">
                <div className="form-group">
                  <input
                    type="text"
                    className={`name ${check(name) ? "" : "error"}`}
                    placeholder="Name"
                    onChange={setNameHolder}
                  />
                </div>
              </AnimationContainer>
              <AnimationContainer delay={100} animation="fadeInUp fast">
                <div className="form-group">
                  <input
                    type="text"
                    className={`email ${check(email) ? "" : "error"}`}
                    placeholder="Email"
                    onChange={setEmailHolder}
                  />
                </div>
              </AnimationContainer>
              <AnimationContainer delay={150} animation="fadeInUp fast">
                <div className="form-group">
                  <input
                    type="text"
                    className="phone"
                    placeholder="Phone"
                    onChange={setPhoneHolder}
                  />
                </div>
              </AnimationContainer>
              <AnimationContainer delay={200} animation="fadeInUp fast">
                <div className="form-group">
                  <textarea
                    className={`message ${check(message) ? "" : "error"}`}
                    placeholder="Message"
                    onChange={setMesssageHolder}
                  ></textarea>
                </div>
              </AnimationContainer>
              <AnimationContainer delay={250} animation="fadeInUp fast">
                <div className="submit">
                  <button
                    className={`hover-button ${error ? "error" : ""}`}
                    onClick={() => submit()}
                  >
                    <span>Send Message</span>
                  </button>
                </div>
              </AnimationContainer>
            </div>
          </div>
        </AnimationContainer>
      );
    }
  };

  const map = () => {
    if (show || context.height === "auto") {
      return (
        <AnimationContainer
          delay={1000}
          animation="fadeIn fast"
          height={context.height}
        >
          <iframe
            title="map"
            width="100%"
            height="100%"
            src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street%2C%20Dublin%2C%20Ireland+(My%20Business%20Name)&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
          />
        </AnimationContainer>
      );
    }
  };

  return (
    <section
      id={`${props.id}`}
      className="contact"
      style={{ height: context.height }}
    >
      <Row>
        <Col md={2} className="side">
          <h2>
            <BaffleText
              text="Contact"
              revealDuration={500}
              revealDelay={500}
              parentMethod={showHolder}
              callMethodTime={1100}
            />
          </h2>
        </Col>
        <Col md={5} className="form">
          {form()}
        </Col>
        <Col md={5} className="map">
          {map()}
        </Col>
      </Row>
    </section>
  );
};

export default Contact;
