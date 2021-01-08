import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navbar from '../containers/NavbarContainer';
import Create from '../containers/CreateGoodContainer';
import NotFoundPage from '../components/NotFoundPage.js';

function CreatePage () {  

  return (
    <div>
      <Navbar pagename="CREATE GOOD" />
      <p>Write your good content here!!!</p>
      <Create/>
    </div>
  );
}


const mapDispatchToProps = (dispatch) => {
  return {};
}


function mapStateToProps(state, ownProps) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage);