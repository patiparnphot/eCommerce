import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import Navbar from '../containers/NavbarContainer';
import Good from '../containers/GoodContainer';
import NotFoundPage from '../components/NotFoundPage.js';

function GoodPage () {
      
  //const { content, loading, error } = this.props.indexContent;

  React.useEffect(() => {
    //$(document).ready(function() {
      // Summernote editor
      //demo.initSummernote();
    //});
  },[]);

  const { slug } = useParams();

  if(!slug) {
    return <div className="container"><h1>MeatSEO</h1><h3>Loading...</h3></div>      
  //} else if(error) {
  //  return <div className="alert alert-danger">Error: {error.message}</div>
  //} else if(!content) {
  //  return <NotFoundPage/>
  }
  

  return (
    <div>
      <Navbar pagename="CURRENT GOOD" />
      <p>{slug}</p>
      <Good slug={slug}/>
    </div>
  );
}


const mapDispatchToProps = (dispatch) => {
  return {};
}


function mapStateToProps(state, ownProps) {
  return {
    //blogAmount: ownProps.blogAmount
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodPage);