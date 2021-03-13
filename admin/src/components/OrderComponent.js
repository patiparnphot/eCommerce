import Loader from './loader';
import NotFoundPage from './NotFoundPage';
import React from 'react';


export default class OrderPage extends React.Component {

  componentDidMount() {
    this.props.fetchOrder(this.props.invoiceId);
  }

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetActiveOrder();
  }

  renderCFGoods(goods) {
    return goods.map((good) => {
      return (
        <div class="row">
  
          <div class="col-sm-3">
            <img src={good.image} style={{width: "70px"}}/>
            <span style={{display: "inline-block", paddingLeft: "30px", position: "relative", top: "5px"}}>
              {good.title}
              <span style={{display: "block"}}>
                {good.category}
              </span>
              <span style={{display: "block"}}>
                {good.key}
              </span>
            </span>
          </div>
  
          <div class="col-sm-3">
            <span class="price">
              <span class="prc">
                <span>฿ {good.costPerUnit}</span><small>.00</small>
              </span>
            </span>
          </div>
  
          <div class="col-sm-3">
            <span>{good.amount}</span>
          </div>
  
          <div class="col-sm-3">
            <span>฿ {good.cost}</span>
          </div>
  
        </div>
      );
    });
  }
  
  
  render() {
    
    const { order, loading } = this.props.activeOrder;
    // const initialGood = { ...good, oldSlug: this.props.goodSlug };
    
    if (loading) {
      return <Loader/>
    } else if (!order) {
      return <NotFoundPage/>
    } else {
    
      return (
        <div className="container">
            
          <div class="row block none-padding-top">
            <div class="col-xs-12">
              <div class="product-list">
                <div class="wrap bg-white">
                  
                  <div class="row" style={{margin: "0px"}}>
                    <div class="col-sm-12 control-label pd-none">
                      <h3>
                        <b>{order.customer.firstname} {order.customer.lastname}</b>
                      </h3>
                    </div>
                  </div>
                  <div class="row" style={{margin: "0px"}}>
                    <label class="col-sm-3 control-label pd-none">Telephone:</label>
                    <div class="col-sm-9">
                      <span class="text">
                        {order.customer.telephone}
                      </span>
                    </div>
                  </div>
                  <div class="row" style={{margin: "0px"}}>
                    <label class="col-sm-3 control-label pd-none">Shipping Address:</label>
                    <div class="col-sm-9">
                      <span class="text">
                        {order.customer.address}
                      </span>
                    </div>
                  </div>

                  <hr/>

                  <div class="list-header text-uppercase">
                    <div class="col-sm-3">
                      Product
                    </div>
                    <div class="col-sm-3">
                      Price
                    </div>
                    <div class="col-sm-3">
                      Quantity
                    </div>
                    <div class="col-sm-3">
                      Total
                    </div>
                  </div>

                  <hr/>

                  <div class="list-body">

                    {this.renderCFGoods(order.goods)}

                  </div>

                  <hr/>

                  <div class="row">

                    <div class="col-sm-3">
                      Sub Total:
                    </div>

                    <div class="col-sm-6"></div>

                    <div class="col-sm-3">
                      <span><b>฿ {order.subTotal}</b></span>
                    </div>

                  </div>

                  <hr/>

                  <div class="row">

                    <div class="col-sm-3">
                      Cost delivery:
                    </div>

                    <div class="col-sm-6"></div>

                    <div class="col-sm-3">
                      <span><b>฿ {order.delivereeFee}</b></span>
                    </div>

                  </div>

                  <hr/>

                  <div class="list-body">
                    <div class="row">

                      <div class="col-sm-3">
                        Net Cost:
                      </div>

                      <div class="col-sm-6"></div>

                      <div class="col-sm-3">
                        <span><b>฿ {order.total}</b></span>
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
  }
}
