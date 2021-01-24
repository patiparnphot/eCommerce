import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import Navbar from '../containers/NavbarContainer';
import Order from '../containers/OrderContainer';
import NotFoundPage from '../components/NotFoundPage.js';

function OrderPage () {
      
  //const { content, loading, error } = this.props.indexContent;
  // const history = useHistory();

  // React.useEffect(() => {
  //   if(editGood.good) {
  //     console.log("editGood change!!!");
  //     history.push("/admin/goods/");
  //   }
  // }, [editGood]);

  const { invoiceId } = useParams();

  if(!invoiceId) {
    return <div className="container"><h1>MeatSEO</h1><h3>Loading...</h3></div>      
  //} else if(error) {
  //  return <div className="alert alert-danger">Error: {error.message}</div>
  //} else if(!content) {
  //  return <NotFoundPage/>
  }
  

  return (
    <div>
      <Navbar pagename="CURRENT ORDER" />
      <h2 style={{textAlign: "center"}}><b>InvoiceId: {invoiceId}</b></h2>
      <hr/>
      <Order invoiceId={invoiceId}/>
    </div>
  );
}


const mapDispatchToProps = (dispatch) => {
  return {};
}


function mapStateToProps(state, ownProps) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);