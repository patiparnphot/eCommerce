import React, { Component } from 'react';
import { connect } from 'react-redux';


import Navbar from '../containers/NavbarContainer';
import Board from '../containers/BoardContainer';
import NotFoundPage from '../components/NotFoundPage.js';

class DashboardPage extends Component {
  
  componentDidMount() {
    //this.props.fetchIndexcontent();
  }
  
  render() {
    
    //const { content, loading, error } = this.props.indexContent;

    //if(loading) {
    //  return <div className="container"><h1>MeatSEO</h1><h3>Loading...</h3></div>      
    //} else if(error) {
    //  return <div className="alert alert-danger">Error: {error.message}</div>
    //} else if(!content) {
    //  return <NotFoundPage/>
    //}
    
    // console.log('enter indexPage: ', this.props);
    
    return (
      <div>
        <Navbar pagename="DASHBOARD" />
        <Board/>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {};
}


function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);