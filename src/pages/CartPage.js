import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import {
  fetchIndexcontent,
  fetchIndexcontentSuccess,
  fetchIndexcontentFailure
} from '../actions/contents';

import { editCartGoods, deleteCartGoods } from '../actions/goods'

// import Intro from '../containers/IntroContainer';


class CartPage extends Component {

  constructor(props) {
    super(props);
    this.nextMethod = this.nextMethod.bind(this);
    this.deleteGood = this.deleteGood.bind(this);
    this.state = { 
      methodState: 1
    };
  }
  
  componentDidMount() {
    // this.props.fetchIndexcontent();
    //this.props.indexContent.content = initialContentState.contents.index.content;
  }

  nextMethod() {
    this.setState({
      methodState: this.state.methodState + 1
    })
  }

  deleteGood(index) {
    // let beforeDelete = [...this.props.incartGoods.goods];
    // let deletedCartGoods = beforeDelete(index, 1);
    // this.props.deleteGood(deletedCartGoods);
  }

  renderGoods(goods) {
    return goods.map((good, index) => {
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
                {good.brand}
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
              <span class="minus">
                <i class="icofont icofont-minus"></i>
              </span>
              <span class="input">
                <input type="text" value={good.amount}/>
              </span>
              <span class="plus">
                <i class="icofont icofont-plus"></i>
              </span>
            </span>
          </div>

          <div class="total">
            <i class="icofont icofont-cur-dollar"></i>
            <span>{good.cost}</span>
          </div>

          <div class="rmv text-center">
            <button class="remove-btn" onClick={() => this.deleteGood(index)}>
              <i class="icofont icofont-close-line"></i>
            </button>
          </div>

        </div>
      );
    });
  }

  renderFirstMethod() {
    return (
      <div class="row block none-padding-top">
        <div class="col-xs-12">
          <div class="product-list">
            <div class="wrap bg-white">

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
                <div class="rmv hidden-xs hidden-sm">
                  Remove
                </div>
              </div>

              <div class="list-body">

                {this.renderGoods(this.props.incartGoods.goods)}
                            
              </div>
                        
              <div class="list-footer bg-blue">
                <a onClick={this.nextMethod} class="btn btn-default btn-material">
                  <i class="icofont icofont-cart-alt"></i>
                  <span class="body">Make a purchase</span>
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

  renderSecondMethod() {
    return (
      <div class="row block none-padding-top">       
        <div class="col-xs-12 get-height">
          <div class="sdw-block">
            <div class="wrap bg-white">
              <div class="row">
                <div class="col-xs-12">
                  <div class="panel-group" id="accordion">

                    <div class="panel panel-default">

                      <div class="panel-heading" id="headingOne">
                        <h4 class="panel-title">
                          <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
                            <span class="panel-indicator"></span>
                            Use address from your profile
                          </a>
                        </h4>
                      </div>

                      <div id="collapseOne" class="panel-collapse collapse">
                        <div class="panel-body">
                          <form class="form-horizontal">
                            <div class="form-group">
                              <label class="col-sm-3 control-label pd-none">Shipping address:</label>
                              <div class="col-sm-9">
                                <span class="text">
                                  12A Questen, Mt Vernon, NY 10550, US
                                </span>
                              </div>
                            </div>
                            <div class="form-group padding">
                              <label class="col-sm-3 control-label pd-none">Cost delivery:</label>
                              <div class="col-sm-9">
                                <span class="text">
                                  <b>$456</b>.00
                                </span>
                              </div>
                            </div>
                            <div class="form-group">
                              <div class="col-sm-offset-3 col-sm-7">
                                <a onClick={this.nextMethod} class="sdw-hover btn btn-material btn-yellow ripple-cont">Accept</a>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>

                    <div class="panel panel-default">

                      <div class="panel-heading" id="headingTwo">
                        <h4 class="panel-title">
                          <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">
                            <span class="panel-indicator"></span>
                            Use the new address
                          </a>
                        </h4>
                      </div>

                      <div id="collapseTwo" class="panel-collapse collapse in">
                        <div class="panel-body">
                          <form class="form-horizontal">
                            <div class="form-group">
                              <label for="autocomplete" class="col-sm-2 control-label">Address</label>
                              <div class="col-sm-10">
                                <input type="text"
                                  class="form-control"
                                  id="autocomplete"
                                  placeholder="Enter your address"
                                  onFocus="geolocate()"/>
                              </div>
                            </div>
                            <div class="form-group padding">
                              <label class="col-sm-3 control-label pd-none">Cost delivery:</label>
                              <div class="col-sm-9">
                                <span class="text">
                                  <b>$456</b>.00
                                </span>
                              </div>
                            </div>
                            <div class="form-group">
                              <div class="col-sm-offset-3 col-sm-8">
                                <span class="sdw-wrap">
                                  <a onClick={this.nextMethod} class="sdw-hover btn btn-material btn-yellow btn-lg ripple-cont">Go to next step</a>
                                  <span class="sdw"></span>
                                </span>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  render() {
    
    // const { content, loading, error } = this.props.indexContent;

    // if(loading) {
    //   return <div className="container"><h1>MeatSEO</h1><h3>Loading...</h3></div>      
    // } else if(error) {
    //   return <div className="alert alert-danger">Error: {error.message}</div>
    // } else if(!content) {
    //   return <NotFoundPage/>
    // }
    
    // console.log('enter indexPage: ', this.props);
    
    return (
      <div>
        <div class="container">

          <div class="row block none-padding-top">
            <div class="col-xs-12">
              <ul class="steps row">
                <li class="active col-xs-12 col-sm-4 col-md-4 col-lg-3">
                  <div class="icon number bg-blue">
                    1
                  </div>
                  <span>
                    Confirm 
                  </span>
                  products list
                  <span class="dir-icon hidden-xs">
                    <i class="icofont icofont-stylish-right text-yellow"></i>
                  </span>
                </li>
                <li class="hidden-xs col-sm-4 col-md-4 col-lg-3">
                  <div class="icon number bg-grey">
                    2
                  </div>
                  <span>
                    Enter
                  </span>
                  your address
                  <span class="dir-icon">
                    <i class="icofont icofont-stylish-right"></i>
                  </span>
                </li>
                <li class="hidden-xs col-sm-4 col-md-4 col-lg-3">
                  <div class="icon number bg-grey">
                    3
                  </div>
                  <span>
                    Select
                  </span>
                  payment method
                  <span class="dir-icon hidden-sm hidden-md">
                    <i class="icofont icofont-stylish-right"></i>
                  </span>
                </li>
                <li class="hidden-xs col-lg-3 hidden-sm hidden-md">
                  <div class="icon number bg-grey">
                    4
                  </div>
                  <span>
                    Confirm
                  </span>
                  your order
                </li>
              </ul>
            </div>
          </div>
          
          {
            (() => {
              if (this.state.methodState == 1) {
                return this.renderFirstMethod();
              } else if (this.state.methodState == 2) {
                return this.renderSecondMethod();
              } else if (this.state.methodState == 3) {
                return <div/>
              }
            })()
          }

{this.state.goods}
        </div>
        
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchIndexcontent: () => {
      dispatch(fetchIndexcontent()).then((response) => {
        console.log('indexContent: ', response.payload);
        !response.error ? dispatch(fetchIndexcontentSuccess(response.payload)) : dispatch(fetchIndexcontentFailure(response.payload));
      });
    },
    deleteGood: (cartGoods) => {
      dispatch(deleteCartGoods(cartGoods));
    }
  }
};


function mapStateToProps(state) {
  return {
    indexContent: state.contents.index,
    incartGoods: state.goods.incartGoods
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);