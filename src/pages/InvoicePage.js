import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  fetchIndexcontent,
  fetchIndexcontentSuccess,
  fetchIndexcontentFailure
} from '../actions/contents';

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
    console.log({...this.props});
    this.props.fetchActiveOrder(this.state.invoiceId);
  }
  
  componentWillUnmount() {
    this.props.resetOrder();
    console.log(this.props.activeOrder);
  }
  
  render() {

    // const { content, loading, error } = this.props.indexContent;

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
    } else if(!order) {
      return <div/>
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
                                        <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#bankTransrerColl">
                                            <span class="panel-indicator"></span>
                                            Direct bank transfer
                                        </a>
                                    </h4>
                                </div>

                                <div id="bankTransrerColl" class="panel-collapse collapse">
                                  <div class="panel-body">

                                    <div class="row">
                                      <div class="col-sm-4">
                                          Bank Name
                                          <hr/>
                                          Kasikorn Bank
                                      </div>
                                      <div class="col-sm-4">
                                          Account Name
                                          <hr/>
                                          Mr.something isHere
                                      </div>
                                      <div class="col-sm-4">
                                          Account number
                                          <hr/>
                                          330923809458034
                                      </div>
                                    </div>

                                  </div>
                                </div>

                            </div>

                            <div class="panel panel-default">

                                <div class="panel-heading" id="headingTwo">
                                    <h4 class="panel-title">
                                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">
                                            <span class="panel-indicator"></span>
                                            Payment Method
                                        </a>
                                    </h4>
                                </div>

                                <div id="collapseTwo" class="panel-collapse collapse in">
                                    <div class="panel-body">
                                        3 Thing to inform
                                        <ul>
                                          <li>InvoiceId</li>
                                          <li>netCost</li>
                                          <li>slip picture</li>
                                        </ul>

                                        to one of these contact
                                        <ul>
                                          <li>Facebook: www.facebook.com/something</li>
                                          <li>Line: @something</li>
                                          <li>Email: somrthing@email.com</li>
                                        </ul>
                                    
                                    </div>
                                </div>
                            
                            </div>
                                
                        </div>
                    </div>
                </div>
                        
      </div>
    );
  }
}

function CFGoods(props) {
  return props.goods.map((good) => {
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
            <i class="icofont icofont-cur-dollar"></i>
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
          <i class="icofont icofont-cur-dollar"></i>
          <span>{good.cost}</span>
        </div>

      </div>
    );
  });
}

function ThirdMethod(props) {
  return (
    <div class="row block none-padding-top">
      <div class="col-xs-12">
        <div class="product-list">
          <div class="wrap bg-white">
            
            <div class="row" style={{margin: "0px"}}>
              <div class="col-sm-12 control-label pd-none">
                <h3>
                  <b>{props.firstname} {props.lastname}</b>
                </h3>
              </div>
            </div>
            <div class="row" style={{margin: "0px"}}>
              <label class="col-sm-3 control-label pd-none">Telephone:</label>
              <div class="col-sm-9">
                <span class="text">
                  {props.telephone}
                </span>
              </div>
            </div>
            <div class="row" style={{margin: "0px"}}>
              <label class="col-sm-3 control-label pd-none">Shipping Address:</label>
              <div class="col-sm-9">
                <span class="text">
                  {props.address}
                </span>
              </div>
            </div>

            <hr/>

            <div class="list-header text-uppercase">
              <div class="product">
                Product
              </div>
              <div class="price hidden-xs hidden-sm">
                Price
              </div>
              <div class="qnt hidden-xs hidden-sm">
                Quantity
              </div>
              <div class="total hidden-xs hidden-sm">
                Total
              </div>
            </div>

            <div class="list-body">

              <CFGoods goods={props.goods}/>

              <div class="item">

                <div class="product">
                  Sub Total:
                </div>

                <div class="price hidden-xs">
                  <span class="price"></span>
                </div>

                <div class="qnt"></div>

                <div class="total">
                  <i class="icofont icofont-cur-dollar"></i>
                  <span><b>{props.subTotal}</b></span>
                </div>

              </div>

              <div class="item">

                <div class="product">
                  Cost delivery:
                </div>

                <div class="price hidden-xs">
                  <span class="price"></span>
                </div>

                <div class="qnt"></div>

                <div class="total">
                  <i class="icofont icofont-cur-dollar"></i>
                  <span><b>{props.deliverCost}</b></span>
                </div>

              </div>
                          
            </div>

            <div class="list-body">
              <div class="item">

                <div class="product">
                  Net Cost:
                </div>

                <div class="price hidden-xs">
                  <span class="price"></span>
                </div>

                <div class="qnt"></div>

                <div class="total">
                  <i class="icofont icofont-cur-dollar"></i>
                  <span><b>{props.netCost}</b></span>
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
    fetchIndexcontent: () => {
      dispatch(fetchIndexcontent()).then((response) => {
        console.log('indexContent: ', response.payload);
        !response.error ? dispatch(fetchIndexcontentSuccess(response.payload)) : dispatch(fetchIndexcontentFailure(response.payload));
      });
    },
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


function mapStateToProps(state) {
  return {
    indexContent: state.contents.index,
    member: state.member,
    activeOrder: state.orders.activeOrder
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(InvoicePage));