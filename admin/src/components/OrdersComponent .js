import React from 'react';
import { Link } from 'react-router-dom';
import order from '../../../models/order';
import Loader from './loader';


//var initialContentState = require("../../initial_state/initialContentState.json");

export default class Orders extends React.Component {
  
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this)
    this.state = {
      start: 1,
      end: 15
    };
    this.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QzIiwiZmlyc3RuYW1lIjoiM3JkUGVvcGxlIiwibGFzdG5hbWUiOiJpc0hlcmUiLCJlbWFpbCI6IjNyZFBlb3BsZUBlbWFpbC5jb20iLCJhdmF0YXIiOiIzIHBhc3RlIGltZyBzcmMgaGVyZSIsImlzQWRtaW4iOmZhbHNlLCJhZGRyZXNzIjoiMTIzIHdvcnNoaW5ndG9uIG1hZGFnYXRnYSIsInBheXBhbCI6eyJ1c2VybmFtZSI6IjNyZHBheXBhbCJ9LCJjcmVkaXRDYXJkIjp7ImNhcmROdW1iZXIiOiIxMjM0NTY3ODkwMTIzNDU2IiwiZXhwaXJlZERhdGUiOiIxMi8yNCJ9LCJpYXQiOjE2MDUzNzMzMzd9.wfZxaBT6NWVjK6ydgVFmbLyQok2QjMZIDSeNo3rHE8E";
  }

  
  componentDidMount() {
    this.props.fetchOrders(this.state.start, this.state.end);
    this.props.fetchOrderAmount();
    //this.props.blogsList.blogs = initialContentState.blogs.blogsList.blogs;

  }

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetApprovedOrder();
  }

  // Click Function
  onChange(i) {
    this.setState({
      start: 1+(15*i),
      end: 15+(15*i)
    });
    this.props.fetchOrders(1+(15*i), 15+(15*i));
  }
  
  renderOrders(orders) {
    return orders.map((order, index) => {
      return (
        <div className="row" style={index%2 == 1 ? {color: "white", backgroundColor: "gray"} : {backgroundColor: "white"}}>
          <div className="col-sm-3">
            {order.invoiceId}
          </div>
          <div className="col-sm-3">
            {order.customer.firstname + "  " + order.customer.lastname}
          </div>
          <div className="col-sm-3">
            {order.createdAt}
          </div>
          <div className="col-sm-1">
            <Link to={"/admin/orders/" + order.invoiceId}>Detail</Link>
          </div>
          <div className="col-sm-2">
            {
              (
                order.approve
              ) ? (
                <button
                  style = {{backgroundColor: "lightgreen", color: "black"}}
                  disabled
                >
                  Approved
                </button>
              ) : (
                <button
                  style = {{backgroundColor: "lightyellow", color: "black"}}
                  onClick = {
                    () => this.props.approveOrder(order.invoiceId, this.props.member.token, this.state.start, this.state.end)
                  }
                >
                  Approve
                </button>
              )
            }
          </div>
          <br/>
        </div>
      );
    });
  }
  
  
  render() {
    
    const { orders, loading, error } = this.props.ordersList;
    
    const { data } = this.props.orderAmount;

    const buttons = [];
    const pageNumber = Math.ceil(Number(data) / 15);
    for (let i=0; i<pageNumber; i++) {
      buttons.push(<button onClick={() => this.onChange(i)} >{i+1}</button>)
    }

    if((!data && (data != 0)) || !orders) {
      return <Loader/>
    //} else if(error) {
    //  return <div className="alert alert-danger">Error: {error.message}</div>
    //} else if(!content) {
    //  return <div/>;
    }
    
    return (
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h5 className="title">{`OREDERS LIST (${data})`}</h5>
          </div>
          <div className="card-body all-icons">
            {
              (
                data == 0
              ) ? (
                "NO ORDERS"
              ) : (
                <div className="row blog-container">
                  <div className="row">
                    <div className="col-sm-3">
                      Invoice Id
                    </div>
                    <div className="col-sm-3">
                      Customer Name
                    </div>
                    <div className="col-sm-3">
                      Created At
                    </div>
                    <div className="col-sm-1">
                      Show
                    </div>
                    <div className="col-sm-2">
                      Approve
                    </div>
                  </div>

                  <hr/>

                  {this.renderOrders(orders)}

                </div>
              )
            }
          </div>
          {buttons}
        </div>
      </div>
    )
  }
}
