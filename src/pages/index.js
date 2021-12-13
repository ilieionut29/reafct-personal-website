import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from 'components/layout'
import Spinner from 'components/spinner'
import Homepage from 'sections/homepage/homepage'
import About from 'sections/about'
import Portfolio from 'sections/portfolio'
import Services from 'sections/services'
import Testimonials from 'sections/testimonials'
import Contact from 'sections/contact'

const HomePage = (props) => {
  const { site } = props.data;
  return (
    <div>
      <Helmet>
        <title>{site.meta.title}</title>
        <meta name="description" content={site.meta.description} />
      </Helmet>
      <Layout>
          <Homepage id="home" />
          <About id="about" />
          <Services id="services" />
          <Portfolio id="portfolio" />
          <Testimonials id="testimonials" />
          <Contact id="contact" />
      </Layout>
      <Spinner duration={1000} />
    </div>
  )
}


export default HomePage

export const pageQuery = graphql`
  query {
    site {
      meta: siteMetadata {
        title
        description
      }
    }
  }
`
