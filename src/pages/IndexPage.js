import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

var initialContentState = require("../../initial_state/initialContentState.json");

import {
  fetchIndexcontent,
  fetchIndexcontentSuccess,
  fetchIndexcontentFailure
} from '../actions/contents';

import Intro from '../containers/IntroContainer';
import About from '../containers/AboutContainer';
import Services from '../containers/ServicesContainer';
import WhyUs from '../containers/WhyUsContainer';
import CallToAction from '../containers/CallToActionContainer';
import Features from '../containers/FeaturesContainer';
import Blogs from '../containers/BlogsContainer';
import Testimonials from '../containers/TestimonialsContainer';
import Team from '../containers/TeamContainer';
import Clients from '../containers/ClientsContainer';
import Pricing from '../containers/PricingContainer';
import Faq from '../containers/FaqContainer';
import NotFoundPage from '../components/NotFoundPage.js';

class IndexPage extends Component {
  
  componentDidMount() {
    this.props.fetchIndexcontent();
    //this.props.indexContent.content = initialContentState.contents.index.content;
  }
  
  render() {
    
    const { content, loading, error } = this.props.indexContent;

    if(loading) {
      return <div className="container"><h1>MeatSEO</h1><h3>Loading...</h3></div>      
    } else if(error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    } else if(!content) {
      return <NotFoundPage/>
    }
    
    // console.log('enter indexPage: ', this.props);
    
    return (
      <div className='container'>
        <Helmet>
                   <title>{content.titleHtml}</title>
                   <meta name='description' content={content.descriptonHtml} />
        </Helmet>
        <Intro intro={content.intro} />
        <main id='main'>
          <About about={content.about} />
          <Services services={content.services} />
          <WhyUs whyUs={content.whyUs} />
          <Blogs blogs={content.blogs} />
          <CallToAction callToAction={content.callToAction} />
        </main>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchIndexcontent: () => {
      dispatch(fetchIndexcontent()).then((response) => {
        console.log('indexContent: ', response.payload);
        !response.error ? dispatch(fetchIndexcontentSuccess(response.payload)) : dispatch(fetchIndexcontentFailure(response.payload));
      });
    }
  }
};


function mapStateToProps(state) {
  return {
    indexContent: state.contents.index
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);