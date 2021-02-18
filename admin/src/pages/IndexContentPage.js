import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Navbar from '../containers/NavbarContainer';
import IndexContent from '../containers/IndexContentContainer';
import NotFoundPage from '../components/NotFoundPage.js';

function IndexContentPage ({newContent}) {
      
  //const { content, loading, error } = this.props.indexContent;
  const history = useHistory();

  React.useEffect(() => {
    if(newContent.content) {
      console.log("indexContent change!!!");
      history.push("/admin/");
    }
  }, [newContent]);

  // if(loading) {
  //   return <div className="container"><h1>MeatSEO</h1><h3>Loading...</h3></div>      
  //} else if(error) {
  //  return <div className="alert alert-danger">Error: {error.message}</div>
  //} else if(!content) {
  //  return <NotFoundPage/>
  // }
  

  return (
    <div>
      <IndexContent/>
    </div>
  );
}


const mapDispatchToProps = (dispatch) => {
  return {};
}


function mapStateToProps(state, ownProps) {
  return {
    newContent: state.contents.newContent
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexContentPage);