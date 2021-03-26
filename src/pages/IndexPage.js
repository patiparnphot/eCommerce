import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import {
  fetchIndexcontent,
  fetchIndexcontentSuccess,
  fetchIndexcontentFailure
} from '../actions/contents';

import {
  fetchRecentGoods,
  fetchRecentGoodsSuccess,
  fetchRecentGoodsFailure
} from '../actions/goods';

import Intro from '../components/IntroComponent';
import Recent from '../components/RecentComponent';
import Campaign from '../components/CampaignComponent';
import PopularOnShop from '../containers/PopularOnShopContainer';
import Information from '../components/InformationComponent';
import Blogs from '../containers/BlogsContainer';
import NotFoundPage from '../components/NotFoundPage.js';
import Loader from '../components/loader';

class IndexPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      initial: "initial"
    }
  }
  
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchIndexcontent();
    this.props.fetchRecentGoods((e) => this.setState({initial: e}));
  }
  
  render() {
    
    const { content, loading, error } = this.props.indexContent;

    if(loading) {
      return <Loader/>      
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
          <Recent recent={content.recent} recentGoods={this.props.recentGoods.goods} initial={this.state.initial} setInitial={(e) => this.setState({initial: e})} memberRate={this.props.memberRate} />
          <Campaign campaign={content.campaign} />
          <PopularOnShop popularOnShop={content.popularOnShop} memberLike={this.props.memberLike} memberRate={this.props.memberRate} />
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
    },
    fetchRecentGoods: (setInitial) => {
      dispatch(fetchRecentGoods()).then((response) => {
        console.log('recentGoods: ', response.payload);
        !response.error ? dispatch(fetchRecentGoodsSuccess(response.payload)) : dispatch(fetchRecentGoodsFailure(response.payload));
        setInitial("loading");
      });
    }
  }
};


function mapStateToProps(state, ownProps) {
  return {
    indexContent: state.contents.index,
    recentGoods: state.goods.recentGoods,
    memberRate: ownProps.memberRate,
    memberLike: ownProps.memberLike
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);