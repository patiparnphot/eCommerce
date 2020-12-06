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
import Recent from '../containers/RecentContainer';
import Campaign from '../containers/CampaignContainer';
import PopularOnShop from '../containers/PopularOnShopContainer';
import Information from '../containers/InformationContainer';
import Blogs from '../containers/BlogsContainer';
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
      <div>
        <Helmet>
                   <title>{content.titleHtml}</title>
                   <meta name='description' content={content.descriptonHtml} />
        </Helmet>
        <Intro intro={content.intro} />
        <main id='main'>
          <Recent recent={content.recent} />
          <Campaign campaign={content.campaign} />
          <PopularOnShop popularOnShop={content.popularOnShop} />
          <Blogs blogs={content.blogs} />
          <Information information={content.information} />
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