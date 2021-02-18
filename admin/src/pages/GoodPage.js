import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import Navbar from '../containers/NavbarContainer';
import Good from '../containers/GoodContainer';
import NotFoundPage from '../components/NotFoundPage.js';

function GoodPage ({editGood}) {
      
  //const { content, loading, error } = this.props.indexContent;
  const history = useHistory();

  React.useEffect(() => {
    if(editGood.good) {
      console.log("editGood change!!!");
      history.push("/admin/goods/");
    }
  }, [editGood]);

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
      <Good slug={slug}/>
    </div>
  );
}


const mapDispatchToProps = (dispatch) => {
  return {};
}


function mapStateToProps(state, ownProps) {
  return {
    editGood: state.goods.editGood
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodPage);