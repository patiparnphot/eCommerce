import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import Navbar from '../containers/NavbarContainer';
import Blog from '../containers/BlogContainer';
import NotFoundPage from '../components/NotFoundPage.js';

function BlogPage () {
      
  //const { content, loading, error } = this.props.indexContent;

  React.useEffect(() => {
    //$(document).ready(function() {
      // Summernote editor
      //demo.initSummernote();
    //});
  },[]);

  const { title } = useParams();

  if(!title) {
    return <div className="container"><h1>MeatSEO</h1><h3>Loading...</h3></div>      
  //} else if(error) {
  //  return <div className="alert alert-danger">Error: {error.message}</div>
  //} else if(!content) {
  //  return <NotFoundPage/>
  }
  

  return (
    <div>
      <Navbar pagename="CURRENT BLOG" />
      <p>{title}</p>
      <Blog title={title}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage);