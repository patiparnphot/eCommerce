import React from 'react';
import Loader from './loader';
import { HashLink as Link } from 'react-router-hash-link';

export default class Header extends React.Component {
  
  //componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    //  this.props.resetPage();
  //}

  componentDidMount(){
    // this.props.loadUserFromPage();
  }
  
  // <a role="button" href="#" onClick={this.props.signOut}>SignOut</a>

  renderGoodsInCart(goods) {
    return goods.map((good) => {
      return (
        <li>
          <div className="wrap">
            <div className="image">
              <img src={good.image} alt=""/>
            </div>
            <div className="caption">
              <span className="comp-header st-1 text-uppercase">
                {good.title}
                <span>
                  {good.category}
                </span>
                <span>
                  {good.brand}
                </span>
              </span>
              <span className="price">
                <span className="text-grey-dark">฿</span>
                {good.costPerUnit} <small className="text-grey-dark">.00</small>
              </span>
            </div>
            <span className="remove-btn bg-blue">
              {good.amount}
            </span>
          </div>
        </li>
      )
    })
  }

  renderMemberNav(member) {
    let { headerTag } = this.props;
    if(member.user) {
      return (
      <ul className="nav navbar-nav navbar-right info-panel">
        <li className="profile">
          <span className="wrap">
            <span className="image bg-white">
              <span className="icon">
                <i className="icofont icofont-user-alt-4 text-blue"></i>
              </span>
            </span>
            <span className="info">
              <span className="name text-uppercase">{member.user.firstname} {member.user.lastname}</span>
            </span>
          </span>
        </li>
        <li className="cart">
          <a href="#" className="cart-icon hidden-xs" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            <span className="badge bg-blue">{this.props.incartGoods.goods.length}</span>
            <i className="icofont icofont-cart-alt"></i>
          </a>
          <a href="#" className="visible-xs" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            <i className="icofont icofont-cart-alt"></i>
            {headerTag.cartText}
          </a>
          <ul className="dropdown-menu">
          {
              (
                this.props.incartGoods.goods.length > 3
              ) ? (
                <li class="more-btn sdw">
                  <Link to={{pathname:"/cart", state:{from: this.props.location.pathname}}} className="btn-material btn-primary">
                    {headerTag.cartBtn} <i className="icofont icofont-check-circled"></i>
                  </Link>
                </li>
              ) : (
                <li></li>
              )
            }
            {this.renderGoodsInCart(this.props.incartGoods.goods)}
            {
              (
                (this.props.incartGoods.goods.length > 0) && (this.props.incartGoods.goods.length < 4)
              ) ? (
                <li class="more-btn sdw">
                  <Link to={{pathname:"/cart", state:{from: this.props.location.pathname}}} className="btn-material btn-primary">
                    {headerTag.cartBtn} <i className="icofont icofont-check-circled"></i>
                  </Link>
                </li>
              ) : (
                <li></li>
              )
            }
          </ul>
        </li>
        <li>
          <a href="#" onClick={() => this.props.logOut()}>
            <b>{headerTag.logout}</b>
          </a>
        </li>
      </ul>
      );
    } else {
      return (
        <ul className="list-btn-group nav navbar-nav navbar-right info-panel">
          <li>
            <Link to={{pathname:"/signin", state:{from: this.props.location.pathname}}}>
              <b>{headerTag.login}</b>
            </Link>
          </li>
        </ul>
      );
    }
  }
  
  render() {
    
    const { member } = this.props;
    
    const { headerTag } = this.props;
    
    if (!headerTag) {
      return <Loader/>
    } else {
      return (
        <nav className="navbar navbar-default" id="header">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" onClick={() => this.props.toggleNavbar(!this.props.navToggle)}>
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="navbar-brand" to={{pathname:"/", state:{from: this.props.location.pathname}}}>
                <img src={headerTag.brandImage} alt="" className="brand"/>
              </Link>
            </div>
            <div className={`navbar-collapse ${this.props.navToggle ? "" : "collapse"}`}>
              <div className="top-panel">
                <div className="phone text-blue">
                  <i className="icofont icofont-phone-circle"></i>
                  {headerTag.telephone}
                </div>
                <div className="btn-cols">
                  <ul className="list-btn-group">
                    <li>
                      <Link to={{pathname:"/register", state:{from: this.props.location.pathname}}}>
                        <b>{headerTag.signup}</b>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>  
              
              {this.renderMemberNav(member)}

              <ul className="nav navbar-nav">
                {headerTag.navBar.map((nav, index) => {
                  return (
                    <li className={index=0?"active":""}>
                      <Link to={{pathname: nav.pathname, hash: nav.hash, state:{from: this.props.location.pathname}}}>
                        {nav.text}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </nav>
      );
    }
  }
}

