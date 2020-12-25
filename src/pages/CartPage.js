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
    this.previousMethod = this.previousMethod.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.calculateCost = this.calculateCost.bind(this);
    this.state = { 
      methodState: 1,
      firstname: "",
      lastname: "",
      telephone: "",
      email: "",
      address: "",
      subTotal: 0,
      deliverCost: 0,
      netCost: 0
    };
  }
  
  componentDidMount() {
    // this.props.fetchIndexcontent();
    //this.props.indexContent.content = initialContentState.contents.index.content;
    let user = this.props.member.user;
    this.setState({
      firstname: user.firstname,
      lastname: user.lastname,
      telephone: user.telephone,
      email: user.email,
      address: user.address
    });
  }

  nextMethod() {
    if(this.state.methodState == 2) {
      this.calculateCost([...this.props.incartGoods.goods]);
    }
    this.setState({
      methodState: this.state.methodState + 1
    })
  }

  previousMethod() {
    this.setState({
      methodState: this.state.methodState - 1
    })
  }

  deleteGood(index) {
    this.props.deleteGood(index, [...this.props.incartGoods.goods]);
  }

  addGood(index) {
    this.props.addGood(index, [...this.props.incartGoods.goods]);
  }

  reduceGood(index) {
    if ([...this.props.incartGoods.goods][index].amount > 1) {
      this.props.reduceGood(index, [...this.props.incartGoods.goods]);
    }
  }

  changeInput(event, input) {
    if( input == "firstname" ) {
      this.setState({
        firstname: event.target.value
      });
    } else if( input == "lastname" ) {
      this.setState({
        lastname: event.target.value
      });
    } else if( input == "telephone" ) {
      this.setState({
        telephone: event.target.value
      });
    } else if( input == "address" ) {
      this.setState({
        address: event.target.value
      });
    }
  }

  calculateCost(goods) {
    let sum = 0;
    goods.forEach((good, index) => {
      sum += good.cost;
      if(index == (goods.length - 1)) {
        if(sum > 200) {
          this.setState({
            subTotal: sum,
            deliverCost: 0,
            netCost: sum
          })
        } else {
          this.setState({
            subTotal: sum,
            deliverCost: 150,
            netCost: sum + 150
          })
        }
      }
    })
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
              <span class="minus" onClick={() => this.reduceGood(index)}>
                <i class="icofont icofont-minus"></i>
              </span>
              <span class="input">
                <input type="text" value={good.amount}/>
              </span>
              <span class="plus" onClick={() => this.addGood(index)}>
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

  renderCFGoods(goods) {
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

                      <h2>Please check your personal information</h2>
                      
                      <div class="panel-body">
                        <form class="form-horizontal">
                          <div class="form-group">
                            <label for="firstname" class="col-sm-3 control-label">Firstname:</label>
                            <div class="col-sm-9">
                              <input
                                type="text" class="form-control" id="firstname"
                                placeholder="Enter your firstname"
                                value={this.state.firstname}
                                onChange={(e) => this.changeInput(e, "firstname")}
                              />
                            </div>
                          </div>
                          <div class="form-group">
                            <label for="lastname" class="col-sm-3 control-label">Lastname:</label>
                            <div class="col-sm-9">
                              <input
                                type="text" class="form-control" id="lastname"
                                placeholder="Enter your lastname"
                                value={this.state.lastname}
                                onChange={(e) => this.changeInput(e, "lastname")}
                              />
                            </div>
                          </div>
                          <div class="form-group">
                            <label for="telephone" class="col-sm-3 control-label">Telephone:</label>
                            <div class="col-sm-9">
                              <input
                                type="text" class="form-control" id="telephone"
                                placeholder="Enter your telephone number"
                                value={this.state.telephone}
                                onChange={(e) => this.changeInput(e, "telephone")}
                              />
                            </div>
                          </div>
                          <div class="form-group">
                            <label for="email" class="col-sm-3 control-label">Email:</label>
                            <div class="col-sm-9">
                              <input
                                type="text" class="form-control" id="email"
                                placeholder="Enter your email"
                                value={this.state.email}
                                disabled
                              />
                            </div>
                          </div>
                          <div class="form-group padding">
                            <label for="address" class="col-sm-3 control-label">Address:</label>
                            <div class="col-sm-9">
                              <textarea
                                rows="3" class="form-control" id="address"
                                placeholder="Enter your address"
                                value={this.state.address}
                                onChange={(e) => this.changeInput(e, "address")}
                              />
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="col-sm-offset-3 col-sm-8">
                              <span class="sdw-wrap">
                                <a onClick={this.previousMethod} class="btn btn-default btn-material">
                                  <i class="icofont icofont-cart-alt"></i>
                                  <span class="body">Previous Method</span>
                                </a>
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
    );
  }

  renderThirdMethod() {
    return (
      <div class="row block none-padding-top">
        <div class="col-xs-12">
          <div class="product-list">
            <div class="wrap bg-white">
              
              <div class="row" style={{margin: "0px"}}>
                <div class="col-sm-12 control-label pd-none">
                  <h3>
                    <b>{this.state.firstname} {this.state.lastname}</b> ( {this.state.telephone} )
                  </h3>
                </div>
                <label class="col-sm-3 control-label pd-none">Shipping Address:</label>
                <div class="col-sm-9">
                  <span class="text">
                    {this.state.address}
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

                {this.renderCFGoods(this.props.incartGoods.goods)}

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
                    <span><b>{this.state.subTotal}</b></span>
                  </div>

                </div>

                <div class="item">

                  <div class="product">
                    Cost delivery:
                  </div>

                  <div class="qnt" style={{width: "32%"}}>
                    If SubTotal is more than 200, then we will deliver <b>FREE!!!</b>
                  </div>

                  <div class="total">
                    <i class="icofont icofont-cur-dollar"></i>
                    <span><b>{this.state.deliverCost}</b></span>
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
                    <span><b>{this.state.netCost}</b></span>
                  </div>

                </div>
              </div>
                        
              <div class="list-footer bg-blue">
                <a onClick={this.previousMethod} class="btn btn-default btn-material">
                  <i class="icofont icofont-cart-alt"></i>
                  <span class="body">Previous Method</span>
                </a>
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
                return this.renderThirdMethod();
              } else if (this.state.methodState == 4) {
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
    deleteGood: (index, cartGoods) => {
      let before = cartGoods.slice(0, index);
      let after = cartGoods.slice(index + 1, cartGoods.length + 1);
      let deletedGood = before.concat(after);
      console.log("deletedGood: ", deletedGood);
      dispatch(deleteCartGoods(deletedGood));
    },
    addGood: (index, cartGoods) => {
      let addedAmount = (+cartGoods[index].amount) + 1;
      let addedCost = (+cartGoods[index].costPerUnit) * addedAmount;
      let addedGood = [...cartGoods];
      addedGood[index].amount = addedAmount;
      addedGood[index].cost = addedCost;
      console.log("addedGood: ", addedGood);
      dispatch(editCartGoods(addedGood));
    },
    reduceGood: (index, cartGoods) => {
      let reducedAmount = (+cartGoods[index].amount) - 1;
      let reducedCost = (+cartGoods[index].costPerUnit) * reducedAmount;
      let reducedGood = [...cartGoods];
      reducedGood[index].amount = reducedAmount;
      reducedGood[index].cost = reducedCost;
      console.log("reducedGood: ", reducedGood);
      dispatch(editCartGoods(reducedGood));
    }
  }
};


function mapStateToProps(state) {
  return {
    indexContent: state.contents.index,
    incartGoods: state.goods.incartGoods,
    member: state.member
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);