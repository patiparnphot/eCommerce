import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NotFoundPage from '../components/NotFoundPage';
import Loader from '../components/loader';

import {
  fetchOrder,
  fetchOrderSuccess,
  fetchOrderFailure,
  resetActiveOrder
} from '../actions/orders';


class InvoicePage extends Component {

  constructor(props) {
    super(props);
    this.state = { invoiceId: this.props.match.params.invoiceId };
  }
  
  componentDidMount() {
    // console.log({...this.props});
    this.props.fetchActiveOrder(this.state.invoiceId);
  }
  
  componentWillUnmount() {
    this.props.resetOrder();
    console.log(this.props.activeOrder);
  }
  
  render() {

    function getHTML(htmlCode) {
      return { __html: htmlCode };
    }

    const { content } = this.props.cartContent;

    // if(loading) {
    //   return <div className="container"><h1>MeatSEO</h1><h3>Loading...</h3></div>      
    // } else if(error) {
    //   return <div className="alert alert-danger">Error: {error.message}</div>
    // } else 
    const { order, loading, error } = this.props.activeOrder;

    if(!this.props.member.user) {
      return (
        <h2 style={{textAlign: "center"}}>
          Please
          &nbsp;
          <Link to={{pathname:"/signin", state:{from: this.props.location.pathname}}}>
            LogIn
          </Link>
          &nbsp;
          first!!!
        </h2>
      );
    } else if(loading) {
      return <Loader/>
    } else if(!order || !content) {
      return <NotFoundPage/>
    } else if(this.props.member.user.username != order.customer.username) {
      return (
        <h5 class="container">
          Sorry, we cannot let someone other than a user, which ordered this invoice, access this data.
        </h5>
      );
    }

    // console.log('enter indexPage: ', content);
    
    return (
      <div class="container">
        
        <h2 style={{textAlign: "center"}}><b>InvoiceId: {this.state.invoiceId}</b></h2>
        <hr/>
        <ThirdMethod 
          content={content}
          firstname={order.customer.firstname}
          lastname={order.customer.lastname}
          telephone={order.customer.telephone}
          address={order.customer.address}
          goods={order.goods}
          subTotal={order.subTotal}
          deliverCost={order.delivereeFee}
          netCost={order.total}
        />;

        <div class="row">
          <div class="col-xs-12">
            <div class="panel-group" id="accordion">
                    
              <div class="panel panel-default">

                <div class="panel-heading" id="headingOne">
                  <h4 class="panel-title">
                    <a>
                      <span class="panel-indicator"></span>
                      {content.bankTransferHead}
                    </a>
                  </h4>
                </div>

                <div class="panel-body">

                  <div dangerouslySetInnerHTML={getHTML(content.bankTransferText)} />

                </div>

              </div>

              <div class="panel panel-default">

                <div class="panel-heading" id="headingTwo">
                  <h4 class="panel-title">
                    <a>
                      <span class="panel-indicator"></span>
                      {content.paymentMethodHead}
                    </a>
                  </h4>
                </div>

                <div class="panel-body">

                  <div dangerouslySetInnerHTML={getHTML(content.paymentMethodText)} />

                </div>

              </div>

            </div>
          </div>
        </div>
              
      </div>
    );
  }
}

function CFGoods({goods}) {
  return goods.map((good) => {
    return (
      <div class="item">

        <div class="product">
          <img src={good.image} alt=""/>
          <span class="comp-header st-8 text-uppercase">
            {good.title}
            <span>
              {good.category}
            </span>
            <span>
              {good.key}
            </span>
          </span>
        </div>

        <div class="price hidden-xs">
          <span class="price">
            <span class="icofont curr">฿</span>
            <span class="prc">
              <span>{good.costPerUnit}</span><small>.00</small>
            </span>
          </span>
        </div>

        <div class="qnt">
          <span>
            <span class="input">
              <input type="text" value={good.amount}/>
            </span>
          </span>
        </div>

        <div class="total">
          <span class="icofont curr">฿</span>
          <span>{good.cost}</span>
        </div>

      </div>
    );
  });
}

function ThirdMethod({
  content,
  firstname,
  lastname,
  telephone,
  address,
  goods,
  subTotal,
  deliverCost,
  netCost
}) {
  return (
    <div class="row block none-padding-top">
      <div class="col-xs-12">
        <div class="product-list">
          <div class="wrap bg-white">
            
            <div class="row" style={{margin: "0px"}}>
              <div class="col-sm-12 control-label pd-none">
                <h3>
                  <b>{firstname} {lastname}</b>
                </h3>
              </div>
            </div>
            <div class="row" style={{margin: "0px"}}>
              <label class="col-sm-3 control-label pd-none">{content.CFTelephone}</label>
              <div class="col-sm-9">
                <span class="text">
                  {telephone}
                </span>
              </div>
            </div>
            <div class="row" style={{margin: "0px"}}>
              <label class="col-sm-3 control-label pd-none">{content.CFAddress}</label>
              <div class="col-sm-9">
                <span class="text">
                  {address}
                </span>
              </div>
            </div>

            <hr/>

            <div class="list-header text-uppercase">
              <div class="product">
                {content.product}
              </div>
              <div class="price hidden-xs hidden-sm">
                {content.price}
              </div>
              <div class="qnt hidden-xs hidden-sm">
                {content.quantity}
              </div>
              <div class="total hidden-xs hidden-sm">
                {content.total}
              </div>
            </div>

            <div class="list-body">

              <CFGoods goods={goods}/>

              <div class="item">

                <div class="product">
                  {content.subTotal}
                </div>

                <div class="price hidden-xs">
                  <span class="price"></span>
                </div>

                <div class="qnt"></div>

                <div class="total">
                  <span class="icofont curr">฿</span>
                  <span><b>{subTotal}</b></span>
                </div>

              </div>

              <div class="item">

                <div class="product">
                  {content.deliverCost}
                </div>

                <div class="price hidden-xs">
                  <span class="price"></span>
                </div>

                <div class="qnt"></div>

                <div class="total">
                  <span class="icofont curr">฿</span>
                  <span><b>{deliverCost}</b></span>
                </div>

              </div>
                          
            </div>

            <div class="list-body">
              <div class="item">

                <div class="product">
                  {content.netCost}
                </div>

                <div class="price hidden-xs">
                  <span class="price"></span>
                </div>

                <div class="qnt"></div>

                <div class="total">
                  <span class="icofont curr">฿</span>
                  <span><b>{netCost}</b></span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchActiveOrder: (invoiceId) => {
      dispatch(fetchOrder(invoiceId)).then((response) => {
        console.log('activeOrder: ', response.payload);
        !response.error ? dispatch(fetchOrderSuccess(response.payload)) : dispatch(fetchOrderFailure(response.payload));
      });
    },
    resetOrder: () => {
      dispatch(resetActiveOrder());
    }
  }
};


function mapStateToProps(state, ownProps) {
  return {
    cartContent: state.contents.cart,
    member: state.member,
    activeOrder: state.orders.activeOrder
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(InvoicePage));