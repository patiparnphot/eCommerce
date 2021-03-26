import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  meFromToken,
  updateUser,
  updateUserSuccess,
  updateUserFailure
} from '../actions/users'

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
  cartContent,
  meFromToken,
  updateUser,
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
  const [hisTelephone, setHisTelephone] = React.useState("");
  const [hisAddress, setHisAddress] = React.useState("");
  const [checkUserData, setCheckUserData] = React.useState(false);
  const [subTotal, setSubTotal] = React.useState(0);
  const [deliverCost, setDeliverCost] = React.useState(0);
  const [netCost, setNetCost] = React.useState(0);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  React.useEffect(() => {
    if(member.user) {
      setFirstname(member.user.firstname);
      setLastname(member.user.lastname);
    }
  }, [member]);

  React.useEffect(() => {
    if(newOrder.order) {
      let invoiceId = newOrder.order.invoiceId;
      resetOrder();
      resetGoods();
      history.push("/invoice/" + invoiceId);
    }
  }, [newOrder]);

  React.useEffect(() => {
    if(hisTelephone && (hisTelephone != "")) {
      setTelephone(hisTelephone);
    }
  }, [hisTelephone]);

  React.useEffect(() => {
    if(hisAddress && (hisAddress != "")) {
      setAddress(hisAddress);
    }
  }, [hisAddress]);

  function nextMethod(limitCost, defaultCost) {
    if((methodState == 1) && member.token && !checkUserData) {
      meFromToken(member.token, setHisTelephone, setEmail, setHisAddress, setCheckUserData);
    } else if(methodState == 2) {
      calculateCost([...incartGoods.goods], limitCost, defaultCost);
    }
    setMethodState(methodState + 1);
  }

  function previousMethod() {
    if((methodState == 3) && member.token && !checkUserData) {
      meFromToken(member.token, setHisTelephone, setEmail, setHisAddress, setCheckUserData);
    }
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

  function calculateCost(goods, limitCost, defaultCost) {
    let sum = 0;
    goods.forEach((good, index) => {
      sum += good.cost;
      if(index == (goods.length - 1)) {
        setSubTotal(sum);
        if(sum > +limitCost) {
          setDeliverCost(0);
          setNetCost(sum);
        } else {
          setDeliverCost(defaultCost);
          setNetCost(sum + defaultCost);
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
    if(
      (firstname != member.user.firstname) ||
      (lastname != member.user.lastname) ||
      (telephone != hisTelephone) ||
      (address != hisAddress)
    ) {
      let editUser = {
        username: member.user.username,
        firstname: firstname,
        lastname: lastname,
        telephone: telephone,
        address: address
      };
      updateUser(member.token, editUser);
    }
  }
  
    
  // const { content, loading, error } = this.props.indexContent;

  // if(loading) {
  //   return <div className="container"><h1>MeatSEO</h1><h3>Loading...</h3></div>      
  // } else if(error) {
  //   return <div className="alert alert-danger">Error: {error.message}</div>
  // } else 
  if(!incartGoods.goods || !member.user || !cartContent.content) {
    return <div/>
  }

  // console.log('enter indexPage: ', this.props);
  
  return (
    <div>
      <div class="container">

        <div class="row block none-padding-top">
          <div class="col-xs-12">
            <ul class="steps row">
              <Navigators navigators={cartContent.content.navigators} methodState={methodState} />
            </ul>
          </div>
        </div>
        
        {
          (() => {
            if (methodState == 1) {
              return (
                <FirstMethod
                  content={cartContent.content}
                  incartGoods={[...incartGoods.goods]}
                  reduceEvent={reduceEvent}
                  addEvent={addEvent}
                  deleteEvent={deleteEvent}
                  nextMethod={nextMethod}
                />
              );
            } else if (methodState == 2) {
              return (
                <SecondMethod
                  content={cartContent.content}
                  changeInput={changeInput}
                  firstname={firstname}
                  lastname={lastname}
                  telephone={telephone}
                  email={email}
                  address={address}
                  previousMethod={previousMethod}
                  nextMethod={nextMethod}
                />
              );
            } else if (methodState == 3) {
              return (
                <ThirdMethod
                  content={cartContent.content}
                  firstname={firstname}
                  lastname={lastname}
                  telephone={telephone}
                  address={address}
                  incartGoods={[...incartGoods.goods]}
                  subTotal={subTotal}
                  deliverCost={deliverCost}
                  netCost={netCost}
                  previousMethod={previousMethod}
                  makeOrder={makeOrder}
                />
              );
            } else {
              return <div/>
            }
          })()
        }

      </div>
      
    </div>
  );
}

function Navigators({navigators, methodState}) {
  return navigators.map((navigator, index) => {
    return (
      <li class={`col-sm-4 col-md-4 col-lg-4 ${(+index == +methodState - 1) ? "col-xs-12" : "hidden-xs"}`} >
        <div class={`icon number ${(+index < +methodState) ? "bg-blue" : "bg-grey"}`}>
          {index + 1}
        </div>
        <span>
          {navigator.head}
        </span>
        {navigator.subHead}
        <span class="dir-icon hidden-xs">
          <i class={`icofont icofont-stylish-right ${(+index == +methodState - 1) ? "text-yellow" : ""}`}/>
        </span>
      </li>
    );
  });
}

function Goods({incartGoods, reduceEvent, addEvent, deleteEvent}) {
  return incartGoods.map((good, index) => {
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
            <span class="minus" onClick={() => reduceEvent(index)}>
              <i class="icofont icofont-minus"></i>
            </span>
            <span class="input">
              <input type="text" value={good.amount}/>
            </span>
            <span class="plus" onClick={() => addEvent(index)}>
              <i class="icofont icofont-plus"></i>
            </span>
          </span>
        </div>

        <div class="total">
          <span class="icofont curr">฿</span>
          <span>{good.cost}</span>
        </div>

        <div class="rmv text-center">
          <button class="remove-btn" onClick={() => deleteEvent(index)}>
            <i class="icofont icofont-close-line"></i>
          </button>
        </div>

      </div>
    );
  });
}

function CFGoods({incartGoods}) {
  return incartGoods.map((good) => {
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

function FirstMethod({
  content,
  incartGoods,
  reduceEvent,
  addEvent,
  deleteEvent,
  nextMethod
}) {
  return (
    <div class="row block none-padding-top">
      <div class="col-xs-12">
        <div class="product-list">
          <div class="wrap bg-white">

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
              <div class="rmv hidden-xs hidden-sm">
                {content.remove}
              </div>
            </div>

            <div class="list-body">

              <Goods
                incartGoods={incartGoods}
                reduceEvent={reduceEvent}
                addEvent={addEvent}
                deleteEvent={deleteEvent}
              />
                          
            </div>
                      
            <div class="list-footer bg-blue">
              <a onClick={() => nextMethod()} class="btn btn-default btn-material">
                <span class="body">{content.nextMethod}</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function SecondMethod({
  content,
  changeInput,
  firstname,
  lastname,
  telephone,
  email,
  address,
  previousMethod,
  nextMethod
}) {
  return (
    <div class="row block none-padding-top">
      <div class="col-xs-12 get-height">
        <div class="sdw-block">
          <div class="wrap bg-white">
            <div class="row">
              <div class="col-xs-12">
                <div class="panel-group" id="accordion">

                  <div class="panel panel-default">

                    <h2>{content.personalInfoHead}</h2>
                    
                    <div class="panel-body">
                      <form class="form-horizontal">
                        <div class="form-group">
                          <label for="firstname" class="col-sm-3 control-label">{content.firstname}</label>
                          <div class="col-sm-9">
                            <input
                              type="text" class="form-control" id="firstname"
                              placeholder="Enter your firstname"
                              value={firstname}
                              onChange={(e) => changeInput(e, "firstname")}
                            />
                          </div>
                        </div>
                        <div class="form-group">
                          <label for="lastname" class="col-sm-3 control-label">{content.lastname}</label>
                          <div class="col-sm-9">
                            <input
                              type="text" class="form-control" id="lastname"
                              placeholder="Enter your lastname"
                              value={lastname}
                              onChange={(e) => changeInput(e, "lastname")}
                            />
                          </div>
                        </div>
                        <div class="form-group">
                          <label for="telephone" class="col-sm-3 control-label">{content.telephone}</label>
                          <div class="col-sm-9">
                            <input
                              type="text" class="form-control" id="telephone"
                              placeholder="Enter your telephone number"
                              value={telephone}
                              onChange={(e) => changeInput(e, "telephone")}
                            />
                          </div>
                        </div>
                        <div class="form-group">
                          <label for="email" class="col-sm-3 control-label">{content.email}</label>
                          <div class="col-sm-9">
                            <input
                              type="text" class="form-control" id="email"
                              placeholder="Enter your email"
                              value={email}
                              disabled
                            />
                          </div>
                        </div>
                        <div class="form-group padding">
                          <label for="address" class="col-sm-3 control-label">{content.address}</label>
                          <div class="col-sm-9">
                            <textarea
                              rows="3" class="form-control" id="address"
                              placeholder="Enter your address"
                              value={address}
                              onChange={(e) => changeInput(e, "address")}
                            />
                          </div>
                        </div>
                        <div class="form-group">
                          <div class="col-sm-offset-3 col-sm-8">
                            <span class="sdw-wrap">
                              <a onClick={() => previousMethod()} class="btn btn-default btn-material">
                                <span class="body">{content.previousMethod}</span>
                              </a>
                              &nbsp;&nbsp;&nbsp;
                              <a onClick={() => nextMethod(content.limitCost, content.defaultCost)} class="btn btn-material btn-yellow btn-lg ripple-cont">
                                {content.nextMethod}
                              </a>
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

function ThirdMethod({
  content,
  firstname,
  lastname,
  telephone,
  address,
  incartGoods,
  subTotal,
  deliverCost,
  netCost,
  previousMethod,
  makeOrder
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

              <CFGoods incartGoods={incartGoods}/>

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

                <div class="qnt" style={{width: "32%"}}>
                  {content.deliverWarning}
                </div>

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
                      
            <div class="list-footer bg-blue">
              <a onClick={() => previousMethod()} class="btn btn-default btn-material">
                <span class="body">{content.previousMethod}</span>
              </a>
              &nbsp;&nbsp;&nbsp;
              <a onClick={() => makeOrder()} class="btn btn-default btn-material">
                <i class="icofont icofont-cart-alt"></i>
                <span class="body">{content.makeOrder}</span>
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
    meFromToken: (token, setTelephone, setEmail, setAddress, setCheckUserData) => {
      dispatch(meFromToken(token)).then((response) => {
        console.log('meFromToken: ', response.payload);
        let user = response.payload;
        if(user && user.telephone) setTelephone(user.telephone);
        if(user && user.email) setEmail(user.email);
        if(user && user.address) setAddress(user.address);
        if(user) setCheckUserData(true);
      });
    },
    updateUser: (token, editUser) => {
      dispatch(updateUser(token, editUser)).then((response) => {
        console.log('editedUser: ', response.payload);
        if(response.payload.modUser && (response.payload.modUser.username == editUser.username)) {
          !response.error ? dispatch(updateUserSuccess(response.payload)) : dispatch(updateUserFailure(response.payload));
          localStorage.setItem('eCommerceAuth', JSON.stringify(response.payload));
        } else {
          console.log("Cannot update this user");
        }
      });
    },
    deleteGood: (index, cartGoods) => {
      let before = cartGoods.slice(0, index);
      let after = cartGoods.slice(index + 1, cartGoods.length + 1);
      let deletedGood = before.concat(after);
      console.log("deletedGood: ", deletedGood);
      dispatch(deleteCartGoods(deletedGood));
      localStorage.setItem('eCommerceIncart', JSON.stringify(deletedGood));
    },
    addGood: (index, cartGoods) => {
      let addedAmount = (+cartGoods[index].amount) + 1;
      let addedCost = (+cartGoods[index].costPerUnit) * addedAmount;
      let addedGood = [...cartGoods];
      addedGood[index].amount = addedAmount;
      addedGood[index].cost = addedCost;
      console.log("addedGood: ", addedGood);
      dispatch(editCartGoods(addedGood));
      localStorage.setItem('eCommerceIncart', JSON.stringify(addedGood));
    },
    reduceGood: (index, cartGoods) => {
      let reducedAmount = (+cartGoods[index].amount) - 1;
      let reducedCost = (+cartGoods[index].costPerUnit) * reducedAmount;
      let reducedGood = [...cartGoods];
      reducedGood[index].amount = reducedAmount;
      reducedGood[index].cost = reducedCost;
      console.log("reducedGood: ", reducedGood);
      dispatch(editCartGoods(reducedGood));
      localStorage.setItem('eCommerceIncart', JSON.stringify(reducedGood));
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
      localStorage.removeItem('eCommerceIncart');
    }
  }
};


function mapStateToProps(state, ownProps) {
  return {
    cartContent: state.contents.cart,
    incartGoods: state.goods.incartGoods,
    member: state.member,
    newOrder: state.orders.newOrder
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);