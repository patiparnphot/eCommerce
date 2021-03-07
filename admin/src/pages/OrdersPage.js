import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Navbar from '../containers/NavbarContainer';
import Orders from '../containers/OrdersContainer';
import NotFoundPage from '../components/NotFoundPage.js';

class OrdersPage extends Component {
  
  componentDidMount() {
    //this.props.fetchIndexcontent();
  }
  
  render() {
    
    //const { content, loading, error } = this.props.indexContent;

    // if() {
    //   return <div className="container"><h1>MeatSEO</h1><h3>Loading...</h3></div>      
    //} else if(error) {
    //  return <div className="alert alert-danger">Error: {error.message}</div>
    //} else if(!content) {
    //  return <NotFoundPage/>
    // }
    
    // console.log('enter indexPage: ', this.props);
    
    return (
      <div>
        <Orders/>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {};
}


function mapStateToProps(state, ownProps) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage);