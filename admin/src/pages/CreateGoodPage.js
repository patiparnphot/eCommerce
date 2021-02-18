import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Navbar from '../containers/NavbarContainer';
import Create from '../containers/CreateGoodContainer';
import NotFoundPage from '../components/NotFoundPage.js';

function CreatePage ({newGood}) {  

  const history = useHistory();

  React.useEffect(() => {
    if(newGood.good) {
      console.log("newGood change!!!");
      history.push("/admin/goods/");
    }
  }, [newGood]);

  return (
    <div>
      <Create/>
    </div>
  );
}


const mapDispatchToProps = (dispatch) => {
  return {};
}


function mapStateToProps(state, ownProps) {
  return {
    newGood: state.goods.newGood
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage);