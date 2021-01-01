import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  fetchIndexcontent,
  fetchIndexcontentSuccess,
  fetchIndexcontentFailure
} from '../actions/contents';

import {
  fetchCartGoods,
  editCartGoods,
  deleteCartGoods
} from '../actions/goods';

import {
  createOrder,
  createOrderSuccess,
  createOrderFailure,
  resetNewOrder
} from '../actions/orders';


function CartPage({
  deleteGood,
  addGood,
  reduceGood,
  createNewOrder,
  resetOrder,
  resetGoods,
  incartGoods,
  member,
  newOrder
}) {

  let history = useHistory();

  const [methodState, setMethodState] = React.useState(1);
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [telephone, setTelephone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [subTotal, setSubTotal] = React.useState(0);
  const [deliverCost, setDeliverCost] = React.useState(0);
  const [netCost, setNetCost] = React.useState(0);
  
  React.useEffect(() => {
    setFirstname(member.user.firstname);
    setLastname(member.user.lastname);
    setTelephone(member.user.telephone);
    setEmail(member.user.email);
    setAddress(member.user.address);
  }, []);

  React.useEffect(() => {
    if(newOrder.order) {
      let invoiceId = newOrder.order.invoiceId;
      resetOrder();
      resetGoods();
      history.push("/invoice/" + invoiceId);
    }
  }, [newOrder]);

  function nextMethod() {
    if(methodState == 2) {
      calculateCost([...incartGoods.goods]);
    }
    setMethodState(methodState + 1);
  }

  function previousMethod() {
    setMethodState(methodState - 1);
  }

  function deleteEvent(index) {
    deleteGood(index, [...incartGoods.goods]);
  }

  function addEvent(index) {
    addGood(index, [...incartGoods.goods]);
  }

  function reduceEvent(index) {
    if ([...incartGoods.goods][index].amount > 1) {
      reduceGood(index, [...incartGoods.goods]);
    }
  }

  function changeInput(event, input) {
    if( input == "firstname" ) {
      setFirstname(event.target.value);
    } else if( input == "lastname" ) {
      setLastname(event.target.value);
    } else if( input == "telephone" ) {
      setTelephone(event.target.value);
    } else if( input == "address" ) {
      setAddress(event.target.value);
    }
  }

  function calculateCost(goods) {
    let sum = 0;
    goods.forEach((good, index) => {
      sum += good.cost;
      if(index == (goods.length - 1)) {
        setSubTotal(sum);
        if(sum > 200) {
          setDeliverCost(0);
          setNetCost(sum);
        } else {
          setDeliverCost(150);
          setNetCost(sum + 150);
        }
      }
    })
  }

  function makeOrder() {
    let order = {
      goods: incartGoods.goods,
      customer: {
        firstname: firstname,
        lastname: lastname,
        address: address,
        email: email,
        telephone: telephone
      },
      subTotal: subTotal,
      delivereeFee: deliverCost,
      total: netCost
    };
    createNewOrder(order, member.token);
  }
  
    
  // const { content, loading, error } = this.props.indexContent;

  // if(loading) {
  //   return <div className="container"><h1>MeatSEO</h1><h3>Loading...</h3></div>      
  // } else if(error) {
  //   return <div className="alert alert-danger">Error: {error.message}</div>
  // } else 
  if(!incartGoods) {
    return <div/>
  }

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
            if (methodState == 1) {
              return <FirstMethod incartGoods={[...incartGoods.goods]} reduceEvent={reduceEvent} addEvent={addEvent} deleteEvent={deleteEvent} nextMethod={nextMethod}/>;
            } else if (methodState == 2) {
              return <SecondMethod changeInput={changeInput} firstname={firstname} lastname={lastname} telephone={telephone} email={email} address={address} previousMethod={previousMethod} nextMethod={nextMethod}/>;
            } else if (methodState == 3) {
              return <ThirdMethod firstname={firstname} lastname={lastname} telephone={telephone} address={address} incartGoods={[...incartGoods.goods]} subTotal={subTotal} deliverCost={deliverCost} netCost={netCost} previousMethod={previousMethod} makeOrder={makeOrder}/>;
            } else if (methodState == 4) {
              return <div/>
            }
          })()
        }

      </div>
      
    </div>
  );
}

function Goods(props) {
  return props.incartGoods.map((good, index) => {
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
            <span class="minus" onClick={() => props.reduceEvent(index)}>
              <i class="icofont icofont-minus"></i>
            </span>
            <span class="input">
              <input type="text" value={good.amount}/>
            </span>
            <span class="plus" onClick={() => props.addEvent(index)}>
              <i class="icofont icofont-plus"></i>
            </span>
          </span>
        </div>

        <div class="total">
          <i class="icofont icofont-cur-dollar"></i>
          <span>{good.cost}</span>
        </div>

        <div class="rmv text-center">
          <button class="remove-btn" onClick={() => props.deleteEvent(index)}>
            <i class="icofont icofont-close-line"></i>
          </button>
        </div>

      </div>
    );
  });
}

function CFGoods(props) {
  return props.incartGoods.map((good) => {
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

function FirstMethod(props) {
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

              <Goods incartGoods={props.incartGoods} reduceEvent={props.reduceEvent} addEvent={props.addEvent} deleteEvent={props.deleteEvent}/>
                          
            </div>
                      
            <div class="list-footer bg-blue">
              <a onClick={() => props.nextMethod()} class="btn btn-default btn-material">
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

function SecondMethod(props) {
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
                              value={props.firstname}
                              onChange={(e) => props.changeInput(e, "firstname")}
                            />
                          </div>
                        </div>
                        <div class="form-group">
                          <label for="lastname" class="col-sm-3 control-label">Lastname:</label>
                          <div class="col-sm-9">
                            <input
                              type="text" class="form-control" id="lastname"
                              placeholder="Enter your lastname"
                              value={props.lastname}
                              onChange={(e) => props.changeInput(e, "lastname")}
                            />
                          </div>
                        </div>
                        <div class="form-group">
                          <label for="telephone" class="col-sm-3 control-label">Telephone:</label>
                          <div class="col-sm-9">
                            <input
                              type="text" class="form-control" id="telephone"
                              placeholder="Enter your telephone number"
                              value={props.telephone}
                              onChange={(e) => props.changeInput(e, "telephone")}
                            />
                          </div>
                        </div>
                        <div class="form-group">
                          <label for="email" class="col-sm-3 control-label">Email:</label>
                          <div class="col-sm-9">
                            <input
                              type="text" class="form-control" id="email"
                              placeholder="Enter your email"
                              value={props.email}
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
                              value={props.address}
                              onChange={(e) =>props.changeInput(e, "address")}
                            />
                          </div>
                        </div>
                        <div class="form-group">
                          <div class="col-sm-offset-3 col-sm-8">
                            <span class="sdw-wrap">
                              <a onClick={() => props.previousMethod()} class="btn btn-default btn-material">
                                <i class="icofont icofont-cart-alt"></i>
                                <span class="body">Previous Method</span>
                              </a>
                              <a onClick={() => props.nextMethod()} class="sdw-hover btn btn-material btn-yellow btn-lg ripple-cont">Go to next step</a>
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

              <CFGoods incartGoods={props.incartGoods}/>

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

                <div class="qnt" style={{width: "32%"}}>
                  If SubTotal is more than 200, then we will deliver <b>FREE!!!</b>
                </div>

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
                      
            <div class="list-footer bg-blue">
              <a onClick={() => props.previousMethod()} class="btn btn-default btn-material">
                <i class="icofont icofont-cart-alt"></i>
                <span class="body">Previous Method</span>
              </a>
              <a onClick={() => props.makeOrder()} class="btn btn-default btn-material">
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
    },
    createNewOrder: (order, token) => {
      dispatch(createOrder(order, token)).then((response) => {
        console.log('newOrder: ', response.payload);
        !response.error ? dispatch(createOrderSuccess(response.payload)) : dispatch(createOrderFailure(response.payload));
      });
    },
    resetOrder: () => {
      dispatch(resetNewOrder());
    },
    resetGoods: () => {
      dispatch(fetchCartGoods());
    }
  }
};


function mapStateToProps(state, ownProps) {
  return {
    indexContent: state.contents.index,
    incartGoods: state.goods.incartGoods,
    member: state.member,
    newOrder: state.orders.newOrder
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);