import React, { useState, useContext} from 'react'
import { StaticQuery, graphql } from 'gatsby'
import './styles.scss'
import { Row, Col } from 'react-bootstrap'
import AnimationContainer from 'components/animation-container'
import BaffleText from 'components/baffle-text'
import Tilt from 'react-tilt'
import ThemeContext from '../../context'

const Portfolio = (props) => {
  const context = useContext(ThemeContext);
  const [category, setCategory] = useState(null);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const { items } = props;

  const [itemss, setItemss] = useState(items);

  const showPortfolioHolder = () => {
    setShowPortfolio(true);
  }

 const itemsHolder =()=> {
    if (showPortfolio || context.height === 'auto') {
      const { items } = props;
      return items.map((value, index) => {
        if (
          value.content.frontmatter.category === category ||
          !category
        ) {
          if (value.content.frontmatter.image) {
            return (
              <div
                className="portfolio_item"
                
                key={index}
              >
                <AnimationContainer delay={200} animation="fadeIn" key={index}>
                  <img
                    src={
                      value.content.frontmatter.image.childImageSharp.fluid.src
                    }
                    alt={value.content.frontmatter.title}
                
                  />
                  <Tilt className="Tilt" options={{ scale: 1, max: 50 }}>
                    <div className="overlay">
                      <span className="title">
                        {value.content.frontmatter.title}
                      </span>
                    </div>
                  </Tilt>
                </AnimationContainer>
              </div>
            )
          }
        }
        return false
      })
    }
  }

  

  const changeCategory = (category) => {
    const { items } = props
    setItemss([]);
    let total = 0
    items.forEach(v => {
      if (v.content.frontmatter.category === category || !category) total++
    })

    setCategory(category)
    setTimeout(() => {
     setItemss(items);
    }, 50)
  }

  const categories=()=> {
    const { items } = props
    let categories = []
    for (var v of items) {
      categories.push(v.content.frontmatter.category)
    }
    categories = [...new Set(categories)]
    return categories.map((value, index) => {
      return (
        <button
          className="portfolio_category"
          onClick={() => changeCategory(value)}
          key={index}
        > 
          <span className={`${category === value ? 'active' : ''}`}>
            {value}
          </span>
        </button>
      )
    })
  }

  return (
    <section
      id={`${props.id}`}
      className="portfolio"
      style={{ height: context.height }}
    >
      <Row>
        <Col md={2} className="side">
          <h2>
            <BaffleText
              text="Portfolio"
              revealDuration={500}
              revealDelay={500}
              parentMethod={showPortfolioHolder}
              callMethodTime={1100}
            />
          </h2>
        </Col>
        <Col md={10} className="recent-works">
          <div className="portfolio_selector">
            <button
              className="portfolio_category"
              onClick={() => changeCategory(null)}
            >
              <span className={`${!category ? 'active' : ''}`}>
                All
              </span>
            </button>
            {categories()}
          </div>

          <div className="content">
            <div
              className="portfolio_container"
              style={{
                maxHeight:
                  context.height !== 'auto'
                    ? context.height * 0.8
                    : 'inherit',
              }}
            >
              {itemsHolder()}
            </div>
          </div>
        </Col>
      </Row>
    </section>
  )

}

export default props => (
  <StaticQuery
    query={graphql`
          query {
            items: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/(portfolio)/"}}, sort: {fields: [frontmatter___id], order: ASC}, 
            # The layout is built for 6 portfolio items #
            limit: 6) {
              edges {
                content: node {
                  html
                  frontmatter {
                    id
                    title
                    category
                    image {
                      childImageSharp {
                        fluid(maxWidth: 2000, maxHeight: 2000) {
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
    render={({ items }) => <Portfolio items={items.edges} {...props} />}
  />
)
