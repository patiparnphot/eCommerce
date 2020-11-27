import React from 'react';
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
  
//   renderMemberNav(user) {
//     if(user) {
//       return (
//         <ul className="nav navbar-nav navbar-right">
//           <li><Link to={"/users/" + user.userId}>Signed In As {user.username}</Link></li>
//           <li><a role="button" href="#" onClick={this.props.signOut}>SignOut</a></li>
//         </ul>
//       );
//     } else {
//       return (
//         <ul className="nav navbar-nav navbar-right">
//           <li><Link to="/signin">SignIn</Link></li>
//           <li><Link to="/signup">Signup</Link></li>
//         </ul>
//       );
//     }
//   }
  
  render() {
    
    // const { user } = this.props.member;
    
    const { headerTag } = this.props;
    
    if (!headerTag) {
      return <div/>
    }
    
    return (
      <nav className="navbar navbar-default">
  <div className="container">
    <div className="navbar-header">
      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <a className="navbar-brand" href="#">
        <img src="images/main-brand.png" alt="" className="brand"/>
      </a>
    </div>
    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <div className="top-panel">
        <div className="phone text-blue">
          <i className="icofont icofont-phone-circle"></i>
          +1 234 567 89 10
        </div>
        <div className="btn-cols">
          <ul className="list-btn-group">
            <li>
              <a href="#" data-toggle="modal" data-target="#myModal">
                SignUp
              </a>
            </li>
            <li>
              <a href="register-page.html">
                <b>SignIn</b>
              </a>
            </li>
          </ul>
        </div>
      </div>  
      <ul className="nav navbar-nav navbar-right info-panel">
        <li className="profile">
          <span className="wrap">
            <span className="image bg-white">
              <span className="icon">
                <i className="icofont icofont-user-alt-4 text-blue"></i>
              </span>
            </span>
            <span className="info">
              <span className="name text-uppercase">John Doe</span>
            </span>
          </span>
        </li>
        <li className="cart">
          <a href="#" className="cart-icon hidden-xs" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            <span className="badge bg-blue">3</span>
            <i className="icofont icofont-cart-alt"></i>
          </a>
          <a href="#" className="visible-xs" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            <i className="icofont icofont-cart-alt"></i>
            Shopping cart
          </a>
          <ul className="dropdown-menu">
            <li>
              <div className="wrap">
                <div className="image">
                  <img src="images/shop/img-01.jpg" alt=""/>
                </div>
                <div className="caption">
                  <span className="comp-header st-1 text-uppercase">
                    T-SHIPT
                    <span>
                      MEN COLLECTION
                    </span>
                    <span>
                      FAKE BRAND
                    </span>
                  </span>
                  <span className="price">
                    <span className="text-grey-dark">$</span>
                    257 <small className="text-grey-dark">.00</small>
                  </span>
                </div>
                <span className="remove-btn bg-blue">
                  1
                </span>
              </div>
            </li>
            <li class="more-btn sdw">
              <a href="card-page-step-1.html" className="btn-material btn-primary">
                View order <i className="icofont icofont-check-circled"></i>
              </a>
            </li>
          </ul>
        </li>
      </ul>
      <ul className="nav navbar-nav">
        <li className="active">
          <a href="index.html">
            home
          </a>
        </li>
        <li>
          <a href="#">
            tags
          </a>
        </li>
        <li>
          <a href="#">
            popularOnShop
          </a>
        </li>
        <li>
          <a href="#">
            blogs
          </a>
        </li>
        <li>
          <a href="#">
            contactUs
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>
    );
  }
}

