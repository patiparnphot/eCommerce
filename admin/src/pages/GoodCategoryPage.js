import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import Navbar from '../containers/NavbarContainer';
import GoodCategory from '../containers/GoodCategoryContainer';
import NotFoundPage from '../components/NotFoundPage.js';

function GoodCategoryPage ({editCategory}) {
      
  //const { content, loading, error } = this.props.indexContent;
  const history = useHistory();

  React.useEffect(() => {
    if(editCategory.good) {
      console.log("editGoodCategory change!!!");
      history.push("/admin/goodCategories/");
    }
  }, [editCategory]);

  const { categoryTitle } = useParams();

  if(!categoryTitle) {
    return <div className="container"><h1>MeatSEO</h1><h3>Loading...</h3></div>      
  //} else if(error) {
  //  return <div className="alert alert-danger">Error: {error.message}</div>
  //} else if(!content) {
  //  return <NotFoundPage/>
  }
  

  return (
    <div>
      <GoodCategory categoryTitle={categoryTitle}/>
    </div>
  );
}


const mapDispatchToProps = (dispatch) => {
  return {};
}


function mapStateToProps(state, ownProps) {
  return {
    editCategory: state.categories.editCategory
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodCategoryPage);