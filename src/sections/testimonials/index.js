import React, { useState , useContext} from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { graphql, StaticQuery } from 'gatsby'
import BaffleText from 'components/baffle-text'
import AnimationContainer from 'components/animation-container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import Slider from 'react-slick'
import ThemeContext from '../../context'
import 'slick-carousel/slick/slick-theme.css'
import './styles.scss'

const Testimonials = (props) => {
  const [show, setShow] = useState(false);

  const context = useContext(ThemeContext);

  const setShowHolder = () => {
    setShow(true);
  }


  const clients =()=> {
    if (show || context.height === 'auto') {
      return props.clients.edges.map((value, index) => {
        return (
          <Col md={2} className="client" key={index}>
            <AnimationContainer delay={100} animation="fadeIn slower">
              <img src={value.node.childImageSharp.fluid.src} alt="client" />
            </AnimationContainer>
          </Col>
        )
      })
    }
  }

  const testimonial_slider =() => {
    const settings = {
      dots: true,
      swipe: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 10000,
      loop: true,
    }
    if (show) {
      return (
        <AnimationContainer delay={100} animation="fadeIn slow">
          <Slider {...settings}>{testimonial_items()}</Slider>
        </AnimationContainer>
      )
    }
  }
  const testimonial_items =()=> {
    if (show || context.height === 'auto') {
      return props.testimonials.edges.map((value, index) => {
        return (
          <div className="testimonial" key={index}>
            <h2>{value.content.frontmatter.heading}</h2>
            <div
              className="testimonial_content"
              dangerouslySetInnerHTML={{
                __html: value.content.html,
              }}
            />
            <div className="client_container">
              <div className="client">
                <img
                  src={
                    value.content.frontmatter.image.childImageSharp.fluid.src
                  }
                  alt={value.content.frontmatter.name}
                />
                <div className="info">
                  <p className="name">{value.content.frontmatter.name}</p>
                  <p className="profession">
                    {value.content.frontmatter.profession}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      })
    }
  }

  const quote =() => {
    if (show) {
      return (
        <div className="quote">
          <AnimationContainer delay={0} animation="fadeIn slow">
            <FontAwesomeIcon icon={faQuoteLeft} />
          </AnimationContainer>
        </div>
      )
    }
  }

  return (
    <section
      id={`${props.id}`}
      className="testimonials"
      style={{ height: context.height }}
    >
      <Row
        className="top"
        style={{
          maxHeight:
            context.height !== 'auto'
              ? context.height * 0.8
              : 'inherit',
        }}
      >
        <div className="content">
          <Col md={12}>
            <div className="line-text">
              <h4>Testimonnials</h4>
            </div>
            <div className="heading">
              <BaffleText
                text="Reviews by Clients"
                revealDuration={500}
                revealDelay={500}
                parentMethod={setShowHolder}
                callMethodTime={1100}
              />
            </div>
            <div
              className="testimonials_container"
              style={{
                minHeight:
                  context.height !== 'auto'
                    ? context.height * 0.6
                    : 'auto',
              }}
            >
              <Container>
                {quote()}
                {testimonial_slider()}
              </Container>
            </div>
          </Col>
        </div>
      </Row>
      <Row className="bottom">{clients()}</Row>
    </section>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
          query {
            clients: allFile(filter: {extension: {regex: "/(png)/"}, relativeDirectory: {eq: "clients"}}) {
              edges {
                node {
                  childImageSharp {
                    fluid(maxWidth: 500) {
                      src
                    }
                  }
                }
              }
            }
            testimonials: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/(testimonials)/"}}, sort: {fields: [frontmatter___id], order: ASC}, limit: 8) {
                edges {
                  content: node {
                    html
                    frontmatter {
                      id
                      name
                      profession
                      heading
                      image {
                        childImageSharp {
                          fluid(maxWidth: 200, maxHeight: 200) {
                            src
                          }
                        }
                      }
                    }
                  }
                }
              }
          }
        `}
    render={({ clients, testimonials }) => (
      <Testimonials clients={clients} testimonials={testimonials} {...props} />
    )}
  />
)
