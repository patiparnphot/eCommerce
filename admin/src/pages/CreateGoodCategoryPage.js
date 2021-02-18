import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Navbar from '../containers/NavbarContainer';
import CreateCategory from '../containers/CreateGoodCategoryContainer ';
import NotFoundPage from '../components/NotFoundPage.js';

function CreateCategoryPage ({newCategory}) {  

  const history = useHistory();

  React.useEffect(() => {
    if(newCategory.good) {
      console.log("newGoodCategory change!!!");
      history.push("/admin/goodCategories/");
    }
  }, [newCategory]);

  return (
    <div>
      <CreateCategory/>
    </div>
  );
}


const mapDispatchToProps = (dispatch) => {
  return {};
}


function mapStateToProps(state, ownProps) {
  return {
    newCategory: state.categories.newCategory
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCategoryPage);